import {Request, Response} from 'express';
import resultData from '../../common/resultData';

const HomeController = {
	// [GET] => home
	home: async (req: Request, res: Response) => {
		try {
			return res.json({
				message: 'Chào mừng bạn đến với API khóa luận tốt nghiệp!!!',
			});
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
	// [POST] => /form-data
	formData: async (req: Request, res: Response) => {
		try {
			let body = '';
			req.on('data', (chunk) => {
				body += chunk.toString();
			});
			req.on('end', () => {
				let formData: any = {};
				const pairs = body.split(/&/);
				for (let i = 0; i < pairs.length; i++) {
					const pair = pairs[i].split(/=/);
					formData[pair[0]] = pair[1];
				}

				return res.status(200).json(
					resultData({
						code: 200,
						status: 1,
						message: 'Received formData successfully.',
						data: formData,
					})
				);
			});
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

export default HomeController;
