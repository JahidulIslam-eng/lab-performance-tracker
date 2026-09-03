"use client";

import React, { useEffect, useRef, useState } from "react";
import { Quintessential } from "next/font/google";
import { AiFillCaretRight } from "react-icons/ai";
import { FiAlignJustify } from "react-icons/fi";
import Link from "next/link";
import {
  FiEdit2,
  FiTrash2,
  FiUsers,
  FiPlus,
  FiX,
  FiSearch,
  FiBook,
  FiUser,
} from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";
import {
  courses as initialCourses,
  teachers as initialTeachers,
  students as initialStudents,
  courseAssignments as initialAssignments,
  type Course,
  type Teacher,
  type Student,
  type CourseAssignment,
} from "@/app/data/adminData";

const quintessential = Quintessential({
  subsets: ["latin"],
  weight: "400",
});



interface Department {
  id: number;
  name: string;
  shortName: string;
}




const Page = () => {





 const [profileOpen, setProfileOpen] = useState(false);
const profileRef = useRef<HTMLDivElement>(null);
const departmentRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
const target = event.target as Node;

    // Profile dropdown
    if (
      profileRef.current &&
      !profileRef.current.contains(target)
    ) {
      setProfileOpen(false);
    }

    // Department menu
    if (
      departmentRef.current &&
      !departmentRef.current.contains(target)
    ) {
      setDepartmentMenuOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

 
  

  


//teacher menu


const [teacherDepartmentId, setTeacherDepartmentId] =
  useState<number | "">("");


const [teacherManagementOpen, setTeacherManagementOpen] =
  useState(false);



// Teacher Management
const [teacherDetailsId, setTeacherDetailsId] =
  useState<number | null>(null);


const [deleteTeacherId, setDeleteTeacherId] =
  useState<number | null>(null);

const editTeacher = (teacher: Teacher) => {

  setEditingTeacherId(teacher.id);

  setTeacherName(teacher.name);

  setTeacherEmail(teacher.email);

  setTeacherPassword(teacher.password);

  // Teacher Management modal open
  setShowTeacherModal(true);
};
  

  // =========================
  // DEPARTMENT STATES
  // =========================

  const [departmentMenuOpen, setDepartmentMenuOpen] =
    useState(false);

  const [departmentChangesOpen, setDepartmentChangesOpen] =
    useState(false);

  const [departmentActionId, setDepartmentActionId] =
    useState<number | null>(null);

  const [deleteDepartmentId, setDeleteDepartmentId] =
    useState<number | null>(null);


 
  // =========================
  // OTHER STATES / FUNCTIONS
  // =========================

  // ...


  

  

  // =====================================================
  // MAIN DATA
  // =====================================================

  const [courses, setCourses] =
    useState<Course[]>(initialCourses);

  const [teachers, setTeachers] =
    useState<Teacher[]>(initialTeachers);

  const [students, setStudents] =
    useState<Student[]>(initialStudents);

  const [assignments, setAssignments] =
    useState<CourseAssignment[]>(initialAssignments);


  // =====================================================
  // SEARCH
  // =====================================================

  const [studentSearch, setStudentSearch] =
    useState("");

  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);


  // =====================================================
  // MODALS
  // =====================================================

  const [showAssignmentModal, setShowAssignmentModal] =
    useState(false);

  const [showTeacherModal, setShowTeacherModal] =
    useState(false);

  const [showStudentModal, setShowStudentModal] =
    useState(false);

  const [showCourseModal, setShowCourseModal] =
    useState(false);


  // =====================================================
  // EDIT STATES
  // =====================================================

  const [editingAssignmentId, setEditingAssignmentId] =
    useState<number | null>(null);

  const [editingTeacherId, setEditingTeacherId] =
    useState<number | null>(null);

  const [editingStudentId, setEditingStudentId] =
    useState<number | null>(null);

  const [editingCourseId, setEditingCourseId] =
    useState<number | null>(null);


  // =====================================================
  // ASSIGNMENT FORM
  // =====================================================

  const [selectedCourseId, setSelectedCourseId] =
    useState<number | "">("");

  const [selectedTeacherId, setSelectedTeacherId] =
   useState<number | "">("");

  const [selectedBatch, setSelectedBatch] =
    useState("");

  const [selectedGroup, setSelectedGroup] =
    useState("");

  const [selectedStudentIds, setSelectedStudentIds] =
    useState<number[]>([]);
const [expandedAssignments, setExpandedAssignments] =
  useState<number[]>([]);

  // =====================================================
  // TEACHER FORM
  // =====================================================

  const [teacherName, setTeacherName] =
    useState("");

  const [teacherEmail, setTeacherEmail] =
    useState("");

  const [teacherPassword, setTeacherPassword] =
    useState("");
const [showTeacherDetails, setShowTeacherDetails] =
  useState(false);

  // =====================================================
  // STUDENT FORM
  // =====================================================




  const [studentId, setStudentId] =
    useState("");

  const [studentRoll, setStudentRoll] =
    useState("");

  const [studentName, setStudentName] =
    useState("");

  const [studentPassword, setStudentPassword] =
    useState("");

  const [studentBatch, setStudentBatch] =
    useState("");

  const [studentGroup, setStudentGroup] =
    useState("");
const [deleteStudentId, setDeleteStudentId] =
  useState<number | null>(null);
  const [studentDetailsId, setStudentDetailsId] =
  useState<number | null>(null);
  const [showStudentDetailsModal, setShowStudentDetailsModal] =
  useState(false);

const [studentDepartmentId, setStudentDepartmentId] =
  useState<number | "">("");

const editStudent = (student: Student) => {

  setEditingStudentId(student.id);

  setStudentId(
    String(student.id)
  );

  setStudentRoll(
    student.roll
  );

  setStudentName(
    student.name
  );

  setStudentPassword(
    student.password
  );

  setStudentBatch(
    student.seriesBatch
  );

  setStudentGroup(
    String(student.group)
  );

  setShowStudentModal(true);
};
  // =====================================================
  // COURSE FORM
  // =====================================================

  const [courseTitle, setCourseTitle] =
    useState("");

  const [courseCode, setCourseCode] =
    useState("");
const [selectedSemesterId, setSelectedSemesterId] =
  useState<number | "">("");
 // const [courseCredit, setCourseCredit] =
   // useState("");
   const [courseCredit, setCourseCredit] = useState<number>(0);
const [courseDetailsUpdateOpen, setCourseDetailsUpdateOpen] =
  useState(false);

const [courseDetailsId, setCourseDetailsId] =
  useState<number | null>(null);

const [deleteCourseId, setDeleteCourseId] =
  useState<number | null>(null);

const [selectedCourseDepartmentId, setSelectedCourseDepartmentId] =
  useState<number | "">("");


const [courseSemester, setCourseSemester] = useState<string>("");


const [courseDetailsDepartmentId, setCourseDetailsDepartmentId] =
  useState<number | "">("");

const [courseDetailsSemesterId, setCourseDetailsSemesterId] =
  useState<number | "">("");



const [courseDetailsSemester, setCourseDetailsSemester] =
  useState<string>("");


const editCourse = (course: Course) => {

  setEditingCourseId(course.id);

  setCourseTitle(course.title);

  setCourseCode(course.courseCode);

  setCourseCredit(course.credit);

  setShowCourseModal(true);
};




  // =====================================================
  // SEARCH RESULT
  // =====================================================

  const searchResults = students.filter(
    (student) =>
      student.roll
        .toLowerCase()
        .includes(studentSearch.toLowerCase())
  );



  //department management



  const [departmentName, setDepartmentName] =
  useState("");

const [departmentShortName, setDepartmentShortName] =
  useState("");

const [editingDepartmentId, setEditingDepartmentId] =
  useState<number | null>(null);
const [selectedDepartmentId, setSelectedDepartmentId] =
  useState<number | "">("");

const [departments, setDepartments] =
  useState<Department[]>([
    {
      id: 1,
      name: "Computer Science & Engineering",
      shortName: "CSE",
    },
    {
      id: 2,
      name: "Electrical & Electronic Engineering",
      shortName: "EEE",
    },
  ]);




// এখন departments declare হওয়ার পরে
const selectedDepartment =
  departments.find(
    (department) =>
      department.id === selectedDepartmentId
  );


const saveDepartment = () => {

  // Empty check
  if (
    !departmentName.trim() ||
    !departmentShortName.trim()
  ) {
    return;
  }


  // EDIT
  if (editingDepartmentId !== null) {

    setDepartments((prev) =>
      prev.map((department) =>
        department.id === editingDepartmentId
          ? {
              ...department,
              name: departmentName.trim(),
              shortName:
                departmentShortName
                  .trim()
                  .toUpperCase(),
            }
          : department
      )
    );

  }

  // ADD NEW
  else {

    const newDepartment: Department = {
      id:
        departments.length > 0
          ? Math.max(
              ...departments.map(
                (department) => department.id
              )
            ) + 1
          : 1,

      name: departmentName.trim(),

      shortName:
        departmentShortName
          .trim()
          .toUpperCase(),
    };


    setDepartments((prev) => [
      ...prev,
      newDepartment,
    ]);
  }


  // Clear inputs

  setDepartmentName("");
  setDepartmentShortName("");

  setEditingDepartmentId(null);
};


const editDepartment = (department: Department) => {

  setDepartmentName(department.name);

  setDepartmentShortName(
    department.shortName
  );

  setEditingDepartmentId(
    department.id
  );

};





const deleteDepartment = (id: number) => {
  setDeleteDepartmentId(id);
};

  // =====================================================
  // OPEN ASSIGN
  // =====================================================

  const openAssignModal = () => {

    setEditingAssignmentId(null);

    setSelectedCourseId("");
    setSelectedTeacherId("");
    setSelectedBatch("");
    setSelectedGroup("");
    setSelectedStudentIds([]);

    setShowAssignmentModal(true);
  };


  // =====================================================
  // OPEN EDIT ASSIGNMENT
  // =====================================================

  const editAssignment = (
    assignment: CourseAssignment
  ) => {

    setEditingAssignmentId(assignment.id);

    setSelectedCourseId(
      assignment.courseId
    );

    setSelectedTeacherId(
      assignment.teacherId
    );

    setSelectedStudentIds(
      assignment.studentIds
    );

    const firstStudent =
      students.find(
        (student) =>
          assignment.studentIds.includes(
            student.id
          )
      );

    if (firstStudent) {
      setSelectedBatch(
        firstStudent.seriesBatch
      );

      setSelectedGroup(
        firstStudent.group
      );
    }

    setShowAssignmentModal(true);
  };


  // =====================================================
  // FILTERED STUDENTS FOR ASSIGNMENT
  // =====================================================

  const filteredAssignmentStudents =
    students.filter((student) => {

      if (
        selectedBatch &&
        student.seriesBatch !== selectedBatch
      ) {
        return false;
      }

      if (
        selectedGroup &&
        student.group !== selectedGroup
      ) {
        return false;
      }

      return true;
    });

    const canShowStudents =
  selectedCourseId !== "" &&
  selectedTeacherId !== "" &&
  selectedBatch !== "" &&
  selectedGroup !== "";

  // =====================================================
  // TOGGLE STUDENT
  // =====================================================

  const toggleStudent = (
    studentId: number
  ) => {

    setSelectedStudentIds((prev) => {

      if (prev.includes(studentId)) {

        return prev.filter(
          (id) => id !== studentId
        );

      }

      return [
        ...prev,
        studentId,
      ];
    });
  };
const toggleAssignmentStudents = (assignmentId: number) => {
  setExpandedAssignments((prev) => {
    if (prev.includes(assignmentId)) {
      return prev.filter((id) => id !== assignmentId);
    }

    return [...prev, assignmentId];
  });
};

  // =====================================================
  // SAVE ASSIGNMENT
  // =====================================================

  const saveAssignment = () => {

    if (
      selectedCourseId === "" ||
      selectedTeacherId === ""
    ) {
      alert(
        "Please select Course and Teacher."
      );

      return;
    }

    if (
      selectedStudentIds.length === 0
    ) {
      alert(
        "Please select students."
      );

      return;
    }


    if (
      editingAssignmentId !== null
    ) {

      setAssignments((prev) =>
        prev.map((assignment) =>

          assignment.id ===
          editingAssignmentId

            ? {
                ...assignment,
                courseId:
                  Number(
                    selectedCourseId
                  ),
                teacherId:
                  Number(
                    selectedTeacherId
                  ),
                studentIds:
                  selectedStudentIds,
              }

            : assignment
        )
      );

    } else {

      const newAssignment: CourseAssignment = {
        id: Date.now(),
        courseId:
          Number(
            selectedCourseId
          ),
        teacherId:
          Number(
            selectedTeacherId
          ),
        studentIds:
          selectedStudentIds,
      };

      setAssignments((prev) => [
        ...prev,
        newAssignment,
      ]);
    }

    setShowAssignmentModal(false);
  };


  // =====================================================
  // DELETE ASSIGNMENT
  // =====================================================
const [showDeleteModal, setShowDeleteModal] =
  useState(false);

const [deleteAssignmentId, setDeleteAssignmentId] =
  useState<number | null>(null);
const deleteAssignment = (id: number) => {
  setDeleteAssignmentId(id);
  setShowDeleteModal(true);
};
  
const confirmDeleteAssignment = () => {

  if (deleteAssignmentId === null) {
    return;
  }

  setAssignments((prev) =>
    prev.filter(
      (assignment) =>
        assignment.id !== deleteAssignmentId
    )
  );

  // Modal close
  setShowDeleteModal(false);

  // ID reset
  setDeleteAssignmentId(null);
};

  // =====================================================
  // ADD / EDIT TEACHER
  // =====================================================

 const saveTeacher = () => {

  if (
    !teacherName ||
    !teacherEmail ||
    !teacherPassword
  ) {
    alert("Please fill all teacher fields.");
    return;
  }

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.ac\.bd$/;

  if (!emailPattern.test(teacherEmail)) {
    alert(
      "Please enter a valid educational email.\nExample: teacher@ruet.ac.bd"
    );
    return;
  }

  if (editingTeacherId !== null) {

    setTeachers((prev) =>
      prev.map((teacher) =>
        teacher.id === editingTeacherId
          ? {
              ...teacher,
              name: teacherName,
              email: teacherEmail,
              password: teacherPassword,
            }
          : teacher
      )
    );

  } else {

    setTeachers((prev) => [
      ...prev,
      {
        id: Date.now(),
        departmentId:
      teacherDepartmentId === ""
        ? 0
        : teacherDepartmentId,

        name: teacherName,
        email: teacherEmail,
        password: teacherPassword,
      },
    ]);
  }

  setShowTeacherModal(false);

  clearTeacherForm();
};


  const clearTeacherForm = () => {

    setTeacherName("");
    setTeacherEmail("");
    setTeacherPassword("");
    setEditingTeacherId(null);
  };


  // =====================================================
  // DELETE TEACHER
  // =====================================================

  const deleteTeacher = (
    id: number
  ) => {

    if (
      !window.confirm(
        "Delete this teacher?"
      )
    ) {
      return;
    }

    setTeachers((prev) =>
      prev.filter(
        (teacher) =>
          teacher.id !== id
      )
    );
  };


  // =====================================================
  // ADD / EDIT STUDENT
  // =====================================================
const saveStudent = () => {

    if (
      !studentId ||
      !studentRoll ||
      !studentName ||
      !studentPassword ||
      !studentBatch ||
      !studentGroup
    ) {

      alert(
        "Please fill all student fields."
      );

      return;
    }
 if (
      editingStudentId !== null
    ) {

      setStudents((prev) =>
        prev.map((student) =>
          student.id ===
          editingStudentId
            ? {
 ...student,
                roll:
                  studentRoll,
                name:
                  studentName,
                password:
                  studentPassword,
                seriesBatch:
                  studentBatch,
                group:
                  studentGroup,
              }
            : student
        )
      );
} else {

      setStudents((prev) => [
        ...prev,
        {
          id:
            Number(studentId),
             departmentId:
      selectedDepartmentId === ""
        ? 0
        : selectedDepartmentId,
          roll:
            studentRoll,
          name:
            studentName,
       password:
            studentPassword,
          seriesBatch:
            studentBatch,
          group:
            studentGroup,
        },
      ]);
    }

    setShowStudentModal(false);

    clearStudentForm();
  };


  const clearStudentForm = () => {

    setStudentId("");
    setStudentRoll("");
    setStudentName("");
    setStudentPassword("");
    setStudentBatch("");
    setStudentGroup("");

    setEditingStudentId(null);
  };


  // =====================================================
  // DELETE STUDENT
  // =====================================================





  const deleteStudent = (
    id: number
  ) => {

    if (
      !window.confirm(
        "Delete this student?"
      )
    ) {
      return;
    }

    setStudents((prev) =>
      prev.filter(
        (student) =>
          student.id !== id
      )
    );

    setAssignments((prev) =>
      prev.map((assignment) => ({
        ...assignment,
        studentIds:
          assignment.studentIds.filter(
            (studentId) =>
              studentId !== id
          ),
      }))
    );
  };


  // =====================================================
  // ADD / EDIT COURSE
  // =====================================================

  const saveCourse = () => {

    if (
      !courseTitle ||
      !courseCode ||
      !courseCredit
    ) {

      alert(
        "Please fill all course fields."
      );

      return;
    }


    if (
      editingCourseId !== null
    ) {

      setCourses((prev) =>
        prev.map((course) =>
          course.id ===
          editingCourseId
            ? {
                ...course,
                title:
                  courseTitle,
                courseCode:
                  courseCode,
                credit:
                  Number(
                    courseCredit
                  ),
              }
            : course
        )
      );

    } else {
setCourses((prev) => [
  ...prev,
  {
    id: Date.now(),
    departmentId: Number(selectedCourseDepartmentId),
    semester: courseSemester,
    title: courseTitle,
    courseCode: courseCode,
    credit: courseCredit,
  },
]);
      
    }

    setShowCourseModal(false);

    clearCourseForm();
  };


  const clearCourseForm = () => {

     setCourseTitle("");
  setCourseCode("");
  setCourseCredit(0);
  setCourseSemester("");
  setSelectedCourseDepartmentId("");
  setEditingCourseId(null);
  };


  const semesters = Array.from(
    new Set(
      courses
        .filter(
          (course) =>
            course.departmentId === selectedDepartmentId
        )
        .map((course) => course.semester)
    )
  );

  // =====================================================
  // DELETE COURSE
  // =====================================================




  const deleteCourse = (
    id: number
  ) => {

    if (
      !window.confirm(
        "Delete this course?"
      )
    ) {
      return;
    }

    setCourses((prev) =>
      prev.filter(
        (course) =>
          course.id !== id
      )
    );
  };


  // =====================================================
  // OPEN STUDENT DETAILS
  // =====================================================

  const openStudentDetails = (
    student: Student
  ) => {

    setSelectedStudent(student);
  };

 // =========================
  // SCROLL LOCK
  // =========================
useEffect(() => {

    const modalOpen =
      departmentMenuOpen ||
      departmentChangesOpen ||
      departmentActionId !== null ||
      deleteDepartmentId !== null;
       selectedTeacherId !== null;

    if (modalOpen) {

      document.body.style.overflow = "hidden";

    } else {

      document.body.style.overflow = "";

    }


    return () => {
      document.body.style.overflow = "";
    };

  }, [departmentMenuOpen,
    departmentChangesOpen,
    departmentActionId,
    deleteDepartmentId,
     selectedTeacherId,
  ]);


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="min-h-screen bg-slate-100">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className=" relative bg-blue-900 w-full flex items-center px-4 py-4 shadow-md">

        <AiFillCaretRight className="text-4xl text-white" />

        <span
          className={`${quintessential.className} text-white text-xl md:text-4xl`}
        >
          LAB PERFORMANCE TRACKER
        </span>

        <span className="text-white ml-3">
          (Admin Dashboard)
        </span>
        <Link href='/teacherPage'>TeacherPage</Link>
        <Link href='/studentPage'>StudentPage</Link>


<div className="ml-auto flex items-center gap-3">
  <div ref={profileRef} className="relative">
{/* Profile */}
      <button
  type="button"
  onClick={() => {
    setProfileOpen((prev) => !prev);
    setDepartmentMenuOpen(false);
  }}
  className="p-2 rounded-full hover:bg-gray-700"
>
  <BsFillPersonFill className="text-2xl cursor-pointer text-white" />
</button>
       {/* Profile Dropdown */}
      {profileOpen && (
        <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">

          {/* Header */}
          <div className="bg-gray-800 px-5 py-4 text-white">
            <h2 className="text-lg font-semibold">
              Admin Information
            </h2>
            <p className="text-sm text-gray-300">
              Administrator Account
            </p>
          </div>

          {/* Information */}
          <div className="p-5 space-y-3">

            <div>
              <p className="text-xs text-gray-500">Name</p>
              <p className="font-medium text-gray-800">
                Jahidul Hasan
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-medium text-gray-800">
                jahidul@university.ac.bd
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Phone Number</p>
              <p className="font-medium text-gray-800">
                01786894412
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Admin ID</p>
              <p className="font-medium text-gray-800">
                ADM-001
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">University</p>
              <p className="font-medium text-gray-800">
                Rajshahi University of Engineering & Technology
              </p>
            </div>

            

          </div>
        </div>
      )}



  </div>



  {/* Logout */}
  <button
    className="bg-red-600 hover:bg-red-700 text-white font-medium px-2 py-1 rounded text-sm md:text-base"
  >
    Logout
  </button>



<div ref={departmentRef} className="relative">
 <button
    type="button"
    onClick={() => {
      setDepartmentMenuOpen((prev) => !prev);
      setProfileOpen(false);
    }}
    className="p-2 rounded-lg hover:bg-gray-700"
  >
    <FiAlignJustify className="text-2xl text-white" />
  </button>


  {/* MAIN MENU */}

  {departmentMenuOpen && (

    <div className="absolute right-0 top-12 z-50 bg-white border rounded-xl shadow-lg w-64">

      <button
        type="button"
        onClick={() => {

          setDepartmentChangesOpen(true);

          setDepartmentMenuOpen(false);

        }}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
      >

        <span className="font-semibold">
          Department Name Changes
        </span>

        <span>
          →
        </span>

      </button>

       {/*Student details update*/}

 <button
        type="button"
        onClick={() => {

           setShowStudentDetailsModal(true);


          setDepartmentMenuOpen(false);

        }}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
      >

        <span className="font-semibold">
          Students Details Update
        </span>

        <span>
          →
        </span>

      </button>


       {/*teacher details update*/}
 <button
        type="button"
        onClick={() => {

          setTeacherManagementOpen(true);
    setDepartmentMenuOpen(false);

        }}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
      >

        <span className="font-semibold">
          Teachers Details Update
        </span>

        <span>
          →
        </span>

      </button>


   {/*course details update*/}
 <button
        type="button"
        onClick={() => {

           setCourseDetailsUpdateOpen(true);

          setDepartmentMenuOpen(false);

        }}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
      >

        <span className="font-semibold">
          Courses Details Update
        </span>

        <span>
          →
        </span>

      </button>

 


    </div>



  )}

</div>
  

</div>
  {/*dept name changes*/}
{departmentChangesOpen && (

  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">

      {/* HEADER */}

      <div className="p-5 border-b flex justify-between items-center">

        <h2 className="text-xl font-bold">
          Department Name Changes
        </h2>

        <button
          type="button"
          onClick={() =>
            setDepartmentChangesOpen(false)
          }
          className="text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
 </div>

{/* ================================================= */}
{/* DEPARTMENT ACTION MODAL */}
{/* ================================================= */}

{departmentActionId !== null && (

  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">

    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">

      {departments
        .filter(
          (department) =>
            department.id === departmentActionId
        )
        .map((department) => (

          <div key={department.id}>

            {/* HEADER */}

            <div className="p-6 border-b">

              <h2 className="text-xl font-bold">
                Department
              </h2>

            </div>


            {/* DEPARTMENT INFO */}

            <div className="p-6">

              <p className="text-sm text-gray-500">
                Full Name
              </p>

              <p className="text-lg font-semibold">
                {department.name}
              </p>

              <p className="text-sm text-gray-500 mt-4">
                Short Name
              </p>

              <p className="text-lg font-semibold">
                {department.shortName}
              </p>

            </div>


            {/* BUTTONS */}

            <div className="border-t p-4 flex justify-end gap-3">

              {/* EDIT */}

              <button
                type="button"
                onClick={() => {

                  editDepartment(department);

                  setDepartmentActionId(null);
                  setDepartmentChangesOpen(false);

                }}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Edit
              </button>


              {/* DELETE */}

              <button
                type="button"
                onClick={() => {

                  setDeleteDepartmentId(
                    department.id
                  );

                  setDepartmentActionId(null);

                }}
                className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>


              {/* CANCEL */}

              <button
                type="button"
                onClick={() =>
                  setDepartmentActionId(null)
                }
                className="px-5 py-2.5 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>

            </div>

          </div>

        ))}

    </div>

  </div>

)}






      {/* DEPARTMENT LIST */}

      <div className="max-h-[60vh] overflow-y-auto">

        {departments.map((department) => (

          <button
            key={department.id}
            type="button"
            onClick={() =>
              setDepartmentActionId(
                department.id
              )
            }
            className="w-full text-left px-5 py-4 border-b hover:bg-blue-50"
          >

            <p className="font-semibold">
              {department.shortName}
            </p>

            <p className="text-sm text-gray-500">
              {department.name}
            </p>

          </button>

        ))}

      </div>

    </div>

  </div>

)}


{/* ================================================= */}
{/* TEACHER MANAGEMENT */}
{/* ================================================= */}

{teacherManagementOpen && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col">

      {/* HEADER */}
      <div className="p-6 border-b flex justify-between items-center">

        <h2 className="text-xl font-bold">
          Teacher Details Update
        </h2>

        <button
          type="button"
          onClick={() => {
            setTeacherManagementOpen(false);
            setTeacherDepartmentId("");
            setSelectedTeacherId("");
          }}
          className="text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

      </div>
  {/* BODY */}

  <div className="p-6 overflow-y-auto">

        {/* DEPARTMENT */}

        <label className="block font-semibold mb-2">
          Select Department
        </label>
 <select
          value={teacherDepartmentId}
          onChange={(e) => {

            setTeacherDepartmentId(
              e.target.value
                ? Number(e.target.value)
                : ""
            );

            setSelectedTeacherId("");

          }}
          className="w-full border rounded-lg px-4 py-3"
        >

          <option value="">
            Select Department
          </option>

          {departments.map((department) => (

            <option
              key={department.id}
              value={department.id}
            >
              {department.shortName}
            </option>

          ))}

        </select>

 {teacherDepartmentId !== "" && (

          <div className="mt-6">

            <h3 className="font-bold text-lg mb-3">
              Teachers
            </h3>
 {teachers.filter(
              (teacher) =>
                teacher.departmentId ===
                teacherDepartmentId
            ).length === 0 ? (
 <div className="border rounded-lg p-5 text-center text-gray-500">
                No teachers found in this department.
              </div>

            ) : (
<div className="border rounded-lg overflow-hidden">

                {teachers
                  .filter(
                    (teacher) =>
                      teacher.departmentId ===
                      teacherDepartmentId
                  )
                  .map((teacher) => (

                    <button
                      key={teacher.id}
                      type="button"
                      onClick={() =>{
                        setSelectedTeacherId(
                          teacher.id
                        );
                         setShowTeacherDetails(true);
                      }}
                      className="w-full text-left p-4 border-b last:border-b-0 hover:bg-blue-50"
                    >

                      <div className="flex justify-between items-center">

                        <div>
                           <p className="font-semibold">
                            {teacher.name}
                          </p>

                          <p className="text-sm text-gray-500">
                            ID: {teacher.id}
                          </p>

                          <p className="text-sm text-gray-500">
                            {teacher.email}
                          </p>

                        </div>

                        <span className="text-gray-400">
                          →
                        </span>

                      </div>

                    </button>

                  ))}
</div>

            )}

 </div>

        )}

      </div>

    </div>

  </div>

)}

  {/* ================================================= */}
{/* TEACHER DETAILS */}
{/* ================================================= */}

