import homeRoute from './homeRoute';
import authRoute from './authRoute';
import userRoute from './userRoute';
import uploadRoute from './uploadRoute';

const route = (app: any) => {
	app.use('/', homeRoute);
	app.use('/auth', authRoute);
	app.use('/user', userRoute);
	app.use('/upload', uploadRoute);
};

export default route;
