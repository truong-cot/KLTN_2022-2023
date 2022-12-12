import React from 'react';

import styles from './DetailDes.module.scss';
import {TypeData} from './interfaces';

function DetailDes({data}: TypeData) {
	return (
		<div>
			{data && (
				<div
					dangerouslySetInnerHTML={{
						__html: String(data),
					}}
					style={{
						fontSize: '14px',
						color: '#323448',
						fontWeight: '400',
					}}
				></div>
			)}
		</div>
	);
}

export default DetailDes;
