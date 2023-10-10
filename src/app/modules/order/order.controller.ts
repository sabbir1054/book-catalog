import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderServices } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as any;
  const result = await OrderServices.createOrder(userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' created successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const { userId, role } = req.user as any;
  const result = await OrderServices.getAllOrders(userId, role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Orders fetched successfully !!',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const { userId, role } = req.user as any;
  const result = await OrderServices.getSingleOrder(req.params.id, userId, role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order data fetched!!',
    data: result,
  });
});


export const OrderController = {
    createOrder,
    getAllOrders,
    getSingleOrder
};