{showTeacherDetails && selectedTeacherId !== "" && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">

    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">

      {teachers
        .filter(
          (teacher) =>
            teacher.id === selectedTeacherId
        )
        .map((teacher) => (
          <div key={teacher.id}>

            {/* HEADER */}
            <div className="p-6 border-b flex justify-between items-center">

              <h2 className="text-xl font-bold">
                Teacher Details
              </h2>

              <button
                type="button"
                onClick={() => {
                  
    setShowTeacherDetails(false);
                }}
                className="text-gray-500 hover:text-gray-800 text-xl"
              >
                ✕
              </button>

            </div>

            {/* DETAILS */}
            <div className="p-6 space-y-4">

              <div>
                <p className="text-sm text-gray-500">
                  Teacher ID
                </p>

                <p className="font-semibold">
                  {teacher.id}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Name
                </p>

                <p className="font-semibold">
                  {teacher.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p className="font-semibold">
                  {teacher.email}
                </p>
              </div>

            </div>

            {/* ACTIONS */}
            <div className="border-t p-4 flex justify-end gap-3">

              {/* EDIT */}
              <button
                type="button"
                onClick={() => {
                  editTeacher(teacher);
                  setShowTeacherDetails(false);
                  setTeacherManagementOpen(false);
                }}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Edit
              </button>

              {/* DELETE */}
              <button
                type="button"
                onClick={() => {
                  setDeleteTeacherId(teacher.id);
                  setShowTeacherDetails(false);
                }}
                className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>

              {/* CANCEL */}
              <button
                type="button"
                onClick={() => {
                  setShowTeacherDetails(false);
                  setSelectedTeacherId("");
                }}
                className="px-5 py-2.5 border rounded-lg"
              >
                Cancel
              </button>

            </div>

          </div>
        ))}

    </div>

  </div>
)}



