import { Category } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createCategory = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  });

  return result;
};

const getAllCategories = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany({
    include: {
      books: true,
    },
  });
  return result;
};

const getSingleCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });

  return result;
};

const updateCategory = async (
  id: string,
  payload: Partial<Category>
): Promise<Category> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteCategory = async (id: string): Promise<Category> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};


export const CategoryServices = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
}
