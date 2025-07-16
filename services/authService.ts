import { User, Student, Grade, StudentProfile } from '../types';

/**
 * Simulates a login request.
 * Finds a user by email and checks if the provided password matches.
 */
export const login = (email: string, password: string, users: User[]): User | null => {
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (user && user.password === password) {
    return user;
  }
  return null;
};

/**
 * Simulates registering a new student.
 */
export const registerStudent = (
    details: Omit<StudentProfile, 'grade'> & { grade: Grade, email: string, password: string },
    existingUsers: User[]
): { user: Student | null, error?: string } => {
  const { name, grade, email, password, school, city, country } = details;

  if (!name || !grade || !email || !password) {
    return { user: null, error: "All fields are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      return { user: null, error: "Please enter a valid email address." };
  }

  const userExists = existingUsers.some(u => u.email.toLowerCase() === email.toLowerCase());

  if (userExists) {
    return { user: null, error: "A user with this email already exists." };
  }

  const newUser: Student = {
    id: `user_${Date.now()}`,
    email: email,
    password: password,
    profile: {
        name: name,
        grade: grade,
        school: school,
        city: city,
        country: country,
    },
    role: 'student',
    purchasedTestIds: [],
    purchaseHistory: [],
    testHistory: [],
  };

  return { user: newUser };
};