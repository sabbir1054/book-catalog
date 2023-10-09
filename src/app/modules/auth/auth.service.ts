import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import config from '../../routes/config';
import { ILoginUser, ILoginUserResponse } from './auth.interface';
import { getUserByEmail } from './auth.utils';

const createUser = async (data: User): Promise<User> => {
  const result = await prisma.user.create({ data: data });
  return result;
};

const signingUser = async (data: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = data;

  if (!email || !password) {
    throw new ApiError(httpStatus.NOT_FOUND, 'email and password needed');
  }

  const isExist = await getUserByEmail(email);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  const { id: userId, role } = isExist;

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  createUser,
  signingUser,
};
