import express, { Application, Request, Response } from 'express';
import { globalErrors } from './error';
import route from './modules/student/student.routes';
const app: Application = express();

// parsers
app.use(express.json());
app.use(express.text());

// student routes
app.use('/api/v1/students', route);

// global error
app.use(globalErrors.globalErrorHandler);
// roue error
app.use(globalErrors.routeErrorHandler);

app.get('/', (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
});

export default app;
