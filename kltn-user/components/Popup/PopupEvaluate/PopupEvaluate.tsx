import styles from './PopupEvaluate.module.scss';
import {PropsPopupEvaluate} from './interfaces';
import {AiFillStar} from 'react-icons/ai';
import Button from '~/components/controls/Button';
import {IoMdClose} from 'react-icons/io';
import clsx from 'clsx';
import {useState} from 'react';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import LoadingData from '~/components/common/LoadingData';
import productService from '~/api/product';

function PopupEvaluate({onClose, idProduct}: PropsPopupEvaluate) {
	const {token} = useSelector((state: RootState) => state.auth);
	const {userData} = useSelector((state: RootState) => state.user);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [numberStar, setNumberStar] = useState<number>();
	const [content, setContent] = useState<String>('');

	const listStar: Array<any> = [
		{
			id: 1,
			icon: <AiFillStar size={24} />,
		},
		{
			id: 2,
			icon: <AiFillStar size={24} />,
		},
		{
			id: 3,
			icon: <AiFillStar size={24} />,
		},
		{
			id: 4,
			icon: <AiFillStar size={24} />,
		},
		{
			id: 5,
			icon: <AiFillStar size={24} />,
		},
	];

	const handleSubmit = async () => {
		try {
			setIsLoading(true);

			const res: any = await productService.createReview({
				token: String(token),
				idUser: userData._id,
				idProduct: String(idProduct),
				numberStart: Number(numberStar),
				content: String(content),
			});

			if (res.status === 1) {
				setIsLoading(false);
				toast.success(res.message || 'Đánh giá sản phẩm thành công!');
				onClose();
			} else {
				setIsLoading(false);
				toast.warn(res.message || 'Đánh giá sản phẩm không thành công!');
				onClose();
			}
		} catch (error) {
			console.log(error);
			toast.error('Có lỗi xảy ra!');
			onClose();
		}
	};

	return (
		<LoadingData isLoading={isLoading}>
			<div className={styles.container}>
				<p className={styles.title}>Đánh giá cho sản phẩm</p>
				<p className={styles.des}>
					Bạn có cảm nhận gì sau khi sử dụng sản phẩm của chúng tôi
				</p>
				<p className={styles.des_2}>Bạn hài lòng về chất lượng sản phẩm</p>
				<div className={styles.star}>
					{listStar.map((item) => (
						<div
							key={item.id}
							onClick={() => setNumberStar(item.id)}
							className={clsx(styles.icon_star, {
								[styles.star_active]: Number(item.id) <= Number(numberStar),
							})}
						>
							{item.icon}
						</div>
					))}
				</div>
				<p className={styles.des_3}>Nội dung đánh giá</p>
				<textarea
					className={styles.textarea}
					placeholder='Nội dụng đánh giá'
					value={String(content)}
					onChange={(e) => setContent(e.target.value)}
				/>

				<Button bg_green p_4_24 rounded_6 bold onClick={handleSubmit}>
					Gửi đánh giá
				</Button>

				<div onClick={onClose} className={styles.icon_close}>
					<IoMdClose size={20} />
				</div>
			</div>
		</LoadingData>
	);
}

export default PopupEvaluate;
