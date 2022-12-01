import homeRoute from './homeRoute';
import authRoute from './authRoute';
import userRoute from './userRoute';
import uploadRoute from './uploadRoute';
import productRoute from './productRoute';

const route = (app: any) => {
	app.use('/', homeRoute);
	app.use('/auth', authRoute);
	app.use('/user', userRoute);
	app.use('/upload', uploadRoute);
	app.use('/product', productRoute);
};

export default route;
