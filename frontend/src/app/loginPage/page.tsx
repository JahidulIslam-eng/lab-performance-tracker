"use client"
import  { useState } from 'react'
import { Quintessential } from 'next/font/google'
import React from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Image from 'next/image'

import { FacebookIcon, FacebookMessengerIcon } from 'react-share'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

{/* for font */}
const quintessential=Quintessential({
  subsets:["latin"],
  weight:"400",
});

const page = () => {


const [roll, setRoll] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!roll || !password) {
      setError("Please enter roll and password");
      return;
    }
try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roll, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      
      localStorage.setItem("roll", data.roll);

      
      router.push("/studentpage");

    } catch (err) {
      setError("Network error! Please check if server is running.");
    }
  };



  return (
    <div className='min-h-screen flex flex-col'>
        <div className='bg-blue-900 w-full flex items-center justify-center py-6 px-4'>
<span  className={`${quintessential.className} text-white  text-4xl md:text-4xl text-center`}>LAB PERFORMANCE TRACKER</span>
 <Link href='/adminPage'>AdminPage</Link>
        </div>
<div className='bg-gray-300 flex-1 w-full flex flex-col items-center justify-center py-10 px-4 gap-5'>
  
<Card className='h-40 w-80 flex items-center justify-center'>
<span className='text-2xl'><Link href='/adminLoginPage'>Admin Panel</Link></span>

</Card>
<Card className='h-40 w-80 flex items-center justify-center'>
<span className='text-2xl'><Link href='/teacherLoginPage'>Teacher Panel</Link></span>


</Card>

<Card className='h-40 w-80 flex items-center justify-center'>
<span className='text-2xl'><Link href='/studentLoginPage'>Student Panel</Link></span>


</Card>




  </div>
  

    </div>
  )
}

export default page