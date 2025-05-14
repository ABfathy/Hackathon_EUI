# PowerShell script to run the bash script in WSL

Write-Host "`n🚀 Starting AI CLI in WSL...`n" -ForegroundColor Cyan

# Get the path of this script
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

# Convert Windows path to WSL path
$wslPath = $scriptPath -replace "\\", "/" -replace "^([A-Za-z]):", "/mnt/`$1" -replace ":", ""
$wslPath = $wslPath.ToLower()

# Run the bash script in WSL
wsl bash -c "cd '$wslPath' && chmod +x run-ai.sh && ./run-ai.sh" 