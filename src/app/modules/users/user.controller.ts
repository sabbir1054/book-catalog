import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserServices } from './user.service';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsers();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'user data fetched!!',
    data: result,
  });
});



const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getsingleUser(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user data retriieved!!',
    data: result,
  });
});
export const UserController = {
    getAllUsers,
    getSingleUser
};
