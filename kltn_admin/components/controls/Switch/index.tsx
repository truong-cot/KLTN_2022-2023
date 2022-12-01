import clsx from 'clsx';
import router from 'next/router';
import {Fragment, memo, useState} from 'react';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import Popup from '~/components/common/Popup';
import PopupDealer from '~/components/common/PopupDealer';
import {RootState} from '~/redux/store';
import eventService from '~/services/eventService';
import style from './Switch.module.scss';

interface TypeEvent {
	dataId: number;
	dataStatus: number;
}

function SwitchRemember({dataId, dataStatus}: TypeEvent) {
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
				const res: any = await eventService.PauseOrResumeEvent(newForm);
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
					title={dataStatus === 1 ? 'Ẩn sự kiện' : 'Hiển thị sự kiện'}
					note={
						dataStatus === 1
							? 'Bạn có muốn ẩn sự kiện?'
							: 'Bạn có muốn hiển thị sự kiện?'
					}
					onClose={() => setPopup(false)}
					onSubmit={handleToggle}
				/>
			</Popup>
			<div className={style.main}>
				<div
					className={clsx([style.btn, {[style.on]: dataStatus === 1}])}
					onClick={() => {
						setPopup(true);
					}}
				>
					<span className={clsx([style.switch])}></span>
				</div>
			</div>
		</Fragment>
	);
}

export default memo(SwitchRemember);
