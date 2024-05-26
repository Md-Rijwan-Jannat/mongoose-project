import config from '../../config';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';

const studentCreateIntoDB = async (password: string, student: IStudent) => {
  const userData: Partial<IUser> = {};

  // if the have'nt password then set the default password
  userData.password = password || (config.default_password as string);

  // student role set
  userData.role = 'student';

  // student id set
  userData.id = '2030120001';

  // create the user
  const newUser = await User.create(userData);

  // create the student
  if (Object.keys(newUser).length) {
    student.id = newUser.id;
    student.user = newUser._id;

    const newStudent = await Student.create(student);

    if (newStudent) {
      return newStudent;
    } else {
      throw new Error("User can't create!");
    }
  }
};

export const UserServices = {
  studentCreateIntoDB,
};
