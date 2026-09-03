"use client"
import React, { useEffect, useState } from 'react'
import { Quintessential } from 'next/font/google'
import { AiFillCaretRight } from "react-icons/ai";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { FiAlignJustify } from "react-icons/fi";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { NativeSelect } from "@mui/material";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { FiUserX } from "react-icons/fi";
import { InputNumber,Button,Rate } from 'antd';
import Link from "next/link";
import { Search } from "lucide-react";

{/* for font */}
const quintessential=Quintessential({
  subsets:["latin"],
  weight:"400",
});



const semesterCourses={
  "1-1":[{ name: "CSE 1100", credit: 0.75,title:"Computer Fundamentals and Ethics Sessional",teacher:"Dr. Md. Rabiul Islam" }, { name: "CSE 1102", credit: 1.5,title:"Structured Programming Sessional",teacher:""  },{ name:"EEE 1152",credit:0.75,title:"Basic Electrical Engineering Sessional",teacher:"" } ,{ name:"HUM 1114",credit:0.75,title:"Functional English Sessional",teacher:"" } ,{ name:"CHEM 1114",credit:0.75,title:"Inorganic and Physical Chemistry Sessional",teacher:"" }],
  "1-2":[{ name: "CSE 1200", credit: 0.75,title:"Competitive Programming Sessional",teacher:""  }, { name: "CSE 1202", credit: 1.5,title:"Data Structure Sessional",teacher:""  },{ name:"EEE 1252",credit:1.5,title:"Electronic Devices and Circuits Sessional",teacher:"" } ,{ name:"CSE 1204",credit:1.5,title:"Object Oriented Programming Sessional",teacher:"" } ,{ name:"PHY 1214",credit:0.75,title:"Physics Sessional",teacher:"" }],
  "2-1":[{ name: "CSE 2100", credit: 0.75,title:"Software Development Project I",teacher:""  }, { name: "CSE 2102", credit: 1.5,title:"Discrete Mathematics Sessional",teacher:""  },{ name:"EEE 2152",credit:0.75,title:"Electrical Drives and Instrumentations Sessional",teacher:"" } ,{ name:"CSE 2104",credit:1.5,title:"Digital Logic Design Sessional",teacher:"" }],
  "2-2":[{ name: "CSE 2200", credit: 0.75,title:"Technical Writing and Presentation Sessional",teacher:""  }, { name: "CSE 2202", credit: 1.5,title:"Algorithm Analysis and Design Sessional",teacher:"Md. Mazharul Islam"  },{ name:"CSE 2204",credit:0.75,title:"Numerical Methods Sessional",teacher:"" } ,{ name:"CSE 2106",credit:1.5,title:"Microprocessors,Microcontrollers and Assembly Language Sessional",teacher:"" }],
  "3-1":[{ name: "CSE 3100", credit: 0.75,title:"Web Based Application Project",teacher:""  }, { name: "CSE 3102", credit: 1.5,title:"Database Systems Sessional",teacher:"Barshon Sen" },{ name:"CSE 3106",credit:0.75,title:"Computer Interfacing and Embadded System Sessional",teacher:""} ,{ name:"CSE 3108",credit:0.75,title:"Computer Architecture Sessional",teacher:""}],
  "3-2":[{ name: "CSE 3200", credit: 0.75,title:"Software Development Project II",teacher:"" }, { name: "CSE 3202", credit: 0.75,title:"Operating Systems Sessional",teacher:"" },{ name:"CSE 3204",credit:0.75,title:"Data Communication Sessional",teacher:""} ,{ name:"CSE 3206",credit:0.75,title:"Software Engineering Sessional",teacher:""},{ name:"CSE 3208",credit:0.75,title:"Artificial Intelligence  Sessional",teacher:""},{ name:"CSE 3210",credit:0.75,title:"Digital Signal Processing Sessional",teacher:""}],
  "4-1":[{ name: "CSE 4000", credit: 1.00,title:"Project/Thesis I",teacher:"" }, { name: "CSE 4102", credit: 0.75,title:"Compiler Design Sessional",teacher:"" },{ name:"CSE 4104",credit:1.5,title:"Computer Networks Sessional",teacher:""} ,{ name:"CSE 4106",credit:0.75,title:"Digital Image Processing Sessional",teacher:""},{ name:"CSE 4108",credit:0.75,title:"Industrial Attachment",teacher:""},{ name:"CSE 4110",credit:0.75,title:"Information Systems Analysis and Design Sessional",teacher:""},{ name: "CSE 4112", credit: 0.75,title:"Unix Programming Sessional",teacher:"" }, { name: "CSE 4114", credit: 0.75,title:"Digital System Design Sessional",teacher:"" },{ name:"CSE 4116",credit:0.75,title:"Simulation and Modeling Sessional",teacher:""} ,{ name:"CSE 4118",credit:0.75,title:"Wireless Networks Sessional",teacher:""},{ name:"CSE 4120",credit:0.75,title:"Data Mining Sessional",teacher:""},{ name:"CSE 4122",credit:0.75,title:"Computer Vision Sessional",teacher:""},{ name:"CSE 4124",credit:0.75,title:"Knowledge Engineering Sessional",teacher:""}],
  "4-2":[{ name: "CSE 4000", credit: 1.00,title:"Project/Thesis II",teacher:"" }, { name: "CSE 4202", credit: 0.75,title:"Computer Graphics Sessional",teacher:"" },{ name:"CSE 4204",credit:0.75,title:"Machine Learning Sessional",teacher:""} ,{ name:"CSE 4206",credit:0.75,title:"Security and Privacy Sessional",teacher:""},{ name:"CSE 4208",credit:0.75,title:"Seminar",teacher:""}]
 
};

