import express from 'express';
import { StudentControllers } from './student.controllers';

const route = express.Router();

route.post('/create-student', StudentControllers.createStudent);

export default route;
