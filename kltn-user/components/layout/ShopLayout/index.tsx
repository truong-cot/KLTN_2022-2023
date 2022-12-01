import LayoutGrid from '../LayoutGrid';
import {TypeShopLayout} from './interfaces';
import styles from './ShopLayout.module.scss';
import SideBarShop from './SideBarShop';

function ShopLayout({children}: TypeShopLayout) {
	return (
		<div className={styles.container}>
			<LayoutGrid>
				<div className={styles.main}>
					<div className={styles.sidebar}>
						<SideBarShop />
					</div>
					<div className={styles.layoutMain}>
						<div className={styles.bg}>{children}</div>
					</div>
				</div>
			</LayoutGrid>
		</div>
	);
}

export default ShopLayout;
