import {MouseEventHandler} from 'react';

export interface PropsButton {
	onClick?: MouseEventHandler;
	children?: React.ReactNode;
	href?: any;
	[props: string]: any;
}
