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
<span className='text-white'>(Student Login Page)</span>
 <Link href='/adminPage'>AdminPage</Link>
        </div>
<div className='bg-gray-300 flex-1 w-full flex flex-col items-center justify-center py-10 px-4 gap-5'>
  
<Card className='h-100 w-150 flex items-center justify-center'>
<FieldSet className="w-full max-w-sm md:max-w-md bg-gray-900 rounded p-4">
      <FieldGroup className="mt-6 px-4">
{/* Error message */}
            {error && (
              <div className="text-red-400 font-medium mb-2">{error}</div>
            )}

        <Field>
          <FieldLabel htmlFor="username" className="text-white">Roll</FieldLabel>
          <Input id="roll" type="text" placeholder="Roll Number" className="text-white w-full" value={roll}
                onChange={(e) => setRoll(e.target.value)} />
         
        </Field>
        <Field>
          <FieldLabel htmlFor="password" className="text-white">Password</FieldLabel>
         
          <Input id="password" type="password" placeholder="********" className="text-white w-full" value={password}
                onChange={(e) => setPassword(e.target.value)}/>
        </Field>
        <Button type="submit" onClick={handleLogin} className='bg-green-900 w-full mt-2'>Submit</Button>
      </FieldGroup>
    </FieldSet>


</Card>




  </div>
  

    </div>
  )
}

export default page