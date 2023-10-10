import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { IOrderData, IOrderedBook } from "./order.interface";
import { asyncForEach } from "../../../shared/utils";

const createOrder = async (userId: string, data: IOrderData): Promise<any> => {
  data.userId = userId;

  const { orderedBooks, ...orderData } = data;
  const newOrder = await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.order.create({
      data: orderData,
    });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create');
    }

    if (orderedBooks && orderedBooks.length > 0) {
      await asyncForEach(orderedBooks, async (orderBook: IOrderedBook) => {
        const createOrderBook = await transactionClient.orderedBook.create({
          data: {
            orderId: result.id,
            bookId: orderBook?.bookId,
            quantity: orderBook?.quantity,
          },
        });
        console.log(createOrderBook);
      });
    }
    return result;
  });

  if (newOrder) {
    const responseData = await prisma.order.findUnique({
      where: {
        id: newOrder.id,
      },
      include: {
        user: true,
        orderedBooks: {
          include: {
            book: true,
          },
        },
      },
    });

    return responseData;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create order');
};

const getAllOrders = async (userId: string, role: string): Promise<Order[]> => {
  if (role === 'admin') {
   //admin see all customers order 
    const allOrders = await prisma.order.findMany({
      include: {
        user: true,
        orderedBooks: {
          include: {
            book: true,
          },
        },
      },
    });
    return allOrders;
  } else if (role === 'customer') {
    // Customers can access their own orders
    const customerOrders = await prisma.order.findMany({
      where: {
        userId: userId, // Filter orders by the customer's userId
      },
      include: {
        user: true,
        orderedBooks: {
          include: {
            book: true,
          },
        },
      },
    });
    return customerOrders;
  } else {
    // Handle other roles or throw an error if needed
    throw new Error('Invalid user role');
  }
};

export const OrderServices={
    createOrder,
    getAllOrders
}