import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";

const getProfile = async (userId: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return result; // Allow null values
};
export const ProfileService = {
  getProfile,
};
