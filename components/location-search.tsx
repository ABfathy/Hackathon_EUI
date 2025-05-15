'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MapPin, Search, Loader2, Target } from "lucide-react"
import GoogleMapsScript from './google-maps-script'

interface LocationSearchProps {
  value: string
  onChange: (value: string) => void
  onCoordinatesChange?: (lat: number | null, lng: number | null) => void
  userLocation?: { latitude: number | null; longitude: number | null }
  label?: string
  placeholder?: string
  required?: boolean
  error?: boolean
  errorMessage?: string
}

export default function LocationSearch({
  value,
  onChange,
  onCoordinatesChange,
  userLocation = { latitude: null, longitude: null },
  label = "Location",
  placeholder = "Enter location",
  required = false,
  error = false,
  errorMessage = "Please enter a location"
}: LocationSearchProps) {
  const [mapOpen, setMapOpen] = useState(false)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [marker, setMarker] = useState<google.maps.Marker | null>(null)
  const [selectedPosition, setSelectedPosition] = useState<{lat: number, lng: number} | null>(null)
  const [locationText, setLocationText] = useState(value)
  const [placeSuggestions, setPlaceSuggestions] = useState<{description: string, place_id: string}[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false)
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const mapSearchInputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle Google Maps loading 
  const handleGoogleMapsLoaded = useCallback(() => {
    setGoogleMapsLoaded(true);
    if (mapOpen && mapRef.current && !map) {
      initializeMap();
    }
  }, [mapOpen, map]);

  // Handle searching for places
  const searchPlaces = useCallback((query: string) => {
    if (!query || query.length < 2 || typeof window === 'undefined' || !window.google || !window.google.maps) {
      setPlaceSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoadingPlaces(true);
    
    if (!window.google.maps.places) {
      console.error("Google Maps Places API not loaded");
      setIsLoadingPlaces(false);
      return;
    }
    
    const service = new window.google.maps.places.AutocompleteService();
    
    service.getPlacePredictions(
      {
        input: query,
        componentRestrictions: { country: 'eg' }, // Restrict to Egypt
        types: ['geocode', 'establishment']
      },
      (predictions, status) => {
        setIsLoadingPlaces(false);
        
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions && predictions.length > 0) {
          const suggestions = predictions.map(prediction => ({
            description: prediction.description,
            place_id: prediction.place_id
          }));
          setPlaceSuggestions(suggestions);
          setShowSuggestions(true);
        } else {
          setPlaceSuggestions([]);
          setShowSuggestions(false);
        }
      }
    );
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocationText(newValue);
    onChange(newValue);
    searchPlaces(newValue);
  };

  // Handle place selection
  const handlePlaceSelect = (placeId: string, description: string) => {
    setLocationText(description);
    onChange(description);
    setShowSuggestions(false);
    
    if (typeof window === 'undefined' || !window.google || !window.google.maps || !window.google.maps.places) {
      return;
    }
    
    // Use a temporary div for PlacesService (requirement of the API)
    const tempNode = document.createElement('div');
    const placesService = new window.google.maps.places.PlacesService(tempNode);
    
    placesService.getDetails(
      {
        placeId: placeId,
        fields: ['geometry', 'name', 'formatted_address']
      },
      (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place && place.geometry && place.geometry.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          
          // Update coordinates for parent component
          if (onCoordinatesChange) {
            onCoordinatesChange(lat, lng);
          }
          
          // If map is open, update the marker position
          if (map && marker) {
            const newPosition = new window.google.maps.LatLng(lat, lng);
            marker.setPosition(newPosition);
            map.setCenter(newPosition);
            setSelectedPosition({ lat, lng });
          }
        }
      }
    );
  };

  // Initialize map when dialog opens
  const initializeMap = useCallback(() => {
    if (!mapRef.current || typeof window === 'undefined' || !window.google || !window.google.maps) {
      return;
    }

    // Default center (Cairo or use user's location if available)
    const defaultCenter = { 
      lat: userLocation.latitude || 30.0444, 
      lng: userLocation.longitude || 31.2357 
    };

    // Create the map
    const newMap = new window.google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 14,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      disableDefaultUI: false,
      gestureHandling: 'cooperative',
      mapTypeId: window.google.maps.MapTypeId.ROADMAP
    });

    // Create a marker at the center position
    const newMarker = new window.google.maps.Marker({
      position: defaultCenter,
      map: newMap,
      draggable: true,
      animation: window.google.maps.Animation.DROP,
      title: "Drag to select exact location"
    });

    // Set the selected position based on the marker
    setSelectedPosition({
      lat: defaultCenter.lat,
      lng: defaultCenter.lng
    });

    // Add event listener for marker drag end
    newMarker.addListener('dragend', () => {
      const position = newMarker.getPosition();
      if (position) {
        const lat = position.lat();
        const lng = position.lng();
        setSelectedPosition({ lat, lng });
        
        // Get address using reverse geocoding
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: position }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            setLocationText(results[0].formatted_address);
          }
        });
      }
    });

    // Add click listener to the map to reposition the marker
    newMap.addListener('click', (e: google.maps.MapMouseEvent) => {
      if (e.latLng && newMarker) {
        newMarker.setPosition(e.latLng);
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setSelectedPosition({ lat, lng });
        
        // Get address using reverse geocoding
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: e.latLng }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            setLocationText(results[0].formatted_address);
          }
        });
      }
    });

    // Setup search box in the map dialog
    if (mapSearchInputRef.current && window.google.maps.places) {
      const searchBox = new window.google.maps.places.SearchBox(mapSearchInputRef.current);
      
      // Bias results to current map bounds
      newMap.addListener('bounds_changed', () => {
        searchBox.setBounds(newMap.getBounds() as google.maps.LatLngBounds);
      });
      
      // Listen for search box changes
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        
        if (!places || places.length === 0) {
          return;
        }
        
        // Get the first place
        const place = places[0];
        
        if (!place.geometry || !place.geometry.location) {
          return;
        }
        
        // Move marker and map to the place
        newMarker.setPosition(place.geometry.location);
        
        // If we got a viewport from the place, use it for better map viewing 
        if (place.geometry.viewport) {
          newMap.fitBounds(place.geometry.viewport);
        } else {
          newMap.setCenter(place.geometry.location);
          newMap.setZoom(16);
        }
        
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setSelectedPosition({ lat, lng });
        
        // Update location text
        setLocationText(place.formatted_address || place.name || '');
      });
    }

    setMap(newMap);
    setMarker(newMarker);

    return () => {
      if (newMarker) {
        newMarker.setMap(null);
      }
    };
  }, [userLocation]);

  // Initialize map when dialog opens
  useEffect(() => {
    if (mapOpen && googleMapsLoaded && !map) {
      initializeMap();
    }
    
    // When dialog is closed, clean up the map
    if (!mapOpen && map) {
      setMap(null);
      setMarker(null);
    }
  }, [mapOpen, googleMapsLoaded, map, initializeMap]);

  // Use the user's current position for the map
  const handleUseCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        // Update coordinates for parent component
        if (onCoordinatesChange) {
          onCoordinatesChange(lat, lng);
        }
        
        // If map is open, update the marker position
        if (map && marker) {
          const newPosition = new window.google.maps.LatLng(lat, lng);
          marker.setPosition(newPosition);
          map.setCenter(newPosition);
          map.setZoom(16);
          setSelectedPosition({ lat, lng });
          
          // Get address using reverse geocoding
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: newPosition }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
              setLocationText(results[0].formatted_address);
              onChange(results[0].formatted_address);
            }
          });
        }
      }, (error) => {
        console.error("Error getting current position:", error);
      });
    }
  };

  // Update parent component with selected location info when dialog is closed
  const handleCloseDialog = () => {
    if (selectedPosition) {
      // Update the parent component with the coordinates
      if (onCoordinatesChange) {
        onCoordinatesChange(selectedPosition.lat, selectedPosition.lng);
      }
      
      // Update the location text
      onChange(locationText);
    }
    setMapOpen(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="location" className={error ? "text-red-500" : ""}>{label} {required && "*"}</Label>
        {userLocation.latitude && userLocation.longitude && (
          <div className="flex items-center text-xs text-emerald-600">
            <MapPin className="h-3 w-3 mr-1" />
            <span>Location detected</span>
          </div>
        )}
      </div>
      
      <div ref={wrapperRef} className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input 
              id="location" 
              ref={searchInputRef}
              placeholder={placeholder}
              value={locationText}
              onChange={handleInputChange}
              onFocus={() => locationText.length > 1 && searchPlaces(locationText)}
              className={`flex-1 ${error ? "border-red-500 ring-red-500" : ""} pl-3 pr-8`}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              {isLoadingPlaces ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </div>
          </div>
          
          <Dialog open={mapOpen} onOpenChange={setMapOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                type="button"
                className="relative overflow-hidden min-w-[70px] focus-visible:ring-offset-0"
              >
                <MapPin className="h-4 w-4 mr-2" />
                <span>Map</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] h-[600px] max-h-[90vh]">
              <GoogleMapsScript 
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
                onLoad={handleGoogleMapsLoaded} 
              />
              <DialogHeader>
                <DialogTitle>Select Location</DialogTitle>
              </DialogHeader>
              <div className="relative overflow-hidden h-full">
                <div className="pb-2 flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      ref={mapSearchInputRef}
                      placeholder="Search for a location"
                      className="w-full"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleUseCurrentPosition}
                    title="Use my current location"
                    className="flex-shrink-0 focus-visible:ring-offset-0"
                  >
                    <Target className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="relative">
                  {!googleMapsLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 z-10">
                      <div className="flex flex-col items-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                        <p className="text-sm">Loading Google Maps...</p>
                      </div>
                    </div>
                  )}
                  <div 
                    ref={mapRef} 
                    className="w-full h-[400px] rounded-md overflow-hidden"
                  ></div>
                </div>
                
                <div className="mt-4">
                  <Button onClick={handleCloseDialog} className="w-full">
                    Confirm Location
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Places suggestions dropdown */}
        {showSuggestions && placeSuggestions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
            {placeSuggestions.map((suggestion) => (
              <div
                key={suggestion.place_id}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2"
                onClick={() => handlePlaceSelect(suggestion.place_id, suggestion.description)}
              >
                <MapPin className="h-4 w-4 flex-shrink-0 text-gray-500" />
                <span className="truncate">{suggestion.description}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {error && errorMessage && (
        <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
