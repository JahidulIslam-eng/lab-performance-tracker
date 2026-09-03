"use client";
import React from 'react'
import { useState } from "react";
import { Input } from '@/components/ui/input' 
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button' 
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card' 
import { useRouter } from "next/navigation";
import Link from 'next/link'
import { Quintessential } from 'next/font/google'


{/* for font */}
const quintessential=Quintessential({
  subsets:["latin"],
  weight:"400",
});


const page = () => {
  const initialFormData = {
  first_name: "",
  last_name: "",
  email: "",
  phone_no: "",
  birthdate: "",
  password: "",
  confirmPassword: "",
};

const [formData, setFormData] = useState(initialFormData);

const [passwordError, setPasswordError] = useState("");
  const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=[\]{};':"\\|,.<>/~`]).{8,}$/;
const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const router = useRouter(); 
  //password condition
  
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const { id, value} = e.target;

  let updatedValue = value;

  if (id === "first_name" || id === "last_name") {
    updatedValue =
      value.charAt(0).toUpperCase() + value.slice(1);
  }
  

    setFormData((prev) => ({
    ...prev,
    [id]: value,
  }));
  //phone no error hide
   //const { name, value } = e.target;

    

    if(id === "phone_no"){
        setPhoneError("");
    }


  if (id === "password") {
    if (value === "") {
      setPasswordError("");
    } else if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
    } else {
      setPasswordError("");
    }
  }
  };

const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault();
    
  try {
    const response = await fetch("http://localhost:4000/signup",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone_no: formData.phone_no,
        birthdate: formData.birthdate,
        password: formData.password,
      }),
    });

    const data = await response.json();


console.log(data);
    if (response.ok) {
      

      // Form Reset
      setFormData(initialFormData);
      setError("");
      setMessage("Signup Successful");

    router.push("/loginPage");
    } else {
      if (data.message === "Phone number already exists") {
    setPhoneError(data.message);
  }
     // setError(data.message);
    }
  } catch(error){
    setError("Something went wrong. Please try again.");
  }
  };
  return (

    <div className='h-screen w-screen'>
        <div className='bg-blue-900 w-full flex items-center justify-center py-6 px-4'>
<span  className={`${quintessential.className} text-white  text-4xl md:text-4xl text-center`}>LAB PERFORMANCE TRACKER</span>

        </div>
        <div className='flex items-center justify-center py-6 px-4'>
<span className='text-3xl'>Signup for this account</span>
        </div>


<div className='h-[calc(100vh-100px)] flex justify-center items-center  '>
    
        <Card className='h-180 w-100 '> 
        <form onSubmit={handleSubmit}>
<div className="flex flex-col gap-6 ">

  {/* First Name */}
  <div className="grid gap-2 ml-5 mr-5">
    <Label htmlFor="firstName">First Name</Label>
    <Input
      id="first_name"
      type="text"
      value={formData.first_name}
      onChange={handleChange}
      placeholder="Enter your first name"
      required
      autoComplete="given-name"
    />
  </div>

  {/* Last Name */}
  <div className="grid gap-2 ml-5 mr-5">
    <Label htmlFor="lastName">Last Name</Label>
    <Input
      id="last_name"
      type="text"
      value={formData.last_name}
      onChange={handleChange}
      placeholder="Enter your last name"
      required
      autoComplete="family-name"
    />
  </div>

  {/* Email */}
  <div className="grid gap-2 ml-5 mr-5">
    <Label htmlFor="email">Email</Label>
    <Input
      id="email"
      type="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="Enter your email"
      required
      autoComplete="email"
       pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
    title="Please enter a valid email address"
    />
  </div>

{/* Phone Number */}
<div className="grid gap-2 ml-5 mr-5">
  <Label htmlFor="phone">Phone Number</Label>
  <Input
    id="phone_no"
    type="tel"
    
    value={formData.phone_no}
    onChange={handleChange}
     
    placeholder="Enter your phone number"
    required
    autoComplete="tel"
    pattern="[0-9]{11}"
    title="Please enter a valid 11 digit phone number"
  />
  {phoneError && (
    <p className="text-sm text-red-500">
      {phoneError}
    </p>
  )}
</div>

  {/* Birth Date */}
  <div className="grid gap-2 ml-5 mr-5">
    <Label htmlFor="birthDate">Birth Date</Label>
    <Input
      id="birthdate"
      type="date"
      value={formData.birthdate}
      onChange={handleChange}
      required
    />
  </div>

  {/* Password */}
  <div className="grid gap-2 ml-5 mr-5">
    <Label htmlFor="password">Password</Label>
    <Input
      id="password"
      name="password"
      type="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Enter your password"
      required
      minLength={8}
      autoComplete="new-password"
      
    />
     {passwordError && (
    <p className="text-sm text-red-500">
      {passwordError}
    </p>
  )}
  </div>
  {/* Confirm Password */}
    <div className="grid gap-2 ml-5 mr-5">
<Label htmlFor="confirmPassword">Confirm Password</Label>
 <Input
id="confirmPassword"
name="confirmPassword"
type="password"
value={formData.confirmPassword}
 onChange={handleChange}
 placeholder="Confirm your password"
required
minLength={8}
 autoComplete="new-password"
/>



  {formData.confirmPassword &&

    formData.password !== formData.confirmPassword && (

      <p className="text-sm text-red-500">

        Passwords do not match

      </p>

  )}

</div>
<div className="grid gap-2 ml-5 mr-5">
    
  <Link href='/otpVerify'> <Button type="submit" className="w-full"> SignUp </Button></Link>
{message && (
    <p className="text-green-600 text-center mt-3">
        {message}
    </p>
)}

  </div>
</div>

        </form>
</Card>
</div>


    </div>
  )
}

export default page