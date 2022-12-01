import {Fragment, memo, useState} from 'react';
import clsx from 'clsx';
import router from 'next/router';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';

import Popup from '~/components/common/Popup';
import PopupDealer from '~/components/common/PopupDealer';
import {RootState} from '~/redux/store';
import CMSNotificationAPI from '~/services/CMSNotification';

import style from './ButtonNotification.module.scss';

interface TypeStatus {
	dataStatus: any;
	dataId: number;
}

function ButtonNotification({dataStatus, dataId}: TypeStatus) {
	const {token} = useSelector((state: RootState) => state.auth);
	const [popup, setPopup] = useState<boolean>(false);

	const handleToggle = async () => {
		if (token) {
			try {
				const newForm = {
					language: 'vi',
					token: token,
					id: dataId,
				};
				const res: any = await CMSNotificationAPI.pauseOrResumeEvent(newForm);
				if (res.errorCode === 0) {
					toast.success('Cập nhật trạng thái thành công!');
					router.replace(router.asPath, router.asPath, {scroll: false}); //reload page after change role
					setPopup(false);
				} else {
					toast.warn(res.errorMessage || 'Đã xảy ra lỗi');
				}
			} catch (e) {}
		}
	};

	return (
		<Fragment>
			<Popup open={!!popup} onClose={() => setPopup(false)}>
				<PopupDealer
					title={dataStatus === 1 ? 'Ẩn thông báo' : 'Hiển thị thông báo'}
					note={
						dataStatus === 1
							? 'Bạn có muốn ẩn thông báo?'
							: 'Bạn có muốn hiển thị thông báo?'
					}
					onClose={() => setPopup(false)}
					onSubmit={handleToggle}
				/>
			</Popup>
			<div className={style.main}>
				<div
					onClick={() => setPopup(true)}
					className={clsx([style.btn, {[style.on]: dataStatus === 1}])}
				>
					<span className={clsx([style.switch])}></span>
				</div>
			</div>
		</Fragment>
	);
}

export default memo(ButtonNotification);
