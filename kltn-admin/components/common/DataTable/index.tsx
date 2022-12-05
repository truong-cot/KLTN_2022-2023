import {Fragment, useEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';

import {Columns, PropsDataTable} from './interface';
import styles from './index.module.scss';
import CheckBox from '~/components/controls/CheckBox';
import Link from 'next/link';

export default function DataTable({
	data = [],
	onSetData,
	columns,
	href,
	className,
	Tab,
}: PropsDataTable) {
	/*---------- Handle CheckBox ----------*/
	useEffect(() => {
		onSetData &&
			onSetData((prev: Array<any>) =>
				prev.map((item: any, index: number) => ({...item, isChecked: false, index: index}))
			);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleCheckAll = (e: any) => {
		const {checked} = e.target;
		onSetData &&
			onSetData((prev: Array<any>) =>
				prev.map((item: any) => ({...item, isChecked: checked}))
			);
	};

	const handleCheckRow = (e: any, i: any) => {
		const {checked} = e.target;
		onSetData &&
			onSetData((prev: Array<any>) =>
				prev.map((item: any, index: number) => {
					if (index === i) {
						return {...item, isChecked: checked};
					}
					return item;
				})
			);
	};

	const isCheckedAll = useMemo(() => {
		return data.length > 0 ? data.some((item: any) => item?.isChecked === false) : false;
	}, [data]);

	/*---------- End ----------*/

	return (
		<Fragment>
			<div className={clsx(styles.container, className)}>
				<table>
					<thead>
						<tr>
							{columns.map((item: Columns, index: number) => {
								return (
									<th key={'head_' + index}>
										<div
											className={clsx(styles.title, {
												[styles.minWidth]: item.title === '',
											})}
										>
											{item.isCheckBox && (
												<CheckBox
													onChange={handleCheckAll}
													checked={!isCheckedAll || false}
												/>
											)}
											<div>{item.title}</div>
										</div>
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody>
						{data.map((item: any, index: any) => {
							return (
								<Row
									key={'row_' + index}
									columns={columns}
									href={href}
									onSetData={onSetData}
									Tab={Tab}
									index={index}
									item={item}
								/>
							);
						})}
					</tbody>
				</table>
			</div>
		</Fragment>
	);
}

const Row = ({columns, href, onSetData, Tab, index, item}: any) => {
	const ref = useRef<any>(null);
	const [showTab, setShowTab] = useState<boolean>(false);

	const TableTr = href ? Link : 'tr';
	const Comp = href ? 'tr' : Fragment;

	const handleCheckRow = (e: any, i: any) => {
		const {checked} = e.target;
		onSetData &&
			onSetData((prev: Array<any>) =>
				prev.map((item: any, index: number) => {
					if (index === i) {
						return {...item, isChecked: checked};
					}
					return item;
				})
			);
	};

	const handleChildClick = (e: any) => {
		e.stopPropagation();
	};

	return (
		<Fragment>
			<TableTr
				ref={ref}
				{...{href: typeof href === 'function' ? href(item) : ''}}
				onClick={() => setShowTab(!showTab)}
			>
				<Comp>
					{columns.map((itemCol: Columns, indexCol: number) => {
						return (
							<td key={`cell_${index}_${indexCol}`}>
								<div
									className={styles.textContent}
									onClick={itemCol.disableHref ? handleChildClick : () => {}}
								>
									{itemCol.isCheckBox && (
										<CheckBox
											onChange={(e: any) => handleCheckRow(e, index)}
											checked={item.isChecked || false}
										/>
									)}
									{itemCol.template(item)}
								</div>
							</td>
						);
					})}
				</Comp>
			</TableTr>
			{!!Tab && showTab && (
				<tr className={styles.tab}>
					<td className={styles.tabTd} colSpan={100}>
						<Tab data={item} />
					</td>
				</tr>
			)}
		</Fragment>
	);
};
