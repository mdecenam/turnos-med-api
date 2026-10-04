import { Router } from 'express';
import * as medicoController from '../controllers/medicoController';
import { validateSchema } from '../middlewares/validateSchema';
import { medicoSchema, updateMedicoSchema } from '../schemas/medicoSchema';

const router = Router();

router.get('/', medicoController.getMedicos);
router.get('/:id', medicoController.getMedicoById);
router.post('/', validateSchema(medicoSchema), medicoController.createMedico);
router.put('/:id', validateSchema(updateMedicoSchema), medicoController.updateMedico);
router.delete('/:id', medicoController.deleteMedico);

export default router;