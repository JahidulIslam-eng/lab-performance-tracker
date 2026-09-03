'use client'
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






const page = () => {

  const [email, setEmail] = useState("");
const [otp, setOtp] = useState("");
const [otpSent, setOtpSent] = useState(false);
const [loading, setLoading] = useState(false);
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
const [passwordError, setPasswordError] = useState("");
const [formData, setFormData] = useState({
   password: "",
    confirmPassword: ""
});
const router = useRouter();



//password condition
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { id, value } = e.target;

    setFormData((prev)=>({
        ...prev,
        [id]: value
    }));


    if(id === "password") {

        if(value === "") {
            setPasswordError("");
        }
        else if(!passwordRegex.test(value)) {
            setPasswordError(
                "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
            );
        }
        else {
            setPasswordError("");
        }


        if(formData.confirmPassword && formData.confirmPassword !== value){
            setConfirmPasswordError("Passwords do not match.");
        }
        else{
            setConfirmPasswordError("");
        }

    }


    if(id === "confirmPassword") {

        if(value !== formData.password){
            setConfirmPasswordError("Passwords do not match.");
        }
        else{
            setConfirmPasswordError("");
        }

    }

};


//send OTP
const sendOTP = async () => {
    try {
        setLoading(true);

        const res = await fetch("http://localhost:4000/send-otp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
            }),
        });

        const data = await res.json();

        if (res.ok) {
            setOtpSent(true);
    setTimeLeft(60);      // 5 minutes
    setOtpExpired(false);
            setSendOtpMessage(data.message);
            setMessageType("success");
        } else {
            setSendOtpMessage(data.message);
            setMessageType("error");
        }
    } catch (error) {
        setSendOtpMessage("Something went wrong. Please try again.");
        setMessageType("error");
    } finally {
        setLoading(false);
    }
};

//verify OTP
const verifyOTP = async () => {
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

//timeCount
useEffect(() => {
   if(timeLeft <= 0){
        if(otpSent){
            setOtpExpired(true);
        }
        return;
    }


    const timer = setInterval(() => {

        setTimeLeft((prev) => {

            if(prev <= 1){
                setOtpExpired(true);
                return 0;
            }

            return prev - 1;
        });

    }, 1000);


    return () => clearInterval(timer); 

}, [timeLeft]);


//new Password save
const resetPassword = async () => {
 console.log("reset button clicked");
    try {

        const res = await fetch("http://localhost:4000/reset-password", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email: email,
                password: formData.password
            })
        });


        const data = await res.json();

        if(res.ok){
setMessage("Password Changed Successfully");
router.push("/loginPage");
            console.log(data.message);
             setFormData({
        password: "",
        confirmPassword: ""
    });

        }
        else{
            console.log(data.message);
        }

    } catch(error){
        console.log(error);
    }

};

return (
    <div className='h-screen w-screen'>
        <div className='bg-blue-900 w-full flex items-center justify-center py-6 px-4'>
<span  className={`${quintessential.className} text-white  text-4xl md:text-4xl text-center`}>LAB PERFORMANCE TRACKER</span>

        </div>
<div className='h-screen w-screen flex items-center justify-center'>

<div className='flex flex-col gap-15'>

{/*OTP er jonno send */}
<div className="grid gap-2 ml-5 mr-5 h-25 w-100 ">
    <Label htmlFor="">FOR OTP</Label>
    <Label htmlFor="email">Enter Your Email</Label>

<Input
  
  type="email"
  placeholder="Enter your email"
  required
  autoComplete="username"
  value={email}
  onChange={(e)=>setEmail(e.target.value)}
  title="Enter a valid email address"
/>
 <Button
  type="button" className="w-full" onClick={sendOTP}
        disabled={loading}  > {loading ? "Sending..." : "Send OTP"} </Button>
  </div>

  {/*OTP match */}
<div className="grid gap-2 ml-5 mr-5 h-10 w-100 ">
    
    <Label htmlFor="login">Enter Your OTP</Label>


            <Input
                type="text"
                placeholder="Enter 6 digit OTP"
                maxLength={6}
                value={otp}
                onChange={(e)=>setOtp(e.target.value)}
                required
            />
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
        onClick={sendOTP}
        className="w-full"
    >
        Resend OTP
    </Button>
)}

</div>
</div>

 {/*new password */}


    
<Card className="h-80 w-100">

    <div className="grid gap-4 w-full p-4">

        {otpVerified && (
            <>
                <div className="grid gap-2">
                    <Label htmlFor="password">
                       New Password
                    </Label>

                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter New password"
                        minLength={8}
                         required
                        />
                        {passwordError && (
        <p className="text-sm text-red-500">
            {passwordError}
        </p>
    )}
                </div>


                <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">
                        Confirm Password
                    </Label>

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
                     {confirmPasswordError && (
        <p className="text-sm text-red-500">
            {confirmPasswordError}
        </p>
    )}

                </div>


                <Button 
                    className="w-full"
                    onClick={resetPassword}
                >
                    Save
                </Button>
                {message && (
    <p className="text-green-600 text-center mt-3">
        {message}
    </p>
)}
            </>
        )}

    </div>

</Card>




 </div>

    </div>
  )
}

export default page
