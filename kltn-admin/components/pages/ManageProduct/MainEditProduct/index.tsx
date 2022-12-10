import {useRouter} from 'next/router';
import React, {useState, useEffect} from 'react';

import {useSelector} from 'react-redux';
import Button from '~/components/controls/Button';
import Form, {Input} from '~/components/controls/Form';
import Select, {Option} from '~/components/controls/Select';
import {RootState} from '~/redux/store';

import styles from './MainEditProduct.module.scss';
import {TypeForm} from './interfaces';
import LoadingData from '~/components/common/LoadingData';
import {toast} from 'react-toastify';
import productService from '~/api/product';
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), {ssr: false});

function MainEditProduct() {
	const router = useRouter();
	const {token} = useSelector((state: RootState) => state.auth);
	const [content, setContent] = useState<any>('');
	const [isLoading, setIsloading] = useState<boolean>(false);
	const idProduct = router.asPath.split('/')[3];

	// State form
	const [form, setForm] = useState<TypeForm>({
		name: '',
		price: '',
		category: '',
		amount_size_S: 0,
		amount_size_M: 0,
		amount_size_L: 0,
		amount_size_XL: 0,
		sale: 0,
		isHot: '',
		trending: '',
		main_des: '',
		general_des: '',
		detail_des: '',
	});

	// Get value
	const handleChange = (e: any) => {
		const {value, name} = e.target;

		setForm((prev: any) => ({
			...prev,
			[name]: value,
		}));
	};

	// Get thông tin sản phẩm
	useEffect(() => {
		(async () => {
			try {
				setIsloading(true);

				const res: any = await productService.getDetailProduct({
					idProduct: idProduct,
					token: String(token),
				});

				if (res.status === 1) {
					setIsloading(false);
					setContent(res.data.detail_des);
					setForm((prev) => ({
						...res.data,
					}));
				} else {
					setIsloading(false);
					toast.warn(res.message);
				}
			} catch (error) {
				console.log(error);
				setIsloading(false);
				toast.error('Có lỗi xảy ra!');
			}
		})();
	}, []);

	// Submit
	const handleSubmit = async () => {
		try {
			setIsloading(true);

			const res: any = await productService.updateProduct({
				token: String(token),
				idProduct: idProduct,
				name: form.name,
				price: form.price,
				amount_size_S: form.amount_size_S,
				amount_size_M: form.amount_size_M,
				amount_size_L: form.amount_size_L,
				amount_size_XL: form.amount_size_XL,
				category: form.category,
				isHot: form.isHot,
				trending: form.trending,
				sale: form.sale,
				main_des: form.main_des,
				general_des: form.general_des,
				detail_des: form.detail_des,
			});

			if (res.status === 1) {
				setIsloading(false);
				toast.success(res.message);
			} else {
				setIsloading(false);
				toast.warn(res.message);
			}
		} catch (error) {
			console.log(error);
			setIsloading(false);
			toast.error('Có lỗi xảy ra!');
		}
	};

	return (
		<LoadingData isLoading={isLoading}>
			<div className={styles.container}>
				<h4 className={styles.title}>Chỉnh sửa sản phẩm</h4>
				<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
					<Input
						type='text'
						placeholder='Tên sản phẩm'
						name='name'
						label='Tên sản phẩm'
					/>
					<div className={styles.group_1}>
						<div>
							<Input
								type='number'
								placeholder='Giá sản phẩm'
								name='price'
								label='Giá sản phẩm'
							/>
						</div>
						<div className={styles.select}>
							<span>Thể loại sản phẩm: </span>
							<Select
								placeholder='Thể loại sản phẩm'
								name='category'
								onChange={handleChange}
								value={form.category}
							>
								<Option title='Áo len' value={1} />
								<Option title='Quần Jeans' value={2} />
								<Option title='Áo Phông' value={3} />
							</Select>
						</div>
					</div>
					<div className={styles.group}>
						<div>
							<Input
								type='number'
								placeholder='Số lượng size S'
								name='amount_size_S'
								label='Số lượng size S'
							/>
						</div>
						<div>
							<Input
								type='number'
								placeholder='Số lượng size M'
								name='amount_size_M'
								label='Số lượng size M'
							/>
						</div>
						<div>
							<Input
								type='number'
								placeholder='Số lượng size L'
								name='amount_size_L'
								label='Số lượng size L'
							/>
						</div>
						<div>
							<Input
								type='number'
								placeholder='Số lượng size XL'
								name='amount_size_XL'
								label='Số lượng size XL'
							/>
						</div>
					</div>
					<div className={styles.group_2}>
						<Input
							type='number'
							placeholder='Nhập số phần trăm muốn sale (%)'
							name='sale'
							label='Nhập số phần trăm muốn sale (%)'
						/>
						<div className={styles.select}>
							<span>Đang hot: </span>
							<Select
								placeholder='Hot'
								name='isHot'
								onChange={handleChange}
								value={form.isHot}
							>
								<Option title='Không Hot' value={'0'} />
								<Option title='Đang Hot' value={'1'} />
							</Select>
						</div>
						<div className={styles.select}>
							<span>Đang trending: </span>
							<Select
								placeholder='Trending'
								name='trending'
								onChange={handleChange}
								value={form.trending}
							>
								<Option title='Không trending' value={'0'} />
								<Option title='Đang trending' value={'1'} />
							</Select>
						</div>
					</div>
					<div className={styles.box_des}>
						<p className={styles.text}>Mô tả chính</p>
						<textarea
							onChange={handleChange}
							className={styles.input_area}
							placeholder='Mô tả chính'
							name='main_des'
							value={String(form.main_des)}
						></textarea>
					</div>
					<div className={styles.box_des}>
						<p className={styles.text}>Mô tả chung</p>
						<textarea
							onChange={handleChange}
							className={styles.input_area}
							placeholder='Mô tả chung'
							name='general_des'
							value={String(form.general_des)}
						></textarea>
					</div>
					<div className={styles.content}>
						<span className={styles.text}>Mô tả chi tiết</span>
						<div className={styles.texteare}>
							<JoditEditor
								value={content}
								onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
								onChange={(newContent) => {}}
							/>
						</div>
					</div>

					<div className={styles.btn}>
						<Button bg_gray p_8_24 rounded_6 onClick={() => router.back()}>
							Quay lại
						</Button>
						<Button primary4 p_8_24 rounded_6 onClick={handleSubmit}>
							Xác nhận chỉnh sửa
						</Button>
					</div>
				</Form>
			</div>
		</LoadingData>
	);
}

export default MainEditProduct;
