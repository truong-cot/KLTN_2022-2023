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
				amount_size_S,
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
				amount_size_S &&
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
						amount_size_S: amount_size_S,
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
							// Danh sách ảnh của sản phẩm
							var urls: any = checkProduct.images;

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
	// [DELETE] ==> /product/delete-images/...id?idImage=1233
	deleteImage: async (req: Request, res: Response) => {
		try {
			// Lấy id sản phẩm và id image
			const idProduct = req.params.id;
			const idImage = req.query.idImage;

			// Lấy sản phẩm theo ID
			const product = await ProductModel.findById(idProduct);

			// Hàm xóa ảnh
			const deleteImage = async (arr: Array<any>, id: string) => {
				const indexImage = arr.findIndex((v) => v.id === id);

				if (indexImage > -1) {
					arr.splice(indexImage, 1);
				}

				return arr;
			};

			if (idProduct && idImage) {
				if (product) {
					// Lấy ảnh của sản phẩm
					const listImages: any = product?.images;

					if (listImages.length === 0) {
						return res.status(403).json(
							resultData({
								code: 403,
								status: 0,
								message: 'Sản phẩm chưa có ảnh nảo!',
								data: {},
							})
						);
					} else {
						// Tìm id của ảnh
						const item = listImages.find(
							(v: any) => v.id === idImage
						);
						if (item) {
							// Gọi hàm xóa ảnh
							await deleteImage(listImages, String(idImage));

							// Update danh sách ảnh cho sản phẩm
							const product = await ProductModel.updateOne(
								{_id: idProduct},
								{
									$set: {
										images: listImages,
									},
								}
							);

							//
							if (product) {
								return res.status(200).json(
									resultData({
										code: 200,
										status: 1,
										message: 'Xóa ảnh thành công!',
										data: listImages,
									})
								);
							}
						} else {
							return res.status(403).json(
								resultData({
									code: 403,
									status: 0,
									message: 'ID ảnh không tồn tại!',
									data: {},
								})
							);
						}
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
			} else {
				return res.status(403).json(
					resultData({
						code: 403,
						status: 0,
						message: 'Không tìm thấy ID sản phẩm và ID ảnh!',
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
	// [GET] ==> /product/get-all-images
	getAllImage: async (req: Request, res: Response) => {
		try {
			const idProduct = req.params.id;

			// Lấy sản phẩm theo ID
			const product = await ProductModel.findById(idProduct);

			if (product) {
				const listImages: any = product.images;

				if (listImages.length === 0) {
					return res.status(201).json(
						resultData({
							code: 201,
							status: 0,
							message: 'Sản phẩm chưa có ảnh nào!',
							data: listImages,
						})
					);
				} else {
					return res.status(200).json(
						resultData({
							code: 200,
							status: 1,
							message: 'Lấy ảnh của sản phẩm thành công!',
							data: listImages,
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
	// [DELETE] ==> /product/delete-images?idProduct=1233
	deleteProduct: async (req: Request, res: Response) => {
		try {
			const idProduct = req.query.idProduct;
			const product = await ProductModel.findByIdAndDelete(idProduct);

			if (product) {
				return res.status(200).json(
					resultData({
						code: 200,
						status: 1,
						message: 'Xóa sản phẩm thành công!',
						data: product,
					})
				);
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
	// [PUT] ==> /product/delete-images?idProduct=1233
	updateProduct: async (req: Request, res: Response) => {
		try {
			const idProduct = req.query.idProduct;
			const product = await ProductModel.findByIdAndUpdate(
				idProduct,
				req.body
			);

			const newProduct = await ProductModel.findById(idProduct);

			if (product) {
				return res.status(200).json(
					resultData({
						code: 200,
						status: 1,
						message: 'Sản phẩm tài khoản thành công!',
						data: newProduct,
					})
				);
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
	// [GET] ==> /product/get-all
	getAllProduct: async (req: Request, res: Response) => {
		try {
			res.json('thanh cong');
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
