import express from 'express';

import ProductController from '../app/controllers/productController';
import {authMiddlewares} from '../middlewares/auth';

const router = express.Router();

import multer from 'multer';
const storage = multer.diskStorage({
	filename: function (req: any, file: any, cb: any) {
		cb(null, file.fieldname + '-' + Date.now());
	},
});
const upload = multer({storage});

// Thêm sản phẩm
router.post('/create', authMiddlewares.isAdmin, ProductController.create);

// Thêm ảnh cho sản phẩm
router.post(
	'/add-images/:id',
	authMiddlewares.isAdmin,
	upload.array('image-product', 10),
	ProductController.addImage
);

// Xóa ảnh sản phẩm
router.delete(
	'/delete-image/:id',
	authMiddlewares.isAdmin,
	ProductController.deleteImage
);

// Lấy ra danh sách ảnh
router.get(
	'/get-all-images/:id',
	authMiddlewares.isAdmin,
	ProductController.getAllImage
);

// Xóa sản phẩm
router.delete(
	'/delete-product',
	authMiddlewares.isAdmin,
	ProductController.deleteProduct
);

// Chỉnh sửa sản phẩm
router.put(
	'/update-product',
	authMiddlewares.isAdmin,
	ProductController.updateProduct
);

// Lấy tất cả sản phẩm
router.get(
	'/get-all-product',
	authMiddlewares.authVerify,
	ProductController.getAllProduct
);

export default router;
