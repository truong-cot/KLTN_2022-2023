import React, {Fragment} from 'react';

import styles from './TagPage.module.scss';
import LayoutGrid from '~/components/layout/LayoutGrid';
import {ArrowRight2} from 'iconsax-react';
import {TypeTagPage} from './interfaces';
import Link from 'next/link';

function TagPage({text_1, href_1, text_2, href_2, text_3}: TypeTagPage) {
	return (
		<div className={styles.container}>
			<LayoutGrid>
				<div className={styles.main}>
					<Link href={href_1}>{text_1}</Link>
					{text_2 && (
						<Fragment>
							<ArrowRight2 size={14} />
							<Link href={String(href_2)}>{text_2}</Link>
							{text_3 && (
								<Fragment>
									<ArrowRight2 size={14} />
									<span>{text_3}</span>
								</Fragment>
							)}
						</Fragment>
					)}
				</div>
			</LayoutGrid>
		</div>
	);
}

export default TagPage;
