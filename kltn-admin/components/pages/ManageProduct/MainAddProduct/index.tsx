import React, {useState} from 'react';
import Form, {Input} from '~/components/controls/Form';
import Select, {Option} from '~/components/controls/Select';
import styles from './MainAddProduct.module.scss';
import Button from '~/components/controls/Button';
import {TypeProduct} from './interfaces';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import productService from '~/api/product';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';
import dynamic from 'next/dynamic';
import LoadingData from '~/components/common/LoadingData';

const JoditEditor = dynamic(() => import('jodit-react'), {ssr: false});

function MainAddProduct() {
	const router = useRouter();

	const {token} = useSelector((state: RootState) => state.auth);

	const [isLoading, setIsloading] = useState<boolean>(false);

	const [content, setContent] = useState<string>('');

	// State form
	const [form, setForm] = useState<TypeProduct>({
		name: '',
		price: '',
		amount_size_S: 0,
		amount_size_M: 0,
		amount_size_L: 0,
		amount_size_XL: 0,
		sale: 0,
		category: '',
		main_des: '',
		general_des: '',
	});

	// Get value
	const handleChange = (e: any) => {
		const {value, name} = e.target;

		setForm((prev: any) => ({
			...prev,
			[name]: value,
		}));
	};

	// Submit form
	const handleSubmit = async () => {
		try {
			setIsloading(true);

			const res: any = await productService.createProduct({
				...form,
				token: String(token),
				detail_des: content,
			});
			if (res.status === 1) {
				setIsloading(false);
				setForm({
					name: '',
					price: '',
					amount_size_S: 0,
					amount_size_M: 0,
					amount_size_L: 0,
					amount_size_XL: 0,
					sale: 0,
					category: '',
					main_des: '',
					general_des: '',
				});

				toast.success(res.message || 'Thêm sản phẩm thành công!');
				router.push(`/manage-product/detaiil-product/${res.data._id}`);
			} else {
				setIsloading(false);
				toast.warn(res.message || 'Có lỗi xảy ra!');
			}
		} catch (error) {
			setIsloading(false);
			toast.error('Có lỗi xảy ra!');
		}
	};

	return (
		<LoadingData isLoading={isLoading}>
			<div className={styles.container}>
				<h4 className={styles.title}>Thêm sản phẩm</h4>
				<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
					<Input
						type='text'
						placeholder='Tên sản phẩm'
						name='name'
						label='Tên sản phẩm'
					/>
					<Input
						type='number'
						placeholder='Giá sản phẩm'
						name='price'
						label='Giá sản phẩm'
					/>
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
							<span>Thể loại sản phẩm: </span>
							<Select
								placeholder='Thể loại sản phẩm'
								name='category'
								onChange={handleChange}
							>
								<Option title='Áo len' value='1' />
								<Option title='Quần Jeans' value='2' />
								<Option title='Áo Phông' value='3' />
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
						></textarea>
					</div>
					<div className={styles.box_des}>
						<p className={styles.text}>Mô tả chung</p>
						<textarea
							onChange={handleChange}
							className={styles.input_area}
							placeholder='Mô tả chung'
							name='general_des'
						></textarea>
					</div>
					<div className={styles.content}>
						<span className={styles.text}>Mô tả chi tiết</span>
						{/* <div className={styles.texteare}>
						<div style={{width: '100%', height: '89%'}}>
							<div ref={quillRef} />
						</div>
					</div> */}
						<div className={styles.texteare}>
							<JoditEditor
								value={content}
								onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
								onChange={(newContent) => {}}
							/>
						</div>
					</div>

					<div className={styles.btn}>
						<Button>Thêm sản phẩm</Button>
					</div>
				</Form>
			</div>
		</LoadingData>
	);
}

export default MainAddProduct;
