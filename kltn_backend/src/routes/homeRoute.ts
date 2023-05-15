import express from 'express';
import HomeController from '../app/controllers/homeController';

const router = express.Router();

router.get('/', HomeController.home);
router.post('/form-data', HomeController.formData);

export default router;
