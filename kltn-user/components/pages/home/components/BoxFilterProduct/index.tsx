import React, {Fragment} from 'react';
import GridColumn from '~/components/layout/GridColumn';
import InfoProduct from '../InfoProduct';
import Image from 'next/image';

import styles from './BoxFilterProduct.module.scss';
import {useRouter} from 'next/router';
import icons from '~/constants/images/icons';

function BoxFilterProduct({listProduct}: any) {
	const router = useRouter();

	const handleBack = () => {
		router.push('/shop?type=all&status=all');
	};

	return (
		<Fragment>
			{listProduct?.length <= 0 ? (
				<div className={styles.main_empty}>
					<Image src={icons.emptyCart} alt='cart empty' />
					<p className={styles.text_empty}>
						Thể loại sản phẩm không nằm trong danh sách xu hướng!
					</p>
					<div className={styles.btn_empty} onClick={handleBack}>
						<p>Xem tất cả sản phẩm</p>
					</div>
				</div>
			) : (
				<GridColumn col_4>
					{listProduct?.map((product: any, index: any) => (
						<InfoProduct key={index} product={product} />
					))}
				</GridColumn>
			)}
		</Fragment>
	);
}

export default BoxFilterProduct;
