import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Form, {Input} from '~/components/controls/Form';
import Select, {Option} from '~/components/controls/Select';
import styles from './MainAddProduct.module.scss';

function MainAddProduct() {
	// const {quill, quillRef} = useQuill();

	const [form, setForm] = useState<any>({
		name: '',
		price: '',
		amount_size_S: null,
		amount_size_M: null,
		amount_size_L: null,
		amount_size_XL: null,
		sale: 0,
		category: '',
	});

	const handleSubmit = () => {};
	const [value, setValue] = useState<any>('');

	return (
		<div className={styles.container}>
			<h4 className={styles.title}>Thêm sản phẩm</h4>
			<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
				<Input type='text' placeholder='Tên sản phẩm' name='name' label='Tên sản phẩm' />
				<Input type='number' placeholder='Giá sản phẩm' name='price' label='Giá sản phẩm' />
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
						<span>Sắp xếp theo: </span>
						<Select placeholder='Thể loại sản phẩm' name='category'>
							<Option title='Áo len' value='1' />
							<Option title='Quần Jeans' value='2' />
							<Option title='Áo Phông' value='3' />
						</Select>
					</div>
				</div>
				<div className={styles.content}>
					<p>Mô tả chỉnh sản phẩm</p>
					<ReactQuill
						className={styles.main_text}
						theme='snow'
						value={value}
						onChange={setValue}
					/>
				</div>
			</Form>
		</div>
	);
}

export default MainAddProduct;
