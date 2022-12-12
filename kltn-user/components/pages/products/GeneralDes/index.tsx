import React from 'react';

import styles from './GeneralDes.module.scss';
import {TypeData} from './interfaces';

function GeneralDes({data}: TypeData) {
	return <div className={styles.container}>{data}</div>;
}

export default GeneralDes;
