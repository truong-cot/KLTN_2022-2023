import {Request, Response} from 'express';
import resultData from '../../common/resultData';

import orderSchema from '../../app/models/order';
import productSchema from '../../app/models/product';
import userSchema from '../../app/models/user';

const revenueController = {
	// [GET] => /revenue/get-order-revenue ==> Thông kê chung
	getOrderRevenue: async (req: Request, res: Response) => {
		try {
			// Lấy tất cả người dùng
			const allUser = await userSchema.countDocuments({
				isAdmin: false,
			});

			// Lấy tất cả admin
			const allAdmin = await userSchema.countDocuments({
				isAdmin: true,
			});

			// Lấy tất cả người dùng mới trong tháng
			const date = new Date();
			const prevDate = new Date(new Date().setDate(1));

			const allUserMonth = await userSchema.countDocuments({
				createdAt: {$gte: prevDate, $lte: date},
			});

			// Tất cả sản phẩm
			const allProduct = await productSchema.countDocuments();

			// SP đang sale
			const saleProduct = await productSchema.countDocuments({
				sale: {
					$gte: 1,
					$lte: 100,
				},
			});

			// SP đang hot
			const hotProduct = await productSchema.countDocuments({
				isHot: true,
			});

			// SP đang trending
			const trendingProduct = await productSchema.countDocuments({
				trending: true,
			});

			// Đơn hàng chờ xác nhận
			const orderPending = await orderSchema.countDocuments({
				statusOrder: 0,
			});

			// Đơn hàng đã xác nhận
			const orderConfirm = await orderSchema.countDocuments({
				statusOrder: 1,
			});

			// Đơn hàng thành công
			const orderComplete = await orderSchema.countDocuments({
				statusOrder: 2,
			});

			// Đơn hàng hủy
			const orderCancelled = await orderSchema.countDocuments({
				statusOrder: 3,
			});

			// Data trả về
			return res.status(200).json(
				resultData({
					code: 200,
					status: 1,
					message: 'Tất cả thống kê!',
					data: {
						allUser: allUser,
						allAdmin: allAdmin,
						allUserMonth: allUserMonth,
						allProduct: allProduct,
						saleProduct: saleProduct,
						hotProduct: hotProduct,
						trendingProduct: trendingProduct,
						orderPending: orderPending,
						orderConfirm: orderConfirm,
						orderComplete: orderComplete,
						orderCancelled: orderCancelled,
					},
				})
			);
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

	// [GET] => /revenue/get-order-revenue ==> Lất sản phẩm sắp hết hàng
	getProductOutStock: async (req: Request, res: Response) => {
		try {
			const list = await productSchema.find({
				$or: [
					{
						amount_size_S: {
							$gte: 0,
							$lte: 10,
						},
					},
					{
						amount_size_M: {
							$gte: 0,
							$lte: 10,
						},
					},
					{
						amount_size_L: {
							$gte: 0,
							$lte: 10,
						},
					},
					{
						amount_size_XL: {
							$gte: 0,
							$lte: 10,
						},
					},
				],
			});

			if (list) {
				return res.status(200).json(
					resultData({
						code: 200,
						status: 1,
						message: 'Tất cả sản phẩm sắp hết hàng!',
						data: list,
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

	// [GET] => /revenue/get-order-revenue ==> Lất sản phẩm sắp hết hàng
	getProductInStock: async (req: Request, res: Response) => {
		try {
			const list = await productSchema.find({
				$or: [
					{
						amount_size_S: {
							$gte: 30,
						},
					},
					{
						amount_size_M: {
							$gte: 30,
						},
					},
					{
						amount_size_L: {
							$gte: 30,
						},
					},
					{
						amount_size_XL: {
							$gte: 30,
						},
					},
				],
			});

			if (list) {
				return res.status(200).json(
					resultData({
						code: 200,
						status: 1,
						message: 'Tất cả sản phẩm đang tồn kho!',
						data: list,
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

	// [GET] => /revenue/get-total-revenue ==> Tính tiền doanh thu
	getTotalRevenue: async (req: Request, res: Response) => {
		try {
			var totalRevenue = 0;
			var revenueYear = 0;
			var revenueMonth = 0;

			const listData = await orderSchema.aggregate([
				{
					$match: {statusOrder: 2},
				},
				{
					$project: {
						year: {$year: '$createdAt'},
						month: {$month: '$createdAt'},
						day: {$dayOfMonth: '$createdAt'},
						totalPrice: {$sum: '$totalPrice'},
					},
				},
			]);

			for (let data of listData) {
				// Tính tổng doanh thu
				totalRevenue += data.totalPrice;

				// Tính tổng doanh thu trong năm
				if (data.year === new Date().getFullYear()) {
					revenueYear += data.totalPrice;
				}

				// Tính tổng doanh thu trong tháng
				if (data.month === new Date().getMonth() + 1) {
					revenueMonth = +data.totalPrice;
				}
			}

			// Data trả về
			return res.status(200).json(
				resultData({
					code: 200,
					status: 1,
					message: 'Tất cả thống kê doanh thu!',
					data: {
						totalRevenue,
						revenueYear,
						revenueMonth,
					},
				})
			);
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

	// [GET] => /revenue/get-total-revenue ==> Doanh thu hàng tháng trong năm
	getRevenueMonthToYear: async (req: Request, res: Response) => {
		try {
			var thang1 = 0;
			var thang2 = 0;
			var thang3 = 0;
			var thang4 = 0;
			var thang5 = 0;
			var thang6 = 0;
			var thang7 = 0;
			var thang8 = 0;
			var thang9 = 0;
			var thang10 = 0;
			var thang11 = 0;
			var thang12 = 0;

			// Doanh thu trong tháng này
			const listData = await orderSchema.aggregate([
				{
					$match: {statusOrder: 2},
				},
				{
					$project: {
						month: {$month: '$createdAt'},
						day: {$dayOfMonth: '$createdAt'},
						totalPrice: {$sum: '$totalPrice'},
					},
				},
			]);

			for (let data of listData) {
				if (data.month === 1) {
					thang1 += data.totalPrice;
				}
				if (data.month === 2) {
					thang2 += data.totalPrice;
				}
				if (data.month === 3) {
					thang3 += data.totalPrice;
				}
				if (data.month === 4) {
					thang4 += data.totalPrice;
				}
				if (data.month === 5) {
					thang5 += data.totalPrice;
				}
				if (data.month === 6) {
					thang6 += data.totalPrice;
				}
				if (data.month === 7) {
					thang7 += data.totalPrice;
				}
				if (data.month === 8) {
					thang8 += data.totalPrice;
				}
				if (data.month === 9) {
					thang9 += data.totalPrice;
				}
				if (data.month === 10) {
					thang10 += data.totalPrice;
				}
				if (data.month === 11) {
					thang11 += data.totalPrice;
				}
				if (data.month === 12) {
					thang12 += data.totalPrice;
				}
			}

			// Data trả về
			return res.status(200).json(
				resultData({
					code: 200,
					status: 1,
					message: 'Doanh thu của từng tháng theo năm!',
					data: [
						thang1,
						thang2,
						thang3,
						thang4,
						thang5,
						thang6,
						thang7,
						thang8,
						thang9,
						thang10,
						thang11,
						thang12,
					],
				})
			);
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

export default revenueController;
