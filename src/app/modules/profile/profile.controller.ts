import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ProfileService } from "./profile.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as any;
  console.log('controller', userId);
  const result = await ProfileService.getProfile(userId);
    sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Profile data fetched!!',
    data: result,
  });
});


export const ProfileController = {
    getProfile
}