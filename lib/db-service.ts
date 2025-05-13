import { prisma } from './db';
import bcrypt from 'bcryptjs';
import { UserType as PrismaUserType } from '../lib/generated/prisma' // Assuming prisma client is here

// User operations
export const createUser = async (userData: any) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  // Prepare data for Prisma, ensuring correct types and optional fields handling
  const dataToCreate: {
    name: string;
    email: string;
    password: string; // Corrected from password_hashed
    userType: PrismaUserType; // Use Prisma's generated UserType
    phoneNumber?: string;
    dateOfBirth?: Date;
    familyCode?: string | null; // familyCode can be string or null
    parentEmail?: string | null;
    parentPhone?: string | null;
  } = {
    name: userData.name,
    email: userData.email,
    password: hashedPassword, // Use the 'password' field name as expected by Prisma schema
    userType: userData.userType as PrismaUserType, // Assert type from validated API route data
    phoneNumber: userData.phoneNumber,
    dateOfBirth: userData.dateOfBirth,
    familyCode: userData.familyCode,
    parentEmail: userData.parentEmail,
    parentPhone: userData.parentPhone,
  };

  // Remove optional fields if they are undefined, to avoid sending `undefined` to Prisma
  // Prisma expects fields to be either present with a value (or null for nullable fields) or absent
  if (dataToCreate.phoneNumber === undefined) {
    delete dataToCreate.phoneNumber;
  }
  if (dataToCreate.dateOfBirth === undefined) {
    delete dataToCreate.dateOfBirth;
  }
  // familyCode, parentEmail, parentPhone can be explicitly null or a string, so no delete needed if undefined
  // unless they were truly meant to be omitted if not provided, rather than set to null.
  // Given the API logic, they are typically set to null if not applicable.
  if (dataToCreate.familyCode === undefined) {
    // If familyCode is truly optional and not just nullable, decide if it should be null or omitted.
    // For now, assuming if it's passed as undefined from userData, it might mean it shouldn't be set.
    // However, the API route logic seems to ensure it's either a string or null if relevant.
    // Let's stick to how userData provides it. If userData.familyCode is undefined, it's assigned.
    // If Prisma complains, we might need to delete it if undefined, or ensure API sends null.
  }

  // Safeguard: Ensure empty string parentEmail/parentPhone are converted to null
  if (dataToCreate.parentEmail === "") {
    dataToCreate.parentEmail = null;
  }
  if (dataToCreate.parentPhone === "") {
    dataToCreate.parentPhone = null;
  }

  console.log("DB-SERVICE: About to call prisma.user.create with data (after cleanup):", JSON.stringify(dataToCreate, null, 2));

  return prisma.user.create({
    data: dataToCreate as any, // Using 'as any' to bypass strict intermediate type check, Prisma will validate final shape
  });
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

// Family operations
export const createFamily = async (code: string) => {
  return prisma.family.create({
    data: { code },
  });
};

export const getFamilyByCode = async (code: string) => {
  return prisma.family.findUnique({
    where: { code },
    include: { members: true },
  });
};

export const addUserToFamily = async (userId: string, familyCode: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: { familyCode },
  });
};

export const removeUserFromFamily = async (userId: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: { familyCode: null },
  });
}; 