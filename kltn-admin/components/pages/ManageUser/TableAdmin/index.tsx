import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {HiOutlineDotsCircleHorizontal} from 'react-icons/hi';
import {ImPencil} from 'react-icons/im';
import {RiDeleteBin5Line} from 'react-icons/ri';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import userService from '~/api/user';
import convertDate from '~/common/func/convertDate';
import useDebounce from '~/common/hooks/useDebounce';
import CheckDataEmpty from '~/components/common/CheckDataEmpty';
import DataTable from '~/components/common/DataTable';
import LoadingData from '~/components/common/LoadingData';
import Popup from '~/components/common/Popup';
import Pagination from '~/components/controls/Pagination';
import Search from '~/components/controls/Search';
import PopupChangeRole from '~/components/Popup/PopupChangeRole';
import PopupDeleteUser from '~/components/Popup/PopupDeleteUser';
import RequireAuth from '~/components/protected/RequiredAuth';
import {RootState} from '~/redux/store';
import {User} from './interfaces';
import styles from './TableAdmin.module.scss';

function TableAdmin() {
	const router = useRouter();
	const {token} = useSelector((state: RootState) => state.auth);

	// Popup state
	const [open, setOpen] = useState<boolean>(false);
	const [openChangeRole, setOpenChangeRole] = useState<boolean>(false);

	const [isLoading, setIsloading] = useState<boolean>(false);
	const [keyword, setKeyword] = useState<string>('');
	const [totalItem, setTotalItem] = useState<number>(0);
	const [limit, setLimit] = useState<number>(10);
	const [page, setPage] = useState<number>(1);
	const debounceKeyword = useDebounce(keyword, 500);

	const [data, setData] = useState<Array<User>>([]);
	const [idUser, setIdUser] = useState<String>('');

	useEffect(() => {
		(async () => {
			try {
				setIsloading(true);
				const res: any = await userService.getAllUser({
					token: String(token),
					keyword: debounceKeyword,
					limit: limit,
					page: page,
					type: 1,
				});

				if (res.status === 0) {
					setIsloading(false);
				} else if (res.status === 1) {
					setIsloading(false);
					setData(res?.data.users);
					setTotalItem(res?.data.countUser);
				}
			} catch (error) {
				setIsloading(false); //hidden loading overlay
			}
		})();
	}, [token, limit, page, debounceKeyword, router]);

	const handleDelete = async () => {
		try {
			setIsloading(true);
			const res: any = await userService.deleteUser({
				token: String(token),
				idUser: idUser,
			});

			if (res.status === 0) {
				setIsloading(false);
				toast.warn(res.message || 'Xóa tài khoản không thành công!');
			} else if (res.status === 1) {
				setIsloading(false);
				toast.success(res.message || 'Xóa tài khoản thành công!');
				router.replace(router.asPath); // reload page
				setOpen(false);
			}
		} catch (error) {
			setIsloading(false);
		}
	};

	const handleChangeRole = async () => {
		try {
			// setIsloading(true);
			const res: any = await userService.changeRoleUser({
				token: String(token),
				idUser: idUser,
			});

			if (res.status === 0) {
				setIsloading(false);
				toast.warn(res.message || 'Thay đổi quyền không thành công!');
				setOpenChangeRole(false);
			} else if (res.status === 1) {
				setOpenChangeRole(false);
				setIsloading(false);
				toast.success(res.message || 'Thay đổi quyền thành công!');
				router.replace(router.asPath); // reload page
			}
		} catch (error) {
			setIsloading(false);
			console.log(error);
			toast.error('Có lỗi xảy ra!');
			setOpenChangeRole(false);
		}
	};

	return (
		<RequireAuth>
			<div className={styles.container}>
				<Search
					placeholder='Tìm kiếm theo tên tài khoản , tên user'
					keyword={keyword}
					onSetKeyword={setKeyword}
				/>
				<div className={styles.main}>
					<p className={styles.count}>
						TẤT CẢ TÀI KHOẢN: <span>{totalItem}</span>
					</p>
				</div>
				<LoadingData isLoading={isLoading}>
					<CheckDataEmpty isEmpty={data?.length <= 0}>
						<DataTable
							data={data}
							columns={[
								{
									title: 'Tên đăng nhập',
									template: (data: User) => (
										<p>{data.username || 'Chưa cập nhật'}</p>
									),
								},
								{
									title: 'Tên người dùng',
									template: (data: User) => <p>{data.name || 'Chưa cập nhật'}</p>,
								},
								{
									title: 'Tài khoản',
									template: (data: User) => (
										<p>{data.isAdmin ? 'Admin' : 'User'}</p>
									),
								},
								{
									title: 'Email',
									template: (data: User) => (
										<p>{data.email || 'Chưa cập nhật'}</p>
									),
								},
								{
									title: 'Số điện thoại',
									template: (data: User) => (
										<p>{data.phone || 'Chưa cập nhật'}</p>
									),
								},
								{
									title: 'Ngày tạo',
									template: (data: User) => (
										<p>
											{convertDate(String(data.createdAt)).getFullDateTime()}
										</p>
									),
								},
								{
									title: 'Thao tác',
									template: (data: User) => (
										<div className={styles.control}>
											<div
												className={styles.detail}
												onClick={() =>
													router.push(`/manage-user/detail/${data._id}`)
												}
											>
												<HiOutlineDotsCircleHorizontal size={22} />
											</div>
											<div
												className={styles.edit}
												onClick={() => {
													setOpenChangeRole(true);
													setIdUser(data._id);
												}}
											>
												<ImPencil size={20} />
											</div>
											<div
												className={styles.delete}
												onClick={() => {
													setOpen(true);
													setIdUser(data._id);
												}}
											>
												<RiDeleteBin5Line size={20} />
											</div>
										</div>
									),
								},
							]}
						></DataTable>
					</CheckDataEmpty>
				</LoadingData>
				<Pagination
					pageCurrent={page}
					pageSize={limit}
					onSetPage={setPage}
					onSetPageSize={setLimit}
					totalItem={totalItem}
				/>
			</div>

			{/* Popup */}
			<Popup open={open} onClose={() => setOpen(false)}>
				<PopupDeleteUser handleSumit={handleDelete} onClose={() => setOpen(false)} />
			</Popup>
			<Popup open={openChangeRole} onClose={() => setOpenChangeRole(false)}>
				<PopupChangeRole
					handleSumit={handleChangeRole}
					onClose={() => setOpenChangeRole(false)}
				/>
			</Popup>
		</RequireAuth>
	);
}

export default TableAdmin;