{/* ================================================= */}
{/* DELETE TEACHER CONFIRMATION */}
{/* ================================================= */}

{deleteTeacherId !== null && (

  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70] p-4">

    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">

      <div className="p-6">

        <h2 className="text-xl font-bold">
          Delete Teacher
        </h2>

        <p className="text-gray-600 mt-3">
          Are you sure you want to delete this
          teacher?
        </p>

        <p className="text-sm text-red-500 mt-2">
          This action cannot be undone.
        </p>

      </div>


      <div className="border-t p-4 flex justify-end gap-3">

        <button
          type="button"
          onClick={() =>
            setDeleteTeacherId(null)
          }
          className="px-5 py-2.5 border rounded-lg"
        >
          Cancel
        </button>


        <button
          type="button"
          onClick={() => {

            setTeachers((prev) =>
              prev.filter(
                (teacher) =>
                  teacher.id !==
                  deleteTeacherId
              )
            );

            setDeleteTeacherId(null);

          }}
          className="px-5 py-2.5 bg-red-600 text-white rounded-lg"
        >
          Delete
        </button>

      </div>

    </div>

  </div>

)}




{/* ================================================= */}
{/* STUDENT MANAGEMENT */}
{/* ================================================= */}
{showStudentDetailsModal && (

  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[80] p-4">

    <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">

      {/* HEADER */}

      <div className="p-6 border-b flex justify-between items-center">

        <h2 className="text-xl font-bold">
          Student Details Update
        </h2>

        <button
          type="button"
          onClick={() => {

            setShowStudentDetailsModal(false);

            setStudentDepartmentId("");
            setStudentBatch("");
            setStudentGroup("");
            setStudentDetailsId(null);

          }}
          className="text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>

      </div>


      {/* BODY */}

      <div className="p-6 overflow-y-auto">

        {/* ========================= */}
        {/* DEPARTMENT */}
        {/* ========================= */}

        <label className="block font-semibold mb-2">
          Select Department
        </label>

        <select
          value={studentDepartmentId}
          onChange={(e) => {

            setStudentDepartmentId(
              e.target.value
                ? Number(e.target.value)
                : ""
            );

            setStudentBatch("");
            setStudentGroup("");

          }}
          className="w-full border rounded-lg px-4 py-3 mb-5"
        >

          <option value="">
            Select Department
          </option>

          {departments.map((department) => (

            <option
              key={department.id}
              value={department.id}
            >
              {department.shortName}
            </option>

          ))}

        </select>


        {/* ========================= */}
        {/* BATCH */}
        {/* ========================= */}

        {studentDepartmentId !== "" && (

          <>
            <label className="block font-semibold mb-2">
              Select Series / Batch
            </label>

            <select
              value={studentBatch}
              onChange={(e) => {

                setStudentBatch(
                  e.target.value
                );

                setStudentGroup("");

              }}
              
              className="w-full border rounded-lg px-4 py-3 mb-5"
            >

              <option value="">
                Select Series / Batch
              </option>

              {[
                ...new Set(
                  students
                    .filter(
                      (student) =>
                        student.departmentId ===
                        studentDepartmentId
                    )
                    .map(
                      (student) =>
                        student.seriesBatch
                    )
                ),
              ].map((batch) => (

                <option
                  key={batch}
                  value={batch}
                >
                  {batch}
                </option>

              ))}

            </select>
          </>
        )}


        {/* ========================= */}
        {/* GROUP */}
        {/* ========================= */}

        {studentBatch !== "" && (

          <>
            <label className="block font-semibold mb-2">
              Select Group
            </label>

            <select
              value={studentGroup}
              onChange={(e) =>
                setStudentGroup(
                  e.target.value
                )
              }
              className="w-full border rounded-lg px-4 py-3 mb-6"
            >

              <option value="">
                Select Group
              </option>

              {[
                ...new Set(
                  students
                    .filter(
                      (student) =>
                        student.departmentId ===
                          studentDepartmentId &&
                        student.seriesBatch ===
                          studentBatch
                    )
                    .map(
                      (student) =>
                        student.group
                    )
                ),
              ].map((group) => (

                <option
                  key={group}
                  value={group}
                >
                  Group {group}
                </option>

              ))}

            </select>
          </>
        )}


        {/* ========================= */}
        {/* STUDENTS */}
        {/* ========================= */}

        {studentDepartmentId !== "" &&
          studentBatch !== "" &&
          studentGroup !== "" && (

            <div>

              <h3 className="font-bold text-lg mb-3">
                Students
              </h3>


              <div className="border rounded-lg overflow-hidden">

                {students
                  .filter(
                    (student) =>
                      student.departmentId ===
                        studentDepartmentId &&
                      student.seriesBatch ===
                        studentBatch &&
                      String(student.group) ===
                        String(studentGroup)
                  )
                  .map((student) => (

                    <button
                      key={student.id}
                      type="button"
                      onClick={() =>
                        setStudentDetailsId(
                          student.id
                        )
                      }
                      className="w-full text-left p-4 border-b last:border-b-0 hover:bg-blue-50"
                    >

                      <div className="flex justify-between items-center">

                        <div>

                          <p className="font-semibold">
                            {student.name}
                          </p>

                          <p className="text-sm text-gray-500">
                            Roll: {student.roll}
                          </p>

                          <p className="text-sm text-gray-500">
                            {student.seriesBatch}
                            {" • "}
                            Group {student.group}
                          </p>

                        </div>

                        <span className="text-gray-400">
                          →
                        </span>

                      </div>

                    </button>

                  ))}

              </div>

            </div>
          )}

      </div>

    </div>

  </div>

)}

