import { Router } from 'express';
import * as turnoController from '../controllers/turnoController';
import { validateSchema } from '../middlewares/validateSchema';
import { turnoSchema, updateTurnoSchema } from '../schemas/turnoSchema';

const router = Router();

router.get('/', turnoController.getTurnos);
router.get('/:id', turnoController.getTurnoById);
router.post('/', validateSchema(turnoSchema), turnoController.createTurno);
router.put('/:id', validateSchema(updateTurnoSchema), turnoController.updateTurno);
router.delete('/:id', turnoController.deleteTurno);

export default router;