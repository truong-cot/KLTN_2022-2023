import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: {
			type: String,
			require: true,
		},
		username: {
			type: String,
			require: true,
			unique: true,
		},
		email: {
			type: String,
			require: true,
			unique: true,
		},
		password: {
			type: String,
			require: true,
			minlength: 6,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		phone: {
			type: String,
			default: null,
		},
		dateBirth: {
			type: Number,
			default: null,
		},
		monthBirth: {
			type: Number,
			default: null,
		},
		yearBirth: {
			type: Number,
			default: null,
		},
		avatar: {
			type: String,
			default: null,
		},
		address: {
			type: String,
			default: null,
		},
		// 1: Nam, 2: nữ, 0: Giới tính khác
		sex: {
			type: Number,
			default: null,
		},
	},
	{timestamps: true}
);

export default mongoose.model('tb_User', userSchema);
