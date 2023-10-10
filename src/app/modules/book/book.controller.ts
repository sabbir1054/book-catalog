import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { BookServices } from "./book.service";
import sendResponse from "../../../shared/sendResponse";
import { Book } from "@prisma/client";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { bookFilterAbleFields } from "./book.constant";
import { paginationFields } from "../../../constants/pagination";

const createBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookServices.createBook(req.body);
  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Created successfully !!',
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterAbleFields);
  const options = pick(req.query, paginationFields);
  const result = await BookServices.getAllBooks(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books fetched successfully !!',
    meta: result.meta,
    data: result.data,
  });
});


export const BookController = {
    createBook,
    getAllBooks
}
