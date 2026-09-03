"use client";
import React, { useState,useEffect } from 'react' 
import { useRouter } from "next/navigation";
import { Input } from '@/components/ui/input' 
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button' 
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card' 
import { Quintessential } from 'next/font/google'


{/* for font */}
const quintessential=Quintessential({
  subsets:["latin"],
  weight:"400",
});


const page= () => {

const [otp, setOtp] = useState("");
const [otpSent, setOtpSent] = useState(false);

 const [message, setMessage] = useState("");
const [messageType, setMessageType] = useState<"success" | "error" | "">("");
const [otpVerified, setOtpVerified] = useState(false);
const [sendOtpMessage, setSendOtpMessage] = useState("");
const [verifyOtpMessage, setVerifyOtpMessage] = useState("");
const [timeLeft, setTimeLeft] = useState(0);
const [otpExpired, setOtpExpired] = useState(false);
const minutes = Math.floor(timeLeft / 60);
const seconds = timeLeft % 60;
const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=[\]{};':"\\|,.<>/~`]).{8,}$/;
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
//const [otpVerified, setOtpVerified] = useState(false);
const [newPasswordError, setNewPasswordError] = useState("");
const [confirmPasswordError, setConfirmPasswordError] = useState("");
const [otpError, setOtpError] = useState("");
const [error, setError] = useState("");
const router = useRouter();
///for time
useEffect(() => {
    if (localStorage.getItem("otpSent") === "true") {
       /* setOtpSent(true);
        setTimeLeft(Number(localStorage.getItem("timeLeft")));
        setOtpExpired(false);*/
          const sentAt = Number(localStorage.getItem("otpSentAt"));

        const remaining =
            60 - Math.floor((Date.now() - sentAt) / 1000);

        setOtpSent(true);
        setTimeLeft(Math.max(remaining, 0));
        setOtpExpired(remaining <= 0);
    }
}, []);


useEffect(() => {

   

   if (!otpSent || otpExpired) return;

    if (timeLeft <= 0) {
        setOtpExpired(true);
        return;
    }

  /*const timer = setInterval(() => {
    setTimeLeft((prev) => {

            if(prev <= 1){
                setOtpExpired(true);
                return 0;
            }

            return prev - 1;
        });

  
}, 1000);
 return () => clearInterval(timer); */
  const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);

}, [timeLeft,otpSent,otpExpired]);


const verifyOTP = async () => {
  const email = localStorage.getItem("email");
try {
  const res = await fetch("http://localhost:4000/verify-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      otp,
    }),
  });

  const data = await res.json();
   if (res.ok) {
            setOtpError("");
            setOtpVerified(true);
            //for hide
            setTimeLeft(0);
             router.push("/passStorePage");
setOtpSent(false);
            setVerifyOtpMessage(data.message);
            setMessageType("success");
            setOtpVerified(true);
        } else {
            setOtpError("OTP mismatch. Please try again.");
            setVerifyOtpMessage(data.message);
            setMessageType("error");
        }

  
   } catch (error) {
        setVerifyOtpMessage("Something went wrong.");
        setMessageType("error");
    }
};


const resendOTP = async () => {
  const email = localStorage.getItem("email");

  await fetch("http://localhost:4000/send-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  setTimeLeft(60);
  setOtpExpired(false);
};



  return (
    <div className='h-screen w-screen'>
         <div className='bg-blue-900 w-full flex items-center justify-center py-6 px-4'>
<span  className={`${quintessential.className} text-white  text-4xl md:text-4xl text-center`}>LAB PERFORMANCE TRACKER</span>

        </div>
       
<div className='h-full flex items-center justify-center'>
    <Card className='h-80 w-100'>
        <div className="grid gap-4 w-full p-4">

  {/* OTP */}
  <div className="grid gap-2">
    <Label htmlFor="otp">Enter OTP</Label>
    <Input
       type="text"
                placeholder="Enter 6 digit OTP"
                maxLength={6}
                value={otp}
                onChange={(e)=>setOtp(e.target.value)}
                required
    />
  </div>


  
{otpError && (
    <p className="text-sm text-red-500">
        {otpError}
    </p>
   )} 
{/*timeCount*/}
{otpSent && !otpVerified && (
    <>
        {timeLeft > 0 ? (
            <p className="text-sm text-blue-600">
                OTP expires in {minutes}:{seconds.toString().padStart(2,"0")}
            </p>
        ) : (
            <p className="text-sm text-red-600">
                OTP Expired
            </p>
        )}
    </>
)}
  {/* Submit Button */}
  <Button  type="button"
                  onClick={verifyOTP} disabled={timeLeft === 0} className="w-full"   > Verify OTP </Button> 
    {message && (
      <p
          className={`text-sm mt-2 ${
              messageType === "success"
                  ? "text-green-600"
                  : "text-red-600"
          }`}
      >
          {message}
      </p>
  )}
    {/*time sesh hole abr resend kora jabe */}
   {timeLeft === 0 && (
      <Button
          type="button"
          onClick={resendOTP}
          className="w-full"
      >
          Resend OTP
      </Button>
  )}

</div>
    </Card>

</div>
    </div>
  )
}

export default page
