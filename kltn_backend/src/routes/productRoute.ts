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

export default router;