{studentDetailsId !== null && (

  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[90] p-4">

    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">

      {students
        .filter(
          (student) =>
            student.id === studentDetailsId
        )
        .map((student) => (

          <div key={student.id}>

            <div className="p-6 border-b">

              <h2 className="text-xl font-bold">
                Student Details
              </h2>

            </div>


            <div className="p-6 space-y-4">

              <div>
                <p className="text-sm text-gray-500">
                  Student ID
                </p>

                <p className="font-semibold">
                  {student.id}
                </p>
              </div>


              <div>
                <p className="text-sm text-gray-500">
                  Roll
                </p>

                <p className="font-semibold">
                  {student.roll}
                </p>
              </div>


              <div>
                <p className="text-sm text-gray-500">
                  Name
                </p>

                <p className="font-semibold">
                  {student.name}
                </p>
              </div>


              <div>
                <p className="text-sm text-gray-500">
                  Series / Batch
                </p>

                <p className="font-semibold">
                  {student.seriesBatch}
                </p>
              </div>


              <div>
                <p className="text-sm text-gray-500">
                  Group
                </p>

                <p className="font-semibold">
                  {student.group}
                </p>
              </div>

            </div>


            {/* ACTIONS */}

            <div className="border-t p-4 flex justify-end gap-3">

              <button
                type="button"
                onClick={() => {

                  editStudent(student);

                setShowStudentDetailsModal(false);
                  setStudentDetailsId(null);

                }}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg"
              >
                Edit
              </button>


              <button
                type="button"
                onClick={() => {

                  setDeleteStudentId(
                    student.id
                  );

                  setStudentDetailsId(null);

                }}
                className="px-5 py-2.5 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>


              <button
                type="button"
                onClick={() =>
                  setStudentDetailsId(null)
                }
                className="px-5 py-2.5 border rounded-lg"
              >
                Cancel
              </button>

            </div>

          </div>

        ))}

    </div>

  </div>

)}

