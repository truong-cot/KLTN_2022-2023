export interface PropsTabBar {}

export interface PropsItemTab {
	item: ItemTab;
	showTabBar: boolean;
	index: number;
	onShowTabBar: () => void;
}

export interface ItemTab {
	icon: any;
	iconActive: any;
	title: string;
	href: string;
	menu?: Array<any>;
}