/*const courseTableMap = {
  "CSE 1100": "cse1100_table",
  "CSE 2202": "cse2202_table",
  
};*/







const page = () => {
 const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
const [reportDate, setReportDate] = useState("");
const [file, setFile] = useState<File | null>(null);
const [students,setStudents] = useState<any[]>([]); 
const [uploading, setUploading] = useState(false);
//const [file1, setFile1] = useState(null);
const [file1, setFile1] = useState<File | null>(null);
const [roll, setRoll] = useState("");
const [teacher,setTeacher]=useState("");
const router = useRouter();
const [avgMarks, setAvgMarks] = useState(0);
const [avgAttendance, setAvgAttendance] = useState(0);
const [open,setOpen]=useState(false);
 const [attendance, setAttendance] = useState<number[]>([]);
 const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
 const maxStars=5;
  const [totalMarks,setTotalMarks]=useState(0);
  const marksperStar=totalMarks/maxStars;
const [givenStars, setGivenStars] = useState<number[]>([]);
//const calculateMarks=givenStars*marksperStar;
const calculateMarks = (index: number) => {
  return (givenStars[index] || 0) * marksperStar;
};
 //star marks reset
const handleReset = (index: number) => {
  const newMarks = [...givenStars];
  newMarks[index] = 0;
  setGivenStars(newMarks);

   // Reset Attendance
  const newAttendance = [...attendance];
  newAttendance[index] = 0;
  setAttendance(newAttendance);
};





//const semesters = Object.keys(semesterCourses); 

const selectedCourseData =
  semesterCourses[selectedSemester as keyof typeof semesterCourses]?.find(
    (course) => course.name === selectedCourse
  );

+









useEffect(() => {
  window.scrollTo(0,0);
  //roll from localstorage
  const savedRoll = localStorage.getItem("roll");
  if (!savedRoll) {
    router.push("/"); //go login page
    return;
  }
  setRoll(savedRoll);
}, []);



 /*const rowCount = selectedCourseData
  ? selectedCourseData.credit * 8
  : 0; */

useEffect(() => {
  if (!selectedCourse) return;
  
console.log("roll:", roll);
  console.log("course:", selectedCourse);

  fetch(`http://localhost:4000/students?roll=${roll}&course=${encodeURIComponent(selectedCourse)}`)
    .then(res => res.json())
    .then(data => {
      /*console.log("full data:", data);
  console.log("students length:", data.students?.length);*/
    setStudents(data.students || []);
      setAvgMarks(data.avgMarks || 0);
  setAvgAttendance(data.avgAttendance || 0);
    });

}, [selectedCourse]);
  
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
     //  const selectedFile = e.target.files[0];
      const selectedFile = e.target.files?.[0];
    //Optional:Only PDF allow korar extra check
    if (selectedFile.type !== "application/pdf") {
      alert("Only PDF files are allowed!");
      e.target.value = ""; //input clear
      return;
    }

    setFile1(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file1 || !selectedCourse || !reportDate) {

alert("Please select Course, Date and upload a PDF file");
    return;
    }
    

    setUploading(true);

    const formData = new FormData();
    formData.append("pdf", file1);
    formData.append("course", selectedCourse); // optional:send course info
formData.append("reportDate", reportDate);
formData.append("roll", roll);
    try {
    const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });



