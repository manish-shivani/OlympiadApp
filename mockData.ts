import { MockTest, Student, Admin, Subject, Grade } from './types';

export const MOCK_SUBJECTS: Subject[] = [
  { 
    id: 'sub_math', 
    name: 'Maths', 
    color: 'blue', 
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M21 10V6a2 2 0 00-2-2H5a2 2 0 00-2 2v4h18z M3 12a2 2 0 002 2h14a2 2 0 002-2v-2H3v2z M5 16h.01M8 16h.01M11 16h.01',
    grades: [1, 2, 3, 4, 5]
  },
  { 
    id: 'sub_eng', 
    name: 'English', 
    color: 'rose', 
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5-1.253',
    grades: [1, 2, 3, 4, 5]
  },
  { 
    id: 'sub_sci', 
    name: 'Science', 
    color: 'emerald', 
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    grades: [1, 2, 3, 4, 5]
  },
  { 
    id: 'sub_cs', 
    name: 'Computer Science', 
    color: 'indigo', 
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    grades: [3, 4, 5]
  },
  { 
    id: 'sub_ss', 
    name: 'Social Science', 
    color: 'amber', 
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.7 9.3l.065.065a.5.5 0 010 .707l-2.829 2.829a.5.5 0 01-.707 0l-.065-.065a.5.5 0 010-.707l2.829-2.829a.5.5 0 01.707 0zM11 5.75l2.071 2.071a.5.5 0 010 .707l-2.07 2.07a.5.5 0 01-.707 0l-2.071-2.07a.5.5 0 010-.707L10.293 5.75a.5.5 0 01.707 0z',
    grades: [3, 4, 5]
  },
];

