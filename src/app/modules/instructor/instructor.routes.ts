import express from 'express';
import { InstructorControllers } from './instructor.controller';

const router = express.Router();

router.post('/create-instructor', InstructorControllers.createInstructor);
router.get('/', InstructorControllers.getAllInstructor);
router.get('/single-instructor', InstructorControllers.getSingleInstructor);

export const InstructorRoutes = router;
