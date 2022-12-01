import {Request, Response} from 'express';
import resultData from '../../common/resultData';
import UserModel from '../models/user';

const UserController = {
	// [GET] ==> /user/all-user?keyword=truong&limit=10&page=1&type=2
	getAllUser: async (req: Request, res: Response) => {
		try {
			// type: 0 => all, type: 1 => admin, type: 2 => user
			var users;
			const {keyword, limit, page, type} = req.query;

			if (type === '0') {
				users = await UserModel.find({
					$or: [
						{
							username: {$regex: keyword},
						},
						{
							name: {$regex: keyword},
						},
					],
				})
					.skip(Number(page) * Number(limit) - Number(limit))
					.limit(Number(limit));
			} else if (type === '1') {
				users = await UserModel.find({
					isAdmin: true,
					$or: [
						{
							username: {$regex: keyword},
						},
						{
							name: {$regex: keyword},
						},
					],
				})
					.skip(Number(page) * Number(limit) - Number(limit))
					.limit(Number(limit));
			} else if (type === '2') {
				users = await UserModel.find({
					isAdmin: false,
					$or: [
						{
							username: {$regex: keyword},
						},
						{
							name: {$regex: keyword},
						},
					],
				})
					.skip(Number(page) * Number(limit) - Number(limit))
					.limit(Number(limit));
			}

			if (users) {
				return res.status(200).json(
					resultData({
						code: 200,
						status: 1,
						message: 'Lấy tài khoản thành công!',
						data: users,
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
	// [POST] ==> /user/change-role
	changeRole: async (req: Request, res: Response) => {
		try {
			const {userId} = req.body;

			const user = await UserModel.findById(userId);

			if (user) {
				if (user?.isAdmin === false) {
					user.isAdmin = true;

					const newUser = await user.save();

					return res.status(200).json(
						resultData({
							code: 200,
							status: 1,
							message:
								'Thay đổi thành tài khoản admin thành công!',
							data: newUser,
						})
					);
				} else if (user?.isAdmin === true) {
					user.isAdmin = false;

					const newUser = await user.save();

					return res.status(200).json(
						resultData({
							code: 200,
							status: 1,
							message:
								'Thay đổi thành tài khoản người dùng thành công!',
							data: newUser,
						})
					);
				}
			} else {
				return res.status(403).json(
					resultData({
						code: 403,
						status: 0,
						message: 'Tài khoản không tồn tại!',
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
	// [DELETE] ==> /user/delete-user
	deleteUser: async (req: Request, res: Response) => {
		try {
			const {userId} = req.body;

			const user = await UserModel.findByIdAndDelete(userId);

			if (user) {
				return res.status(200).json(
					resultData({
						code: 200,
						status: 1,
						message: 'Xóa tài khoản thành công!',
						data: user,
					})
				);
			} else {
				return res.status(403).json(
					resultData({
						code: 403,
						status: 0,
						message: 'Tài khoản không tồn tại!',
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

	// [PUT] ==> /user/update-user/1232423
	updateUser: async (req: Request, res: Response) => {
		try {
			const userId = req.params.id;

			const user = await UserModel.findByIdAndUpdate(userId, req.body);

			const newUser = await UserModel.findById(userId);

			if (user) {
				return res.status(200).json(
					resultData({
						code: 200,
						status: 1,
						message: 'Cập nhập tài khoản thành công!',
						data: newUser,
					})
				);
			} else {
				return res.status(403).json(
					resultData({
						code: 403,
						status: 0,
						message: 'Tài khoản không tồn tại!',
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

	// [GET] ==> /user/current-user
	getCurrentUser: async (req: Request, res: Response) => {
		try {
			const userId = req.params.id;

			const user = await UserModel.findById(userId);

			if (user) {
				return res.status(200).json(
					resultData({
						code: 200,
						status: 1,
						message: 'Lấy tài khoản đăng nhập hiện tại thành công!',
						data: user,
					})
				);
			} else {
				return res.status(403).json(
					resultData({
						code: 403,
						status: 0,
						message: 'Tài khoản không tồn tại!',
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

export default UserController;
