import express, { Application, NextFunction, Request, Response } from 'express';
import { InstructorRoutes } from './modules/instructor/instructor.routes';
import { StudentRoutes } from './modules/student/student.routes';
import { courseRoutes } from './modules/course/course.routes';
const app: Application = express();
import cors from 'cors';

// parsers
app.use(express.json());
app.use(express.text());
app.use(cors());

// Logger middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.method, req.url, req.body);
  next();
};

// Application routes
app.use('/api/v1/students', logger, StudentRoutes);
app.use('/api/v1/instructors', logger, InstructorRoutes);
app.use('/api/v1/courses', courseRoutes);

// server initialization
app.get('/', (req: Request, res: Response) => {
  res.send('This mongoose server is running');
});

// Route not found handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    status: 'Route error!',
    message: 'Route not found',
  });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Global error handler:', err); // Log the error
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500).json({
    success: false,
    status: 'Global error!',
    message: err.message || 'Internal server error',
  });
});

export default app;
