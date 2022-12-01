import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import {ArrowRight2, Danger, Information, TickCircle, Warning2} from 'iconsax-react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {RiCheckFill, RiCloseFill} from 'react-icons/ri';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import Popup from 'reactjs-popup';

import {convertCoin} from '~/common/func/convertCoin';
import convertDate from '~/common/func/convertDate';
import Avatar from '~/components/common/Avatar';
import CheckDataEmpty from '~/components/common/CheckDataEmpty';
import DataTable from '~/components/common/DataTable';
import LoadingData from '~/components/common/LoadingData';
import LoadingScreen from '~/components/common/LoadingScreen';
import PopupApproveWithdrawalOrders from '~/components/common/PopupApproveWithdrawalOrders';
import PopupRefuseToWithdraw from '~/components/common/PopupRefuseToWithdraw';
import Button from '~/components/controls/Button';
import RequiredPermission from '~/components/protected/RequiredPermission';
import {MENU_CODE, PERMISSIONS} from '~/constants/enum/permission';
import {RootState} from '~/redux/store';
import CMSDepositWithdrawService from '~/services/CMSDepositWithdraw';
import PopupDetailWait from '../../withdrawal-orders/PopupDetailWait';
import {Data} from './interface';
import styles from './TableLeft.module.scss';

function TableLeft() {
	const router = useRouter();
	const {token} = useSelector((state: RootState) => state.auth);
	const [loading, setLoading] = useState<boolean>(true);
	const [data, setData] = useState<Array<Data>>([]);
	const [loadingHandle, setLoadingHandle] = useState<boolean>(false);
	const [listId, setListId] = useState<Array<number>>([]);
	const [showPopupDetail, setShowPopupDetail] = useState<boolean>(false);
	const [dataDetail, setDataDetail] = useState<any>();
	const [showPopupCommandApproval, setShowPopupCommandApproval] = useState<boolean>(false);
	const [showPopupRefuse, setShowPopupRefuse] = useState<boolean>(false);

	useEffect(() => {
		if (token) {
			setLoading(true);
			(async () => {
				try {
					const res: any = await CMSDepositWithdrawService.getWithdrawalRequestList({
						language: 'vi',
						token: token,
						joinTo: null,
						joinFrom: null,
						page: 1,
						limit: 10,
						state: 0,
					});
					if (res.errorCode === 0) {
						setData(res.data.result);
					}

					setLoading(false);
				} catch (error) {
					setLoading(false);
				}
			})();
		}
	}, [token, router]);

	/********** Chấp nhận duyệt một **********/
	const showPopupCommandOne = (id: number) => {
		setListId([id]);
		setShowPopupCommandApproval(true);
	};

	/********** Từ chối duyệt một **********/
	const showPopupRefuseOne = (id: number) => {
		setListId([id]);
		setShowPopupRefuse(true);
	};

	const handleRefuse = async () => {
		setShowPopupRefuse(false);
		if (token) {
			setLoadingHandle(true);
			try {
				const res: any = await CMSDepositWithdrawService.declineBrowseRequest(
					{
						language: 'vi',
						token,
						ids: listId,
					},
					MENU_CODE.TC_1_0
				);
				if (res.errorCode === 0) {
					toast.success('Đã từ chối duyệt');
					router.replace(router.asPath, router.asPath, {scroll: false});
				} else {
					toast.warn(res.errorMessage || 'Vui lòng thử lại sau ít phút');
				}
				setListId([]);
				setLoadingHandle(false);
			} catch (err) {
				setListId([]);
				toast.warn('Vui lòng thử lại sau ít phút');
				setLoadingHandle(false);
			}
		}
	};

	const handleCommand = async () => {
		setShowPopupCommandApproval(false);
		if (token) {
			setLoadingHandle(true);
			try {
				const res: any = await CMSDepositWithdrawService.acceptBrowseRequest(
					{
						language: 'vi',
						token,
						ids: listId,
					},
					MENU_CODE.TC_1_0
				);
				if (res.errorCode === 0) {
					toast.success('Đã duyệt thành công');
					router.replace(router.asPath, router.asPath, {scroll: false});
				} else {
					toast.warn(res.errorMessage || 'Vui lòng thử lại sau ít phút');
				}
				setListId([]);
				setLoadingHandle(false);
			} catch (err) {
				setListId([]);
				toast.warn('Vui lòng thử lại sau ít phút');
				setLoadingHandle(false);
			}
		}
	};

	return (
		<div className={clsx('table-color', styles.container)}>
			<div className={styles.head}>
				<h2>Duyệt lệnh rút tiền</h2>
				<Link href='/withdrawal-orders'>
					<button className={styles.btn}>
						<span>Xem thêm</span>
						<span className={styles.icon}>
							<ArrowRight2 size={16} />
						</span>
					</button>
				</Link>
			</div>
			<LoadingData isLoading={loading}>
				<CheckDataEmpty isEmpty={data.length <= 0}>
					<div className={styles.table}>
						<DataTable
							data={data}
							columns={[
								{
									title: 'Cảnh báo',
									template: (data: Data) => (
										<div>
											<Tippy
												content={WARNING_ICON[data.warning].title}
												placement='bottom'
											>
												<div>{WARNING_ICON[data.warning].Icon}</div>
											</Tippy>
										</div>
									),
								},
								{
									title: 'Người thực hiện',
									template: (data: Data) => {
										return (
											<div className={styles.username}>
												<Avatar className={styles.avatar} /> {data.userName}
											</div>
										);
									},
								},
								{
									title: 'Số tiền rút',
									template: (data: Data) => {
										return <>${convertCoin(data.amount)}</>;
									},
								},
								{
									title: 'Thời gian yêu cầu',
									template: (data: Data) => {
										return (
											<>{convertDate(data.timeCreated).getFullDateTime()}</>
										);
									},
								},
								{
									title: '',
									template: (data: Data) => (
										<RequiredPermission
											code={MENU_CODE.LCD_9_0_1}
											permisson={PERMISSIONS.DUYET}
										>
											<div className={styles.active}>
												<Button
													primary5
													rounded_6
													onClick={() => {
														setShowPopupDetail((prev) => !prev);
														setDataDetail(data);
													}}
												>
													Chi tiết
												</Button>
											</div>
										</RequiredPermission>
									),
								},
								// {
								// 	title: 'Thao tác',
								// 	template: (data: Data) => {
								// 		return (
								// 			<div className={styles.active}>
								// 				<button
								// 					className={styles.btn}
								// 					onClick={() => showPopupCommandOne(data.id)}
								// 				>
								// 					<RiCheckFill />
								// 				</button>
								// 				<button
								// 					className={styles.btn}
								// 					onClick={() => showPopupRefuseOne(data.id)}
								// 				>
								// 					<RiCloseFill />
								// 				</button>
								// 			</div>
								// 		);
								// 	},
								// },
							]}
						/>
					</div>
				</CheckDataEmpty>
			</LoadingData>
			<LoadingScreen isLoading={loadingHandle} />
			<Popup open={showPopupDetail} onClose={() => setShowPopupDetail(false)}>
				{!!dataDetail && (
					<PopupDetailWait
						data={dataDetail}
						onClose={() => setShowPopupDetail(false)}
						onCancel={showPopupRefuseOne}
						onAgree={showPopupCommandOne}
					/>
				)}
			</Popup>
			<Popup
				open={showPopupRefuse && listId.length > 0}
				onClose={() => setShowPopupRefuse(false)}
			>
				<PopupRefuseToWithdraw
					onClose={() => setShowPopupRefuse(false)}
					onSubmit={handleRefuse}
					title='Từ chối lệnh rút tiền !'
					text='Bạn có chắc muốn duyệt các lệnh rút tiền này'
				/>
			</Popup>
			<Popup
				open={showPopupCommandApproval}
				onClose={() => setShowPopupCommandApproval(false)}
			>
				<PopupApproveWithdrawalOrders
					onClose={() => setShowPopupCommandApproval(false)}
					onSubmit={handleCommand}
				/>
			</Popup>
		</div>
	);
}

export default TableLeft;