const result = await response.json();

if (!response.ok) {
      //show error
      alert(` ${result.error}`);
      return;
    }


    if (result.success) {
      alert(`Report uploaded successfully for ${reportDate}`);
      setFile1(null);  //file clear
      setReportDate("");         
      
    } else {
      alert(result.error || "Upload failed");
    }
  } catch (error) {
    console.error("Upload error:", error);
    alert("Network error! Please check if server is running.");
  } finally {
    setUploading(false);
  }
};
  

const handleLogout = () => {
  localStorage.removeItem("roll");
  router.push("/");
};


{/*const handleSubmit = async () => {
    if (!file1) return;

    const formData = new FormData();
    formData.append("pdf", file1);

    await fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
    });
  };*/}



return (
    <div  className="min-h-screen">
{/* Lab porformance heading */}

       <div className='relative bg-blue-900 w-full flex items-center  px-4 py-4 '>
            <div className="flex items-center"><AiFillCaretRight className='text-3xl md:text-5xl text-white'/>
            <span  className={`${quintessential.className} text-white  text-xl md:text-4xl`}>LAB PERFORMANCE TRACKER</span>
            <span className='text-white'>(Home)</span>
             <Link href='/adminPage'>AdminPage</Link>
        <Link href='/studentPage'>StudentPage</Link>
            </div>
{/* Right Side */}
    <div className="ml-auto flex items-center gap-3">
       {/* Search */}
  <div className="flex items-center gap-2">

    {/* Search Input */}
    {showSearch && (
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-40 md:w-64 border border-gray-300 rounded-lg px-3 py-2 outline-none text-white"
      />
    )}

    {/* Search Icon */}
    <button
      onClick={() => setShowSearch(!showSearch)}
      className="p-2 text-white"
    >
      <Search
      size={30}
      strokeWidth={3}
      className="text-white"
    />
    </button>

  </div>
       
 {/* Logout + Sidebar */}


  {/* Logout Button */}
  <button
    className="bg-red-600 hover:bg-red-700 text-white font-medium
               px-6 py-2 rounded text-sm md:text-base"
  >
    Logout
  </button>

  {/* Sidebar Button */}
  
    <button
        className="bg-gray-200 p-2 rounded"
        onClick={() => setOpen(true)}
      >
        <FiAlignJustify className="text-2xl cursor-pointer" />
      </button>
  
</div>
</div>      
 



<div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />
<div
        className={`fixed top-5 right-0  w-[200px] bg-white z-50
        transform transition-transform duration-300 ease-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">Others</h2>
          <FiUserX
            className="cursor-pointer text-xl"
            onClick={() => setOpen(false)}
          />
        </div>

        {/* Menu Content */}
        <ul className="p-4 space-y-4">
          <Link href="/teacherPage"><li>Home</li></Link>
          <Link href="/lab_report_check"><li>Lab Report Check</li></Link>
          <Link href="/quiz"><li>Quiz</li></Link>
           <Link href="/viva"><li>Viva</li></Link>
          
        </ul>
      </div>

        
        







<div className='flex flex-col lg:flex-row'>

{/*table,course code,course title,avg,attendence*/}
<div className='w-full  relative'>
  {/*course code,credit*/}
  <div className='flex flex-col md:flex-row w-full'>
     

<div className='w-full md:w-1/3 bg-yellow-50 p-4'>
{/*Series/Batch*/}
<div className='flex flex-wrap items-center gap-2 lg:ml-14 '>
<h1 className='font-bold text-base md:text-xl'>Series/Batch:</h1>
    <NativeSelect
  
  value={selectedCourse}
  onChange={(e) => setSelectedCourse(e.target.value)}
>
  <option value="">Select Course</option>
  {(semesterCourses[selectedSemester as keyof typeof semesterCourses] || []).map((course, idx) => (
    <option key={idx} value={course.name}>
      {course.name}
    </option>
  ))}
</NativeSelect>
  </div>


{/*Semester*/}
<div className='flex flex-wrap items-center gap-2 lg:ml-14 mt-2'>
<h1 className='font-bold text-base md:text-xl'>Semester No:</h1>
    <NativeSelect
  
  value={selectedCourse}
  onChange={(e) => setSelectedCourse(e.target.value)}
>
  <option value="">Select Course</option>
  {(semesterCourses[selectedSemester as keyof typeof semesterCourses] || []).map((course, idx) => (
    <option key={idx} value={course.name}>
      {course.name}
    </option>
  ))}
</NativeSelect>
  </div>

{/*course code*/}
  <div className='flex flex-wrap items-center gap-2 lg:ml-14 mt-2'>
<h1 className='font-bold text-base md:text-xl'>Course Code:</h1>
    <NativeSelect
  
  value={selectedCourse}
  onChange={(e) => setSelectedCourse(e.target.value)}
>
  <option value="">Select Course</option>
  {(semesterCourses[selectedSemester as keyof typeof semesterCourses] || []).map((course, idx) => (
    <option key={idx} value={course.name}>
      {course.name}
    </option>
  ))}
</NativeSelect>
  </div>


</div>
{/*course title,teacher name*/}
<div className='w-full md:flex-1 bg-yellow-50 p-4 border-t md:border-t-0 md:border-l border-gray-300'>
  {/*teacher name*/}
<div className='flex flex-wrap items-center  lg:ml-18'>
  <div className='flex items-center gap-1'></div>
<h1 className='font-bold text-base md:text-xl'>Teacher Name:</h1>
<h1 className='font-bold text-base md:text-xl'>{selectedCourseData ? selectedCourseData.teacher:""}</h1>
 </div>
{/*course title*/}
<div className='flex flex-wrap items-center gap-2 mt-2 lg:ml-18 '>
 <h1 className='font-bold text-base md:text-xl '>Course Title:</h1>
      <h1 className='font-bold text-base md:text-xl'>{selectedCourseData ? selectedCourseData.title : "Select Course"} </h1>
</div>
{/*credit*/}
<div className='flex flex-wrap items-center gap-2 mt-2 lg:ml-18 '>
<h1 className='font-bold text-base md:text-xl'>Credit:</h1>
<h1 className='font-bold text-base md:text-xl'>{selectedCourseData ? selectedCourseData.credit : 0}</h1>
</div>

 
</div>
</div>
{/*Table,lab no,date select,lab type,lab group*/}
<div className="bg-green-200 h-16 w-full flex items-center justify-between px-8">

  <div className="flex items-center">
    Lab No:
    <InputNumber 
  
  value=""
  placeholder='01 formate'
  
  
  />
  </div>


<div className="flex items-center">
    Lab Type:
    <NativeSelect className="ml-2">
      <option value="">Select Lab Type</option>
      <option value="daily">Daily Lab</option>
      <option value="test">Lab Test</option>
    </NativeSelect>
  </div>
{/*marks input*/}
  <div className="flex items-center">
    Input Marks:
     <InputNumber 
  min={1}
  value={totalMarks}
  
  onChange={(value)=>setTotalMarks(value || 0)}
  />

  </div>

  <div className="flex items-center">
    Lab Date:
    <input
      className="ml-2"
      type="date"
    />
  </div>

  <div className="flex items-center">
    Lab Group:
    <NativeSelect className="ml-2">
      <option value="">Select Lab Group</option>
      <option value="1st30">B_1st30</option>
      <option value="2nd30">B_2nd30</option>
    </NativeSelect>
  </div>

</div>

<div className='flex flex-col lg:flex-row'>

{/*Table*/}

<div className='bg-sky-50 flex-1 p-4 overflow-x-auto '>
   <table  className="w-full text-center border border-black text-sm md:text-base">
        <thead>
          <tr>
            <th className="border border-black p-2 md:p-3">Roll/ID</th>
          
          <th className="border border-black p-2 md:p-3">Performance</th>
          <th className="border border-black p-2 md:p-3">Attendance</th>
          <th className="border border-black p-2 md:p-3">Save</th>
          </tr>
        </thead>
        <tbody>
   
    <tr >
       <td className="border border-black p-2 md:p-3">1</td>
            <td className="border border-black p-2 md:p-3">
              <Rate className='text-3xl' allowHalf count={maxStars}   value={givenStars[0] || 0}
  onChange={(value) => {
    const newMarks = [...givenStars];
    newMarks[0] = value;
    setGivenStars(newMarks);

    // Attendance
    const newAttendance = [...attendance];
    newAttendance[0] = value > 0 ? 1 : 0;
    setAttendance(newAttendance);
  }} />
            <span className='text-lg font-semibold'>{calculateMarks(0)}</span>
            <Button  onClick={() => handleReset(0)} className='ml-5'>Reset Marks</Button>
</td>
            <td className="border border-black p-2 md:p-3">{attendance[0] || 0}</td>
            <td className="border border-black p-2 md:p-3"><button>Save</button></td>
            </tr>

             <tr >
       <td className="border border-black p-2 md:p-3">2</td>
            <td className="border border-black p-2 md:p-3">
              <Rate className='text-3xl' allowHalf count={maxStars}  value={givenStars[1] || 0}
  onChange={(value) => {
    const newMarks = [...givenStars];
    newMarks[1] = value;
    setGivenStars(newMarks);

    // Attendance
    const newAttendance = [...attendance];
    newAttendance[1] = value > 0 ? 1 : 0;
    setAttendance(newAttendance);
  }} />
            <span className='text-lg font-semibold'>{calculateMarks(1)}</span>
            <Button  onClick={() => handleReset(1)} className='ml-5'>Reset Marks</Button>
            </td>
            <td className="border border-black p-2 md:p-3">  {attendance[1] || 0}
</td>
            <td className="border border-black p-2 md:p-3"><button>Save</button></td>
            </tr>
  
</tbody>
      </table>

</div>


</div>






</div>





</div>



<div>



        </div>

<div className='bg-slate-200 h-15 w-full flex items-center justify-between'>
<div className='ml-90'>
  <button
   
    className='bg-green-900 hover:bg-green-700 text-white  font-medium  px-6 py-2 rounded text-sm mr-2 md:text-base'
  >
    Submit
  </button></div>
<div className='mr-90'>
  <button
   
    className='bg-green-900 hover:bg-green-700 text-white  font-medium  px-6 py-2 rounded text-sm mr-2 md:text-base'
  >
  PDF Generator
  </button>
</div>
</div>



        </div>
  )
}

export default page