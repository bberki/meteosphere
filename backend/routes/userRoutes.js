import express from 'express';
import { addFavoriteLocation, removeFavoriteLocation } from '../controllers/userController.js';

const router = express.Router();

router.post('/:id/favorites', addFavoriteLocation);
router.delete('/:id/favorites', removeFavoriteLocation);

export default router;