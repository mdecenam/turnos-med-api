import { Router } from 'express';
import { getHome } from '../controllers/generalController';

const router = Router();

router.get('/', getHome);

export default router;