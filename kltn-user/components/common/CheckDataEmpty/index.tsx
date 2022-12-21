import Image from 'next/image';
import Button from '~/components/controls/Button';
import {PropsCheckDataEmpty} from './interface';
import style from './CheckDataEmpty.module.scss';
import {Fragment} from 'react';
import {images} from '~/constants/images';

function CheckDataEmpty({
	isEmpty,
	children,
	msg = 'Hiện tại chưa có dữ liệu',
	onClick,
	txtBtn,
	image,
}: PropsCheckDataEmpty) {
	return (
		<Fragment>
			{isEmpty ? (
				<div className={style.mainEmpty}>
					<div className={style.img}>
						{/* <Image
							src={image || images.placehokder}
							alt='empty data'
							width={120}
							height={96}
						/> */}
						<p>Bạn chưa có dữ liệu</p>
					</div>
					<p className={style.msg}>{msg}</p>
					{!!onClick && (
						<div className={style.groupBtn}>
							<Button primary1RG rounded_8 bold onClick={onClick}>
								{txtBtn}
							</Button>
						</div>
					)}
				</div>
			) : (
				children
			)}
		</Fragment>
	);
}

export default CheckDataEmpty;
