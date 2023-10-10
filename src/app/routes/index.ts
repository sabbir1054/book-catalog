import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { UsersRoutes } from '../modules/users/const.user.route';
import { BookRoutes } from '../modules/book/book.routes';
import { OrderRoutes } from '../modules/order/order.routes';
import { ProfileRoutes } from '../modules/profile/profile.route';

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
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
