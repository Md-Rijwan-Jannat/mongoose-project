import express from 'express';
import { StudentControllers } from './student.controllers';

const router = express.Router();

router.post('/create-student', StudentControllers.createStudent);
router.get('/single-student', StudentControllers.getSingleStudent);
router.get('/', StudentControllers.grtAllStudents);

export const StudentRoutes = router;
