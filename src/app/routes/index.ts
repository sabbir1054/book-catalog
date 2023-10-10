import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UsersRoutes } from '../modules/users/const.user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },

  {
    path: '/users',
    route: UsersRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