export const MOCK_TESTS: MockTest[] = [
  // Grade 1
  { id: 'm1_1', grade: 1, subjectId: 'sub_math', topic: 'Counting and Number Recognition', price: 99 },
  { id: 'e1_1', grade: 1, subjectId: 'sub_eng', topic: 'Alphabet and Phonics', price: 99 },
  { id: 's1_1', grade: 1, subjectId: 'sub_sci', topic: 'Living and Non-Living Things', price: 99 },

  // Grade 3
  { id: 'm3_1', grade: 3, subjectId: 'sub_math', topic: 'Multiplication and Division', price: 149 },
  { id: 'cs3_1', grade: 3, subjectId: 'sub_cs', topic: 'Introduction to Computers', price: 149 },
  { id: 'ss3_1', grade: 3, subjectId: 'sub_ss', topic: 'Our Country - India', price: 149 },
  
  // Grade 4
  { id: 'm4_1', grade: 4, subjectId: 'sub_math', topic: 'Fractions and Decimals', price: 199, questions: [
    { 
      question: "Which of these fractions is represented by the shaded area in the pie chart?", 
      options: ["3/4", "1/2", "1/4", "2/3"], 
      answerIndex: 0,
      imageUrl: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3e%3ccircle cx='50' cy='50' r='45' fill='%23e9d5ff'/%3e%3cpath d='M 50 5 A 45 45 0 0 1 95 50 L 50 50 Z' fill='%23a855f7'/%3e%3cpath d='M 95 50 A 45 45 0 0 1 50 95 L 50 50 Z' fill='%23a855f7'/%3e%3cpath d='M 50 95 A 45 45 0 0 1 5 50 L 50 50 Z' fill='%23a855f7'/%3e%3c/svg%3e",
      explanation: "Step 1: Observe the pie chart. It is divided into 4 equal parts.\nStep 2: Count the number of shaded parts. There are 3 shaded parts.\nStep 3: A fraction is represented as (Number of shaded parts) / (Total number of parts).\nStep 4: Therefore, the fraction is 3/4."
    },
    { 
      question: "Which decimal is equivalent to 3/5?", 
      options: ["0.35", "0.6", "0.53", "0.75"], 
      answerIndex: 1,
      explanation: "To convert a fraction to a decimal, you divide the numerator by the denominator. In this case, divide 3 by 5.\n3 ÷ 5 = 0.6.\nTherefore, the decimal equivalent of 3/5 is 0.6."
    }
  ]},
  { id: 'e4_1', grade: 4, subjectId: 'sub_eng', topic: 'Comprehension and Composition', price: 199 },
  { id: 's4_1', grade: 4, subjectId: 'sub_sci', topic: 'Human Body Systems', price: 199 },

  // Grade 5
  { 
    id: 'm5_1', 
    grade: 5, 
    subjectId: 'sub_math', 
    topic: 'Number Sense and Operations', 
    price: 249,
    questions: [
      {
        question: "What is the smallest 5-digit number that can be formed using the digits 7, 1, 0, 8, 2 without repetition?",
        options: ["01278", "10278", "12078", "10287"],
        answerIndex: 1,
        explanation: "Step 1: To form the smallest number, we should arrange the digits in ascending order: 0, 1, 2, 7, 8.\nStep 2: A 5-digit number cannot start with 0. So, we must place the next smallest digit, which is 1, in the first position.\nStep 3: The digit 0 should be placed in the second position to keep the number as small as possible.\nStep 4: The remaining digits (2, 7, 8) are then placed in ascending order.\nStep 5: The resulting number is 10278."
      },
      {
        question: "A shopkeeper bought 15 boxes of pencils, with each box containing 12 pencils. He sold each pencil for ₹5. How much money did he earn in total?",
        options: ["₹900", "₹750", "₹180", "₹600"],
        answerIndex: 0,
        explanation: "Step 1: Find the total number of pencils. Total pencils = Number of boxes × Pencils per box = 15 × 12 = 180 pencils.\nStep 2: Calculate the total earnings. Total earnings = Total pencils × Price per pencil = 180 × 5.\nStep 3: 180 × 5 = 900.\nStep 4: The shopkeeper earned ₹900 in total."
      },
      {
        question: "What is the Roman numeral for 49?",
        options: ["XXXXIX", "IL", "XLIX", "XIXL"],
        answerIndex: 2,
        explanation: "Step 1: Break down 49 into parts based on Roman numeral rules. 49 = 40 + 9.\nStep 2: The Roman numeral for 40 is XL (50 - 10).\nStep 3: The Roman numeral for 9 is IX (10 - 1).\nStep 4: Combine them to get XLIX."
      },
      {
        question: "Find the value of: 3/4 + 1/2 - 1/8",
        options: ["9/8", "1", "7/8", "1 1/8"],
        answerIndex: 0,
        explanation: "Step 1: To add or subtract fractions, they must have a common denominator. The least common multiple (LCM) of 4, 2, and 8 is 8.\nStep 2: Convert each fraction to have a denominator of 8. 3/4 = 6/8. 1/2 = 4/8. 1/8 remains the same.\nStep 3: Perform the operation: 6/8 + 4/8 - 1/8 = (6 + 4 - 1)/8 = 9/8."
      }
    ]
  },
  { 
    id: 'm5_2', 
    grade: 5, 
    subjectId: 'sub_math', 
    topic: 'Geometry and Logical Reasoning', 
    price: 249,
    questions: [
      {
        question: "In a triangle, one angle is 60 degrees. The difference between the other two angles is 20 degrees. What is the measure of the largest angle in the triangle?",
        options: ["60 degrees", "80 degrees", "70 degrees", "50 degrees"],
        answerIndex: 2,
        explanation: "Step 1: The sum of angles in a triangle is 180°. One angle is 60°, so the sum of the other two is 180 - 60 = 120°.\nStep 2: Let the other two angles be A and B. So, A + B = 120 and A - B = 20.\nStep 3: Add the two equations: (A + B) + (A - B) = 120 + 20 => 2A = 140 => A = 70°.\nStep 4: Substitute A back into the first equation: 70 + B = 120 => B = 50°.\nStep 5: The angles are 60°, 70°, and 50°. The largest angle is 70°."
      },
      {
        question: "The perimeter of a rectangular park is 150 meters. If its length is 50 meters, what is its area?",
        options: ["1250 sq. m.", "1000 sq. m.", "2500 sq. m.", "3750 sq. m."],
        answerIndex: 0,
        explanation: "Step 1: The formula for the perimeter of a rectangle is P = 2(length + width). We have P = 150 and length = 50.\nStep 2: 150 = 2(50 + width). Divide by 2: 75 = 50 + width.\nStep 3: Find the width: width = 75 - 50 = 25 meters.\nStep 4: The formula for area is A = length × width.\nStep 5: A = 50 × 25 = 1250 square meters."
      },
      {
        question: "If 'CAT' is coded as 24 and 'DOG' is coded as 26, how will 'TIGER' be coded? (A=1, B=2, ...)",
        options: ["40", "49", "50", "59"],
        answerIndex: 3,
        explanation: "The pattern is to sum the positional values of the letters in the word.\nStep 1: CAT -> C(3) + A(1) + T(20) = 24.\nStep 2: DOG -> D(4) + O(15) + G(7) = 26.\nStep 3: Apply the same pattern to TIGER: T(20) + I(9) + G(7) + E(5) + R(18).\nStep 4: 20 + 9 + 7 + 5 + 18 = 59."
      },
      {
        question: "A clock shows 3:00. What is the angle between the hour hand and the minute hand?",
        options: ["90 degrees", "60 degrees", "120 degrees", "30 degrees"],
        answerIndex: 0,
        explanation: "Step 1: At 3:00, the minute hand points directly at the 12, and the hour hand points directly at the 3.\nStep 2: A clock is a circle of 360 degrees. It is divided into 12 sections.\nStep 3: The angle between each number mark is 360° / 12 = 30°.\nStep 4: The distance between the 12 and the 3 is 3 sections. So, the angle is 3 × 30° = 90°. This forms a right angle."
      }
    ]
  },
];

const STUDENT_USER: Student = {
  id: 'user_123',
  email: 'aarav@test.com',
  password: 'password123',
  profile: {
    name: 'Aarav Sharma',
    grade: 4,
    school: 'Delhi Public School',
    city: 'New Delhi',
    country: 'India',
  },
  role: 'student',
  purchasedTestIds: ['m4_1'],
  purchaseHistory: [
    {
      id: 'purchase_initial',
      testId: 'm4_1',
      testName: 'Maths - Fractions and Decimals',
      amount: 199,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    }
  ],
  testHistory: [],
};

const ADMIN_USER: Admin = {
    id: 'admin_001',
    name: 'Dr. Admin',
    email: 'admin@test.com',
    password: 'adminpassword',
    role: 'admin',
};

export const MOCK_USERS = [STUDENT_USER, ADMIN_USER];