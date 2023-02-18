import express from 'express';

const router = express.Router();

import multer from 'multer';
const storage = multer.diskStorage({
	filename: function (req: any, file: any, cb: any) {
		cb(null, file.fieldname + '-' + Date.now());
	},
});
// const upload = multer({storage});

export default router;
