export type Grade = 1 | 2 | 3 | 4 | 5;

export interface Subject {
  id: string;
  name: string;
  color: string; // e.g., 'blue', 'rose'
  icon: string; // SVG path data
  grades: Grade[];
}

export interface Question {
  question: string;
  options: string[];
  answerIndex: number; // Index of the correct option in the options array
  imageUrl?: string;
  explanation?: string;
}

export interface MockTest {
  id: string;
  grade: Grade;
  subjectId: string;
  topic: string;
  price: number; // in INR
  questions?: Question[];
}

export interface PurchaseRecord {
  id:string;
  testId: string;
  testName: string;
  amount: number;
  date: string;
}

export interface TestAttempt {
  testId: string;
  testName: string;
  score: number;
  totalQuestions: number;
  date: string;
  questions: Question[];
  userAnswers: (number | null)[];
}

export interface StudentProfile {
    name: string;
    grade: Grade;
    school?: string;
    city?: string;
    country?: string;
}

export interface Student {
  id: string;
  email: string;
  password?: string; // Should be hashed in a real app
  profile: StudentProfile;
  role: 'student';
  purchasedTestIds: string[];
  purchaseHistory: PurchaseRecord[];
  testHistory: TestAttempt[];
}

export interface Admin {
  id: string;
  email: string;
  password?: string; // Should be hashed in a real app
  name: string;
  role: 'admin';
}

export type User = Student | Admin;


export type ViewState = 
  | { view: 'dashboard' }
  | { view: 'instructions'; test: MockTest }
  | { view: 'test_runner'; test: MockTest }
  | { view: 'result'; attempt: TestAttempt }
  | { view: 'analysis'; attempt: TestAttempt }
  | { view: 'edit_test'; test: MockTest }
  | { view: 'profile' };