{/* ================================================= */}
{/* DELETE STUDENT CONFIRMATION */}
{/* ================================================= */}

{deleteStudentId !== null && (

  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">

    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">

      {/* HEADER */}

      <div className="p-6 border-b">

        <h2 className="text-xl font-bold text-gray-800">
          Delete Student
        </h2>

      </div>


      {/* BODY */}

      <div className="p-6">

        <p className="text-gray-600">
          Are you sure you want to delete this student?
        </p>

        <p className="text-sm text-red-500 mt-2">
          This action cannot be undone.
        </p>

      </div>


      {/* ACTIONS */}

      <div className="p-4 border-t flex justify-end gap-3">

        {/* CANCEL */}

        <button
          type="button"
          onClick={() =>
            setDeleteStudentId(null)
          }
          className="px-5 py-2.5 border rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>


        {/* DELETE */}

        <button
          type="button"
          onClick={() => {

            setStudents((prev) =>
              prev.filter(
                (student) =>
                  student.id !==
                  deleteStudentId
              )
            );

            setDeleteStudentId(null);

          }}
          className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Delete
        </button>

      </div>

    </div>

  </div>

)}

{/* Course updated*/}
{courseDetailsUpdateOpen && (

  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[80] p-4">

    <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] flex flex-col">

      {/* HEADER */}

      <div className="p-6 border-b flex justify-between items-center">

        <h2 className="text-xl font-bold">
          Course Details Update
        </h2>

        <button
          type="button"
          onClick={() => {

            setCourseDetailsUpdateOpen(false);

            setCourseDetailsDepartmentId("");
            setCourseDetailsSemesterId("");
            setCourseDetailsId(null);

          }}
          className="text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>

      </div>


      {/* BODY */}

      <div className="p-6 overflow-y-auto">

        {/* ============================== */}
        {/* DEPARTMENT */}
        {/* ============================== */}

        <label className="block font-semibold mb-2">
          Select Department
        </label>

        <select
          value={courseDetailsDepartmentId}
          onChange={(e) => {

            setCourseDetailsDepartmentId(
              e.target.value
                ? Number(e.target.value)
                : ""
            );

            setCourseDetailsSemester("");
            setCourseDetailsId(null);

          }}
          className="w-full border rounded-lg px-4 py-3 mb-5"
        >

          <option value="">
            Select Department
          </option>

          {departments.map((department) => (

            <option
              key={department.id}
              value={department.id}
            >
              {department.shortName}
            </option>

          ))}

        </select>


        {/* ============================== */}
        {/* SEMESTER */}
        {/* ============================== */}

        {courseDetailsDepartmentId !== "" && (

          <>
            <label className="block font-semibold mb-2">
              Select Semester
            </label>

            <select
  value={courseDetailsSemester}
  onChange={(e) => {
    setCourseDetailsSemester(e.target.value);
    setCourseDetailsId(null);
  }}
  className="w-full border rounded-lg px-4 py-3 mb-6"
>
  <option value="">
    Select Semester
  </option>

  {Array.from(
    new Set(
      courses
        .filter(
          (course) =>
            course.departmentId ===
            courseDetailsDepartmentId
        )
        .map((course) => course.semester)
    )
  ).map((semester) => (
    <option
      key={semester}
      value={semester}
    >
      {semester}
    </option>
  ))}
</select>
          </>
        )}


        {/* ============================== */}
        {/* COURSE CODE */}
        {/* ============================== */}

        {courseDetailsDepartmentId !== "" &&
          courseDetailsSemester !== "" && (

            <div>

              <h3 className="font-bold text-lg mb-3">
                Course Code
              </h3>


              <div className="border rounded-lg overflow-hidden">

                {courses
                  .filter(
                    (course) =>
                      course.departmentId ===
                        courseDetailsDepartmentId &&
                      course.semester ===
                         courseDetailsSemester
                  )
                  .map((course) => (

                    <button
                      key={course.id}
                      type="button"
                      onClick={() =>
                        setCourseDetailsId(
                          course.id
                        )
                      }
                      className="w-full flex justify-between items-center p-4 border-b last:border-b-0 hover:bg-blue-50"
                    >

                      <span className="font-semibold">
                        {course.courseCode}
                      </span>

                      <span className="text-gray-400">
                        →
                      </span>

                    </button>

                  ))}

              </div>

            </div>

          )}

      </div>

    </div>

  </div>

)}

