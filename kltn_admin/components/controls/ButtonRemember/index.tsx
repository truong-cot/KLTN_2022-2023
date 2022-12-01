import clsx from 'clsx';
import {memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {toggleRememberPass} from '~/redux/reducers/auth';
import {RootState} from '~/redux/store';
import style from './ButtonRemember.module.scss';

function ButtonRemember() {
	const dispatch = useDispatch();
	const {isRemember} = useSelector((state: RootState) => state.auth);

	/********** toggle remember password **********/
	const handleToggle = () => {
		dispatch(toggleRememberPass(!isRemember));
	};

	return (
		<div className={style.main}>
			<div className={clsx([style.btn, {[style.on]: isRemember}])} onClick={handleToggle}>
				<span className={clsx([style.switch])}></span>
			</div>
			<span className={style.text}>Nhớ mật khẩu</span>
		</div>
	);
}

export default memo(ButtonRemember);
