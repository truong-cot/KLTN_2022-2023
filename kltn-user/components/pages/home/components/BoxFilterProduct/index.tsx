import React from 'react';
import GridColumn from '~/components/layout/GridColumn';
import InfoProduct from '../InfoProduct';

import styles from './BoxFilterProduct.module.scss';

function BoxFilterProduct({listProduct}: any) {
	return (
		<GridColumn col_4>
			{listProduct.map((product: any, index: any) => (
				<InfoProduct key={product.id} product={product} />
			))}
		</GridColumn>
	);
}

export default BoxFilterProduct;