{courseDetailsId !== null && (

  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[90] p-4">

    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">

      {courses
        .filter(
          (course) =>
            course.id === courseDetailsId
        )
        .map((course) => (

          <div key={course.id}>

            {/* HEADER */}

            <div className="p-6 border-b flex justify-between">

              <h2 className="text-xl font-bold">
                Course Details
              </h2>

              <button
                type="button"
                onClick={() =>
                  setCourseDetailsId(null)
                }
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>

            </div>


            {/* DETAILS */}

            <div className="p-6 space-y-4">

              <div>
                <p className="text-sm text-gray-500">
                  Course Code
                </p>

                <p className="font-semibold">
                  {course.courseCode}
                </p>
              </div>


              <div>
                <p className="text-sm text-gray-500">
                  Course Title
                </p>

                <p className="font-semibold">
                  {course.title}
                </p>
              </div>


              <div>
                <p className="text-sm text-gray-500">
                  Credit
                </p>

                <p className="font-semibold">
                  {course.credit}
                </p>
              </div>

            </div>


            {/* ACTIONS */}

            <div className="p-4 border-t flex justify-end gap-3">

              <button
                type="button"
                onClick={() => {

                  editCourse(course);
                 setCourseDetailsUpdateOpen(false);
                  setCourseDetailsId(null);

                }}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg"
              >
                Edit
              </button>


              <button
                type="button"
                onClick={() => {

                  setDeleteCourseId(
                    course.id
                  );

                  setCourseDetailsId(null);

                }}
                className="px-5 py-2.5 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

    </div>

  </div>

)}



{/* ================================================= */}
{/* DELETE COURSE CONFIRMATION */}
{/* ================================================= */}

{deleteCourseId !== null && (

  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">

    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">

      <div className="p-6 border-b">

        <h2 className="text-xl font-bold">
          Delete Course
        </h2>

      </div>


      <div className="p-6">

        <p className="text-gray-600">
          Are you sure you want to delete this course?
        </p>

        <p className="text-sm text-red-500 mt-2">
          This action cannot be undone.
        </p>

      </div>


      <div className="p-4 border-t flex justify-end gap-3">

        <button
          type="button"
          onClick={() =>
            setDeleteCourseId(null)
          }
          className="px-5 py-2.5 border rounded-lg"
        >
          Cancel
        </button>


        <button
          type="button"
          onClick={() => {

            setCourses((prev) =>
              prev.filter(
                (course) =>
                  course.id !==
                  deleteCourseId
              )
            );

            setDeleteCourseId(null);

          }}
          className="px-5 py-2.5 bg-red-600 text-white rounded-lg"
        >
          Delete
        </button>

      </div>

    </div>

  </div>

)}









      </div>

<div className="flex items-center justify-center p-5 bg-yellow-100">
  <span className="text-4xl">Rajshahi University Of Engineering & Teachnology</span>

</div>



      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">


       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

  {/* ================================================= */}
  {/* STUDENT SEARCH */}
  {/* ================================================= */}

  <div className="">

     <h2 className="text-xl font-bold mb-4">
   Search Student
  </h2>

    <div className="relative">

      <FiSearch
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={20}
      />

      <input
        type="text"
        value={studentSearch}
        onChange={(e) =>
          setStudentSearch(e.target.value)
        }
        placeholder="Search by Student ID"
        className="w-full border rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>


    {/* SEARCH RESULTS */}

    {studentSearch && (

      <div className="mt-4 space-y-2">

        {searchResults.length === 0 ? (

          <p className="text-gray-500">
            No student found.
          </p>

        ) : (

          searchResults.map(
            (student) => (

              <button
                key={student.id}
                onClick={() =>
                  openStudentDetails(student)
                }
                className="w-full text-left border rounded-lg p-4 hover:bg-blue-50"
              >

                <p className="font-bold">
                  {student.id}
                </p>

                <p className="text-gray-500">
                  {student.name}
                </p>

              </button>

            )
          )

        )}

      </div>

    )}

  </div>


  {/* ================================================= */}
  {/* DEPARTMENT MANAGEMENT */}
  {/* ================================================= */}

  <div>

  <h2 className="text-xl font-bold mb-4">
    Department Management
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

    <input
      type="text"
      value={departmentName}
      onChange={(e) =>
        setDepartmentName(e.target.value)
      }
      placeholder="Department Full Name"
      className="border rounded-lg px-4 py-3"
    />

    <input
      type="text"
      value={departmentShortName}
      onChange={(e) =>
        setDepartmentShortName(
          e.target.value.toUpperCase()
        )
      }
      placeholder="Short Name"
      className="border rounded-lg px-4 py-3"
    />

  </div>

  <button
    type="button"
    onClick={saveDepartment}
    className="mt-3 px-4 py-2 bg-blue-700 text-white rounded-lg"
  >
    {editingDepartmentId !== null
      ? "Save Changes"
      : "Add Department"}
  </button>

</div>

<div className="w-full bg-white border rounded-xl p-5 w-full">

      <label className="block font-semibold mb-2">
        Select Department
      </label>

      <select
        value={selectedDepartmentId}
        onChange={(e) =>
          setSelectedDepartmentId(
            e.target.value
              ? Number(e.target.value)
              : ""
          )
        }
        className="w-full border rounded-lg px-4 py-3"
      >

        <option value="">
          Select Department
        </option>

        {departments.map((department) => (

          <option
            key={department.id}
            value={department.id}
          >
            {department.shortName}
          </option>

        ))}
    </select>

{selectedDepartment && (

  <div className="mt-3 w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg">

    <p className="text-xs text-gray-500">
      Department Full Name
    </p>

    <p className="font-semibold text-blue-800">
      {selectedDepartment.name}
    </p>

  </div>

)}




    </div>  



{/* ================================================= */}
    {/* DELETE DEPARTMENT CONFIRMATION MODAL */}
    {/* ================================================= */}

    {deleteDepartmentId !== null && (

      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

        <div className="bg-white rounded-xl shadow-xl w-full max-w-md">

          {/* Header */}

          <div className="p-6">

            <h2 className="text-xl font-bold text-gray-800">
              Delete Department
            </h2>

            <p className="text-gray-600 mt-3">
              Are you sure you want to delete this
              department?
            </p>

            <p className="text-sm text-red-500 mt-2">
              This action cannot be undone.
            </p>

          </div>

   {/* Buttons */}

          <div className="border-t p-4 flex justify-end gap-3">

            <button
              type="button"
              onClick={() =>
                setDeleteDepartmentId(null)
              }
              className="px-5 py-2.5 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>


            <button
              type="button"
              onClick={() => {

                setDepartments((prev) =>
                  prev.filter(
                    (department) =>
                      department.id !==
                      deleteDepartmentId
                  )
                );
 setDeleteDepartmentId(null);

              }}
              className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete
            </button>

          </div>

        </div>

      </div>

    )}

     

</div>


        {/* ================================================= */}
        {/* MANAGEMENT BUTTONS */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 mt-10">


          {/* TEACHER */}

          <button
            onClick={() => {
              clearTeacherForm();
              setShowTeacherModal(true);
            }}
            className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-md"
          >

            <FiUser className="text-3xl text-blue-700 mb-3" />

            <h2 className="text-xl font-bold">
              Teacher Management
            </h2>

            <p className="text-gray-500">
              Add and manage teachers
            </p>

          </button>


          {/* STUDENT */}

          <button
            onClick={() => {
              clearStudentForm();
              setShowStudentModal(true);
            }}
            className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-md"
          >

            <FiUsers className="text-3xl text-green-700 mb-3" />

            <h2 className="text-xl font-bold">
              Student Management
            </h2>

            <p className="text-gray-500">
              Add and manage students
            </p>

          </button>


          {/* COURSE */}

          <button
            onClick={() => {
              clearCourseForm();
              setShowCourseModal(true);
            }}
            className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-md"
          >

            <FiBook className="text-3xl text-purple-700 mb-3" />

            <h2 className="text-xl font-bold">
              Course Management
            </h2>

            <p className="text-gray-500">
              Add and manage courses
            </p>

          </button>

        </div>


        {/* ================================================= */}
        {/* ASSIGN COURSE HEADER */}
        {/* ================================================= */}

        <div className="flex justify-between items-center mb-5">

          <div>

            <h1 className="text-2xl font-bold text-gray-800">
              Course Assignments
            </h1>

            <p className="text-gray-500">
              Manage course, teacher and students.
            </p>

          </div>


          <button
            onClick={openAssignModal}
            className="bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-800"
          >

            <FiPlus />

            Assign Course

          </button>

        </div>


        {/* ================================================= */}
        {/* ASSIGNMENTS */}
        {/* ================================================= */}

        <div className="space-y-5">

          {assignments.map(
            (assignment) => {

              const course =
                courses.find(
                  (c) =>
                    c.id ===
                    assignment.courseId
                );

              const teacher =
                teachers.find(
                  (t) =>
                    t.id ===
                    assignment.teacherId
                );

              const assignedStudents =
                students.filter(
                  (student) =>
                    assignment.studentIds.includes(
                      student.id
                    )
                );

              return (

                <div
                  key={assignment.id}
                  className="bg-white rounded-xl shadow-sm border overflow-hidden"
                >

                  {/* COURSE */}

                  <div className="bg-slate-50 p-5 border-b flex justify-between items-center">

                    <div>

                      <span className="text-blue-700 font-bold">
                        {course?.courseCode}
                      </span>

                      <h2 className="text-xl font-bold">
                        {course?.title}
                      </h2>

                      <p className="text-gray-500">
                        Credit:{" "}
                        {course?.credit}
                      </p>

                    </div>


                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          editAssignment(
                            assignment
                          )
                        }
                        className="px-3 py-2 border rounded text-blue-600"
                      >

                        <FiEdit2 />

                      </button>


                      <button
                        onClick={() =>
                          deleteAssignment(
                            assignment.id
                          )
                        }
                        className="px-3 py-2 border rounded text-red-600"
                      >

                        <FiTrash2 />

                      </button>

                    </div>

                  </div>


                  {/* TEACHER */}

                  <div className="p-5">

                    <p className="text-gray-400 text-sm">
                      Teacher
                    </p>

                    <h3 className="text-xl font-bold">
                      {teacher?.name}
                    </h3>

                    <p className="text-gray-500">
                      {teacher?.email}
                    </p>


                    {/* STUDENTS */}

           {/* STUDENTS */}

<div className="mt-5">

  {/* Student Header */}

  <div className="flex justify-between items-center">

    <div className="flex items-center gap-2">

      <FiUsers className="text-blue-600" />

      <span className="font-semibold">
        Students
      </span>

      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm">
        {assignedStudents.length}
      </span>

    </div>


    <button
      onClick={() =>
        toggleAssignmentStudents(
          assignment.id
        )
      }
      className="text-blue-600 border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-50"
    >

      {expandedAssignments.includes(
        assignment.id
      )
        ? "Hide Students"
        : "Show Students"}

    </button>

  </div>


  {/* Student List */}

  {expandedAssignments.includes(
    assignment.id
  ) && (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">

      {assignedStudents.map(
        (student) => (

          <button
            key={student.id}
            onClick={() =>
              openStudentDetails(
                student
              )
            }
            className="text-left border rounded-lg p-4 hover:bg-blue-50 transition"
          >

            <p className="font-bold text-gray-800">
              {student.roll}
            </p>

            <p className="text-gray-600">
              {student.name}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Series:{" "}
              {student.seriesBatch}
              {" • "}
              Group:{" "}
              {student.group}
            </p>

          </button>

        )
      )}

    </div>

  )}

</div>





                     
                  

                  </div>

                </div>

              );
            }
          )}

        </div>

      </div>        


                     

                   


      {/* ================================================= */}
      {/* STUDENT DETAILS MODAL */}
      {/* ================================================= */}

      {selectedStudent && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-xl w-full max-w-lg p-6">

            <div className="flex justify-between">

              <h2 className="text-xl font-bold">
                Student Details
              </h2>

              <button
                onClick={() =>
                  setSelectedStudent(null)
                }
              >

                <FiX size={24} />

              </button>

            </div>


            <div className="mt-5 space-y-3">

              <p>
                <b>ID:</b>{" "}
                {selectedStudent.id}
              </p>

              <p>
                <b>Roll:</b>{" "}
                {selectedStudent.roll}
              </p>

              <p>
                <b>Name:</b>{" "}
                {selectedStudent.name}
              </p>
<p>
  <b>Password:</b>{" "}
  {selectedStudent.password}
</p>
              <p>
                <b>Series / Batch:</b>{" "}
                {selectedStudent.seriesBatch}
              </p>

              <p>
                <b>Group:</b>{" "}
                {selectedStudent.group}
              </p>

            </div>


            <h3 className="font-bold mt-6 mb-3">
              Assigned Courses
            </h3>


            {assignments
              .filter(
                (assignment) =>
                  assignment.studentIds.includes(
                    selectedStudent.id
                  )
              )
              .map((assignment) => {

                const course =
                  courses.find(
                    (course) =>
                      course.id ===
                      assignment.courseId
                  );

                const teacher =
                  teachers.find(
                    (teacher) =>
                      teacher.id ===
                      assignment.teacherId
                  );

                return (

                  <div
                    key={assignment.id}
                    className="border rounded-lg p-3 mb-2"
                  >

                    <p className="font-bold">
                      {course?.courseCode}
                    </p>

                    <p className="text-gray-500">
                      {course?.title}
                    </p>

                    <p className="text-sm">
                      Teacher:{" "}
                      {teacher?.name}
                    </p>


                    <div className="flex gap-2 mt-2">

                      <button
                        onClick={() =>
                          editAssignment(
                            assignment
                          )
                        }
                        className="text-blue-600 text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteAssignment(
                            assignment.id
                          )
                        }
                        className="text-red-600 text-sm"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                );
              })}

          </div>

        </div>

      )}


      {/* ================================================= */}
      {/* ASSIGN COURSE MODAL */}
      {/* ================================================= */}

    {showAssignmentModal && (

  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

    <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

      <div className="p-6 border-b flex justify-between">

        <h2 className="text-xl font-bold">
          {editingAssignmentId
            ? "Edit Assignment"
            : "Assign Course"}
        </h2>

        <button
          onClick={() =>
            setShowAssignmentModal(false)
          }
        >
          <FiX size={24} />
        </button>

      </div>


      <div className="p-6">

        {/* COURSE */}

        <label className="font-semibold">
          Course
        </label>

        <select
          value={selectedCourseId}
          onChange={(e) =>
            setSelectedCourseId(
              e.target.value
                ? Number(e.target.value)
                : ""
            )
          }
          className="w-full border p-3 rounded-lg mt-2 mb-5"
        >

          <option value="">
            Select Course
          </option>

          {courses.map((course) => (

            <option
              key={course.id}
              value={course.id}
            >
              {course.courseCode} - {course.title}
            </option>

          ))}

        </select>


        {/* TEACHER */}

        <label className="font-semibold">
          Teacher
        </label>

        <select
          value={selectedTeacherId}
          onChange={(e) =>
            setSelectedTeacherId(
              e.target.value
                ? Number(e.target.value)
                : ""
            )
          }
          className="w-full border p-3 rounded-lg mt-2 mb-5"
        >

          <option value="">
            Select Teacher
          </option>

          {teachers.map((teacher) => (

            <option
              key={teacher.id}
              value={teacher.id}
            >
              {teacher.name}
            </option>

          ))}

        </select>


        {/* BATCH */}

        <label className="font-semibold">
          Series / Batch
        </label>

        <select
          value={selectedBatch}
          onChange={(e) => {

            setSelectedBatch(
              e.target.value
            );

            // Batch change হলে আগের selected students remove
            setSelectedStudentIds([]);

            // Batch change হলে Group reset
            setSelectedGroup("");

          }}
          className="w-full border p-3 rounded-lg mt-2 mb-5"
        >

          <option value="">
            Select Series / Batch
          </option>

          {[
            ...new Set(
              students.map(
                (student) =>
                  student.seriesBatch
              )
            ),
          ].map((batch) => (

            <option
              key={batch}
              value={batch}
            >
              {batch}
            </option>

          ))}

        </select>


        {/* GROUP */}

        <label className="font-semibold">
          Group
        </label>

        <select
          value={selectedGroup}
          onChange={(e) => {

            setSelectedGroup(
              e.target.value
            );

            // Group change হলে আগের selection remove
            setSelectedStudentIds([]);

          }}
          className="w-full border p-3 rounded-lg mt-2 mb-5"
        >

          <option value="">
            Select Group
          </option>

          {[
            ...new Set(
              students
                .filter(
                  (student) =>
                    selectedBatch &&
                    student.seriesBatch ===
                      selectedBatch
                )
                .map(
                  (student) =>
                    student.group
                )
            ),
          ].map((group) => (

            <option
              key={group}
              value={group}
            >
              Group {group}
            </option>

          ))}

        </select>


        {/* ================================================= */}
        {/* STUDENTS */}
        {/* ================================================= */}

        {canShowStudents && (

          <div className="mt-6">

            {/* Student Header */}

            <div className="flex justify-between items-center mb-3">

              <div>

                <h3 className="font-bold text-lg">
                  Students
                </h3>

                <p className="text-sm text-gray-500">
                  {filteredAssignmentStudents.length} students found
                </p>

              </div>


              {/* Select All / Remove All */}

              <div className="flex gap-2">

                <button
                  type="button"
                  onClick={() => {

                    setSelectedStudentIds(
                      filteredAssignmentStudents.map(
                        (student) =>
                          student.id
                      )
                    );

                  }}
                  className="px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
                >
                  Select All
                </button>


                <button
                  type="button"
                  onClick={() => {

                    setSelectedStudentIds([]);

                  }}
                  className="px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                >
                  Remove All
                </button>

              </div>

            </div>


            {/* Student List */}

            {filteredAssignmentStudents.length === 0 ? (

              <div className="border rounded-lg p-6 text-center text-gray-500">

                No students found for this
                Series / Batch and Group.

              </div>

            ) : (

              <div className="border rounded-lg overflow-hidden">

                {filteredAssignmentStudents.map(
                  (student) => {

                    const checked =
                      selectedStudentIds.includes(
                        student.id
                      );

                    return (

                      <label
                        key={student.id}
                        className={`flex items-center gap-3 p-4 border-b last:border-b-0 cursor-pointer ${
                          checked
                            ? "bg-blue-50"
                            : "hover:bg-gray-50"
                        }`}
                      >

                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            toggleStudent(
                              student.id
                            )
                          }
                          className="w-4 h-4"
                        />


                        <div className="flex-1">

                          <p className="font-semibold">
                            {student.roll}
                          </p>

                          <p className="text-sm text-gray-500">
                            {student.name}
                          </p>

                        </div>


                        <div className="text-sm text-gray-400">

                          {student.seriesBatch}
                          {" • "}
                          Group {student.group}

                        </div>

                      </label>

                    );

                  }
                )}

              </div>

            )}


            {/* Selected Count */}

            <div className="mt-3 text-right">

              <span className="text-blue-700 font-semibold">

                Selected Students:{" "}
                {selectedStudentIds.length}

              </span>

            </div>

          </div>

        )}

      </div>


      {/* FOOTER */}

      <div className="p-6 border-t flex justify-end gap-3">

        <button
          onClick={() =>
            setShowAssignmentModal(false)
          }
          className="px-5 py-2 border rounded-lg"
        >
          Cancel
        </button>


        <button
          onClick={saveAssignment}
          className="px-5 py-2 bg-blue-700 text-white rounded-lg"
        >

          {editingAssignmentId
            ? "Save Changes"
            : "Assign"}

        </button>

      </div>

    </div>

  </div>

)}


      {/* ================================================= */}
      {/* TEACHER MODAL */}
      {/* ================================================= */}

      {showTeacherModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-xl w-full max-w-lg p-6">

            <div className="flex justify-between mb-5">

              <h2 className="text-xl font-bold">
                {editingTeacherId
                  ? "Edit Teacher"
                  : "Add Teacher"}
              </h2>

              <button
                onClick={() =>
                  setShowTeacherModal(
                    false
                  )
                }
              >
                <FiX size={24} />
              </button>

            </div>


            <div className="space-y-4">

              

              <input
                value={teacherName}
                onChange={(e) =>
                  setTeacherName(
                    e.target.value
                  )
                }
                placeholder="Teacher Name"
                className="w-full border p-3 rounded-lg"
              />

              <input
              type="email"
                value={teacherEmail}
                onChange={(e) =>
                  setTeacherEmail(
                    e.target.value
                  )
                }
                placeholder="Email"
                className="w-full border p-3 rounded-lg"
              />

              <input
                value={teacherPassword}
                onChange={(e) =>
                  setTeacherPassword(
                    e.target.value
                  )
                }
                placeholder="Password"
                type="password"
                className="w-full border p-3 rounded-lg"
              />

            </div>


            <button
              onClick={saveTeacher}
              className="w-full mt-5 bg-blue-700 text-white p-3 rounded-lg"
            >
              Save Teacher
            </button>

          </div>

        </div>

      )}


      {/* ================================================= */}
      {/* STUDENT MODAL */}
      {/* ================================================= */}

      {showStudentModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between mb-5">

              <h2 className="text-xl font-bold">
                {editingStudentId
                  ? "Edit Student"
                  : "Add Student"}
              </h2>

              <button
                onClick={() =>
                  setShowStudentModal(
                    false
                  )
                }
              >
                <FiX size={24} />
              </button>

            </div>


            <div className="space-y-4">
 

              <input
                value={studentId}
                onChange={(e) =>
                  setStudentId(
                    e.target.value
                  )
                }
                placeholder="Student ID"
                className="w-full border p-3 rounded-lg"
              />

              <input
                value={studentRoll}
                onChange={(e) =>
                  setStudentRoll(
                    e.target.value
                  )
                }
                placeholder="Roll"
                className="w-full border p-3 rounded-lg"
              />

              <input
                value={studentName}
                onChange={(e) =>
                  setStudentName(
                    e.target.value
                  )
                }
                placeholder="Student Name"
                className="w-full border p-3 rounded-lg"
              />

              <input
                value={studentPassword}
                onChange={(e) =>
                  setStudentPassword(
                    e.target.value
                  )
                }
                placeholder="Password"
                type="password"
                className="w-full border p-3 rounded-lg"
              />

              <input
                value={studentBatch}
                onChange={(e) =>
                  setStudentBatch(
                    e.target.value
                  )
                }
                placeholder="Series / Batch"
                className="w-full border p-3 rounded-lg"
              />

              <input
  value={studentGroup}
  onChange={(e) =>
    setStudentGroup(e.target.value)
  }
  placeholder="Group"
  className="w-full border p-3 rounded-lg"
/>

            </div>


            <button
              onClick={saveStudent}
              className="w-full mt-5 bg-blue-700 text-white p-3 rounded-lg"
            >
              Save Student
            </button>

          </div>

        </div>

      )}


      {/* ================================================= */}
      {/* COURSE MODAL */}
      {/* ================================================= */}
{showCourseModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

    <div className="bg-white rounded-xl w-full max-w-lg p-6">

      <div className="flex justify-between mb-5">
        <h2 className="text-xl font-bold">
          {editingCourseId ? "Edit Course" : "Add Course"}
        </h2>

        <button
          onClick={() => setShowCourseModal(false)}
        >
          <FiX size={24} />
        </button>
      </div>

      <div className="space-y-4">

        

        {/* Semester */}
        <input
          value={courseSemester}
          onChange={(e) =>
            setCourseSemester(e.target.value)
          }
          placeholder="Semester"
          className="w-full border p-3 rounded-lg"
        />

        {/* Course Code */}
        <input
          value={courseCode}
          onChange={(e) =>
            setCourseCode(e.target.value)
          }
          placeholder="Course Code"
          className="w-full border p-3 rounded-lg"
        />

        {/* Course Title */}
        <input
          value={courseTitle}
          onChange={(e) =>
            setCourseTitle(e.target.value)
          }
          placeholder="Course Title"
          className="w-full border p-3 rounded-lg"
        />

        {/* Course Credit */}
        <input
          value={courseCredit}
          onChange={(e) =>
            setCourseCredit(Number(e.target.value))
          }
          placeholder="Course Credit"
          type="number"
          step="0.5"
          min="0"
          className="w-full border p-3 rounded-lg"
        />

      </div>

      <button
        onClick={saveCourse}
        className="w-full mt-5 bg-blue-700 text-white p-3 rounded-lg"
      >
        {editingCourseId ? "Update Course" : "Save Course"}
      </button>

    </div>
  </div>
)}

{/* ================================================= */}
{/* DELETE ASSIGNMENT CONFIRMATION MODAL */}
{/* ================================================= */}

{showDeleteModal && (

  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">

    <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">

      {/* Icon / Header */}

      <div className="flex items-center gap-3 mb-4">

        <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center">

          <FiTrash2
            className="text-red-600"
            size={22}
          />

        </div>

        <div>

          <h2 className="text-xl font-bold text-gray-800">
            Delete Assignment
          </h2>

          <p className="text-sm text-gray-500">
            Confirm your action
          </p>

        </div>

      </div>


      {/* Message */}

      <p className="text-gray-600 mb-6">

        Are you sure you want to delete this
        course assignment?

        <br />

        This will remove the assigned teacher
        and students from this assignment.

      </p>


      {/* Buttons */}

      <div className="flex justify-end gap-3">

        <button
          onClick={() => {
            setShowDeleteModal(false);
            setDeleteAssignmentId(null);
          }}
          className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>


        <button
          onClick={confirmDeleteAssignment}
          className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >

          Delete

        </button>

      </div>

    </div>

  </div>

)}



    </div>
  );
};

export default Page;