import {Request, Response} from 'express';
import resultData from '../../common/resultData';

import ProductModel from '../models/product';
import uploader from '../../config/cloudinary';

const ProductController = {
	// [POST] ==> /product/create
	create: async (req: Request, res: Response) => {
		try {
			const {
				name,
				price,
				category,
				sale,
				amount_size_s,
				amount_size_M,
				amount_size_L,
				amount_size_XL,
				main_des,
				general_des,
				detail_des,
			} = req.body;

			// Check tên sản phẩm
			const checkName = await ProductModel.findOne({name: name});

			if (
				name &&
				price &&
				category &&
				sale &&
				amount_size_s &&
				amount_size_M &&
				amount_size_L &&
				amount_size_XL &&
				main_des &&
				general_des &&
				detail_des
			) {
				if (checkName) {
					return res.status(403).json(
						resultData({
							code: 403,
							status: 0,
							message: 'Tên sản phẩm đã tồn tại!',
							data: {},
						})
					);
				} else {
					const newProduct = new ProductModel({
						name: name,
						price: price,
						category: category,
						sale: sale,
						amount_size_s: amount_size_s,
						amount_size_M: amount_size_M,
						amount_size_L: amount_size_L,
						amount_size_XL: amount_size_XL,
						main_des: main_des,
						general_des: general_des,
						detail_des: detail_des,
					});

					const saveProduct = await newProduct.save();

					return res.status(200).json(
						resultData({
							code: 200,
							status: 1,
							message: `Thêm sản phẩm ${name} thành công!`,
							data: saveProduct,
						})
					);
				}
			} else {
				return res.status(403).json(
					resultData({
						code: 403,
						status: 0,
						message: 'Nhập đầy đủ thông tin!',
						data: {},
					})
				);
			}
		} catch (error) {
			return res.status(500).json(
				resultData({
					code: 500,
					status: 0,
					message: 'Có lỗi xảy ra!',
					data: {},
				})
			);
		}
	},
	// [POST] ==> /product/add-images/...id
	addImage: async (req: Request, res: Response) => {
		try {
			const idProduct = req.params.id;

			const images: any = req.files;
			var urls: Array<any> = [];

			const checkTypeImage = images.some(
				(image: any) =>
					image.mimetype !== 'image/jpeg' &&
					image.mimetype !== 'image/jpg' &&
					image.mimetype !== 'image/png'
			);

			if (Number(images?.length) > 0) {
				// Đúng định dạng ảnh
				if (checkTypeImage === false) {
					if (images?.length > 5) {
						return res.status(403).json(
							resultData({
								code: 403,
								status: 0,
								message: 'Không được thêm quá 5 ảnh!',
								data: {},
							})
						);
					} else {
						const checkProduct = await ProductModel.findById(
							idProduct
						);
						if (checkProduct) {
							// Thêm ảnh
							for (const image of images) {
								const newUrl: any = await uploader(
									image.path,
									'KLTN'
								);
								urls.push(newUrl);
							}

							// Thêm ảnh vào mảng images
							const product = await ProductModel.updateOne(
								{_id: idProduct},
								{
									$set: {
										images: urls,
									},
								}
							);

							if (product) {
								return res.status(200).json(
									resultData({
										code: 200,
										status: 1,
										message: 'Thêm ảnh thành công!',
										data: urls,
									})
								);
							}
						} else {
							return res.status(403).json(
								resultData({
									code: 403,
									status: 0,
									message: 'Sản phẩm không tồn tại!',
									data: {},
								})
							);
						}
					}
				} else {
					// Sai định dạng ảnh
					return res.status(403).json(
						resultData({
							code: 403,
							status: 0,
							message: 'Ảnh không đúng định dạng!',
							data: {},
						})
					);
				}
			} else {
				return res.status(403).json(
					resultData({
						code: 403,
						status: 0,
						message: 'Không có ảnh nào được thêm!',
						data: {},
					})
				);
			}
		} catch (error) {
			return res.status(500).json(
				resultData({
					code: 500,
					status: 0,
					message: 'Có lỗi xảy ra!',
					data: {},
				})
			);
		}
	},
};

export default ProductController;
