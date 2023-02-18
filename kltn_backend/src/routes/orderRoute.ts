import express from 'express';
import OrderController from '../app/controllers/orderController';
import {authMiddlewares} from '../middlewares/auth';

const router = express.Router();

// Tạo đơn hàng
router.post(
	'/create-order',
	authMiddlewares.authVerify,
	OrderController.createOrder
);

// Xác nhận đơn hàng
router.post(
	'/confirmation-order',
	authMiddlewares.isAdmin,
	OrderController.confirmationOrder
);

// Hủy đơn hàng
router.post(
	'/cancel-order',
	authMiddlewares.authVerify,
	OrderController.cancelOrder
);

// Xác nhận đã nhận hàng
router.post(
	'/confirmation-delivery',
	authMiddlewares.authVerify,
	OrderController.confirmationDelivery
);

// Lấy chi tiết đơn hàng
router.get(
	'/get-detail-order',
	authMiddlewares.authVerify,
	OrderController.getDetailOrder
);

// Lấy tất cả đơn hàng
router.get(
	'/get-all-order',
	authMiddlewares.authVerify,
	OrderController.getAllOrder
);

// Lấy đơn hàng của user
router.get(
	'/get-order-user',
	authMiddlewares.authVerify,
	OrderController.getOrderUser
);

export default router;
