// ===============================
// TYPES
// ===============================

export interface Student {
  id: number;
  departmentId: number;
  roll: string;
  password: string;
  name: string;
  seriesBatch: string;
  group: string;
}

export interface Teacher {
  id: number;
  departmentId: number;
  name: string;
  email: string;
  password: string;
}

export type Course = {
  id: number;
  departmentId: number;
    semester: string;
  title: string;
  courseCode: string;
  credit: number;
};

export type CourseAssignment = {
  id: number;
  courseId: number;
  teacherId: number;
  studentIds: number[];
};


// ===============================
// COURSES
// ===============================

export const courses: Course[] = [
  {
    id: 1,
    departmentId: 1,
     semester: "2-1",
    title: "Software Engineering Lab",
    courseCode: "CSE 3206",
    credit: 1.5,
  },
  {
    id: 2,
    departmentId: 1,
     semester: "2-2",
    title: "Database Lab",
    courseCode: "CSE 3208",
    credit: 1.5,
  },
  {
    id: 3,
    departmentId: 2,
     semester: "2-1",
    title: "Computer Networks Lab",
    courseCode: "CSE 3210",
    credit: 1.5,
  },
  {
    id: 4,
    departmentId: 2,
     semester: "2-2",
    title: "Operating System Lab",
    courseCode: "CSE 3212",
    credit: 1.5,
  },
];


// ===============================
// TEACHERS
// ===============================

export const teachers: Teacher[] = [
  {
    id: 1,
    departmentId: 1,
    name: "Jahidul Hasan",
    email: "jahidul@example.com",
    password: "123456",
  },

  {
    id: 2,
    departmentId: 1,
    name: "Rahim Ahmed",
    email: "rahim@example.com",
    password: "123456",
  },

  {
    id: 3,
    departmentId: 2,
    name: "Karim Ahmed",
    email: "karim@example.com",
    password: "123456",
  },
];


// ===============================
// STUDENTS
// ===============================

export const students: Student[] = [
  {
    id: 1,
    departmentId: 1,
    roll: "2024001",
    password: "123456",
    name: "Jahidul Hasan",
    seriesBatch: "2024",
    group: "A",
  },

  {
    id: 2,
    departmentId: 1,
    roll: "2024002",
    password: "123456",
    name: "Rahim Ahmed",
    seriesBatch: "2024",
    group: "A",
  },

  {
    id: 3,
    departmentId: 2,
    roll: "2024003",
    password: "123456",
    name: "Karim Ahmed",
    seriesBatch: "2024",
    group: "B",
  },
];

// ===============================
// COURSE ASSIGNMENTS
// ===============================

export const courseAssignments: CourseAssignment[] = [
  {
    id: 1,
    courseId: 1,
    teacherId: 1,
    studentIds: [1, 2, 3, 4],
  },
  {
    id: 2,
    courseId: 1,
    teacherId: 2,
    studentIds: [5, 6, 7, 8],
  },
  {
    id: 3,
    courseId: 2,
    teacherId: 3,
    studentIds: [9, 10, 11],
  },
  {
    id: 4,
    courseId: 3,
    teacherId: 4,
    studentIds: [12, 13, 14, 15],
  },
];