import clsx from 'clsx';
import {useMemo} from 'react';
import {Slider} from 'antd';

import React, {useState} from 'react';

import styles from './SideBarShop.module.scss';
import {convertCoin} from '~/common/func/convertCoin';
import {useRouter} from 'next/router';

function SideBarShop() {
	const router = useRouter();

	const defaultPriceRange: number[] = [0, 1000000];

	const makeMarks = useMemo(() => {
		const maxRange = defaultPriceRange[1];

		const ojb: any = {};

		for (let i = 0; i < 4; i++) {
			ojb[i * (maxRange / 4)] = `${convertCoin(i * (maxRange / 4))}`;
		}
		ojb[maxRange] = `${convertCoin(maxRange)}`;

		return ojb;
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.box_1}>
				<div className={styles.top}>
					<h4 className={styles.type}>Loại sản phẩm</h4>
					<span className={styles.icon}>
						<svg
							viewBox='64 64 896 896'
							focusable='false'
							data-icon='right'
							width='14px'
							height='14px'
							fill='currentColor'
							aria-hidden='true'
						>
							<path d='M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z'></path>
						</svg>
					</span>
				</div>
				<div className={styles.list}>
					<div
						onClick={() =>
							router.replace(
								{
									pathname: router.pathname,
									query: {...router.query, type: 'all'},
								},
								undefined,
								{shallow: true, scroll: false}
							)
						}
						className={clsx(styles.item, {
							[styles.active]: router.query.type === 'all',
						})}
					>
						<p className={styles.text_item}>Tất cả</p>
						<div className={styles.qlt}>10</div>
					</div>
					<div
						onClick={() =>
							router.replace(
								{
									pathname: router.pathname,
									query: {...router.query, type: 'ao-len'},
								},
								undefined,
								{shallow: true, scroll: false}
							)
						}
						className={clsx(styles.item, {
							[styles.active]: router.query.type === 'ao-len',
						})}
					>
						<p className={styles.text_item}>Áo len</p>
						<div className={styles.qlt}>10</div>
					</div>
					<div
						onClick={() =>
							router.replace(
								{
									pathname: router.pathname,
									query: {...router.query, type: 'quan-jeans'},
								},
								undefined,
								{shallow: true, scroll: false}
							)
						}
						className={clsx(styles.item, {
							[styles.active]: router.query.type === 'quan-jeans',
						})}
					>
						<p className={styles.text_item}>Quần Jeans</p>
						<div className={styles.qlt}>10</div>
					</div>
					<div
						onClick={() =>
							router.replace(
								{
									pathname: router.pathname,
									query: {...router.query, type: 'ao-phong'},
								},
								undefined,
								{shallow: true, scroll: false}
							)
						}
						className={clsx(styles.item, {
							[styles.active]: router.query.type === 'ao-phong',
						})}
					>
						<p className={styles.text_item}>Áo phông</p>
						<div className={styles.qlt}>10</div>
					</div>
				</div>
			</div>

			<div className={styles.box_1}>
				<div className={styles.top}>
					<h4 className={styles.type}>Trạng thái</h4>
					<span className={styles.icon}>
						<svg
							viewBox='64 64 896 896'
							focusable='false'
							data-icon='right'
							width='14px'
							height='14px'
							fill='currentColor'
							aria-hidden='true'
						>
							<path d='M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z'></path>
						</svg>
					</span>
				</div>
				<div className={styles.list}>
					<div
						onClick={() =>
							router.replace(
								{
									pathname: router.pathname,
									query: {...router.query, status: 'all'},
								},
								undefined,
								{shallow: true, scroll: false}
							)
						}
						className={clsx(styles.item, {
							[styles.active]: router.query.status === 'all',
						})}
					>
						<p className={styles.text_item}>Tất cả</p>
						<div className={styles.qlt}>10</div>
					</div>
					<div
						onClick={() =>
							router.replace(
								{
									pathname: router.pathname,
									query: {...router.query, status: 'hot'},
								},
								undefined,
								{shallow: true, scroll: false}
							)
						}
						className={clsx(styles.item, {
							[styles.active]: router.query.status === 'hot',
						})}
					>
						<p className={styles.text_item}>Hot</p>
						<div className={styles.qlt}>10</div>
					</div>
					<div
						onClick={() =>
							router.replace(
								{
									pathname: router.pathname,
									query: {...router.query, status: 'sale'},
								},
								undefined,
								{shallow: true, scroll: false}
							)
						}
						className={clsx(styles.item, {
							[styles.active]: router.query.status === 'sale',
						})}
					>
						<p className={styles.text_item}>Đang sale</p>
						<div className={styles.qlt}>10</div>
					</div>
					<div
						onClick={() =>
							router.replace(
								{
									pathname: router.pathname,
									query: {...router.query, status: 'trending'},
								},
								undefined,
								{shallow: true, scroll: false}
							)
						}
						className={clsx(styles.item, {
							[styles.active]: router.query.status === 'trending',
						})}
					>
						<p className={styles.text_item}>Trending</p>
						<div className={styles.qlt}>10</div>
					</div>
				</div>
			</div>

			<div className={styles.box_2}>
				<div className={styles.top}>
					<h4 className={styles.type}>Giá sản phẩm</h4>
					<span className={styles.icon}>
						<svg
							viewBox='64 64 896 896'
							focusable='false'
							data-icon='right'
							width='14px'
							height='14px'
							fill='currentColor'
							aria-hidden='true'
						>
							<path d='M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z'></path>
						</svg>
					</span>
				</div>
				<div className={styles.list}>
					<div className={styles.filter_price}>
						<Slider
							marks={makeMarks}
							range
							step={100000}
							min={0}
							max={defaultPriceRange[1]}
							defaultValue={[0, 1000000]}
							onChange={(value) => {
								router.replace(
									{
										pathname: router.pathname,
										query: {
											...router.query,
											priceMin: `${value[0]}`,
											priceMax: `${value[1]}`,
										},
									},

									undefined,
									{shallow: true, scroll: false}
								);
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SideBarShop;
