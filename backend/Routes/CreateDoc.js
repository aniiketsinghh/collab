import express from 'express';
const router = express.Router();
import {handleSocketConnection} from '../Controllers/CreateDoc.js';
router.post('/create-doc',handleSocketConnection);
export default router;