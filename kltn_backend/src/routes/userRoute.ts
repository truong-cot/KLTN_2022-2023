import express from 'express';
import UserController from '../app/controllers/userControllers';

import {authMiddlewares} from '../middlewares/auth';

const router = express.Router();

// Lấy tất cả user
router.get('/all-user', authMiddlewares.isAdmin, UserController.getAllUser);

// Chỉnh sửa quyền
router.post('/change-role', authMiddlewares.isAdmin, UserController.changeRole);

// Xóa tài khoản
router.delete(
	'/delete-user',
	authMiddlewares.isAdmin,
	UserController.deleteUser
);

// Chỉnh sửa tài khoản
router.put(
	'/update-user/:id',
	authMiddlewares.authVerify,
	UserController.updateUser
);

// Lấy ra user hiện tại
router.get(
	'/current-user/:id',
	authMiddlewares.authVerify,
	UserController.getCurrentUser
);

export default router;
