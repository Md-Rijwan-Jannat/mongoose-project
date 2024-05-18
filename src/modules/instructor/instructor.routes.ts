import express from 'express';
import { InstructorControllers } from './instructor.controller';

const router = express.Router();

router.post('/create-instructor', InstructorControllers.createInstructor);
router.get('/get-instructor', InstructorControllers.createInstructor);

export const InstructorRoutes = router;
