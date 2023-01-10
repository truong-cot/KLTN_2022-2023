import React, {useState} from 'react';

import styles from './PopupAddAmountProduct.module.scss';
import Form, {Input} from '~/components/controls/Form';
import {TypeAmount, TypePopup} from './interfaces';
import Button from '~/components/controls/Button';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import LoadingData from '~/components/common/LoadingData';
import productService from '~/api/product';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';

function PopupAddAmountProduct({onClose, idProduct}: TypePopup) {
	const router = useRouter();
	const {token} = useSelector((state: RootState) => state.auth);

	const [isLoading, setIsloading] = useState<boolean>(false);

	// State form
	const [form, setForm] = useState<TypeAmount>({
		amount_size_S: 0,
		amount_size_M: 0,
		amount_size_L: 0,
		amount_size_XL: 0,
	});

	const handleSubmit = async () => {
		try {
			setIsloading(true);
			const res: any = await productService.addAmountProduct({
				token: String(token),
				idProduct: String(idProduct),
				amount_size_S: Number(form.amount_size_S),
				amount_size_M: Number(form.amount_size_M),
				amount_size_L: Number(form.amount_size_L),
				amount_size_XL: Number(form.amount_size_XL),
			});

			if (res.status === 1) {
				onClose();
				setIsloading(false);
				toast.success(res.message || 'Cập nhật số lượng thành công!');
				router.replace(router.asPath);
			} else {
				setIsloading(false);
				toast.error(res.message || 'Cập nhật số lượng không thành công!');
			}
		} catch (error) {
			setIsloading(false);
			console.log(error);
			toast.error('Có lỗi xảy ra!');
		}
	};

	return (
		<LoadingData isLoading={isLoading}>
			<div className={styles.container}>
				<p className={styles.title}>Thêm số lượng cho sản phẩm</p>
				<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
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
					<div className={styles.btn}>
						<Button bg_gray p_8_24 rounded_6 onClick={onClose}>
							Hủy
						</Button>
						<Button primary4 p_8_24 rounded_6>
							Xác nhận
						</Button>
					</div>
				</Form>
			</div>
		</LoadingData>
	);
}

export default PopupAddAmountProduct;
