import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const loginHandler = async (e) => {
        e.preventDefault();

        try {
            if (!email || !password) {
                setIsError(true);
                setError("Required fileds Should not be Empty");
                setTimeout(() => {
                    setIsError(false);
                    setError("");
                }, 5000)
                return
            }

            const userObj = {
                email,
                password,
            }

            const url = `http://localhost:5000/login`;
            const response = await axios.post(url, userObj);
            console.log(response);

            if (response.data.status === false) {
                setIsError(true);
                setError(response.data.message);
                setTimeout(() => {
                    setIsError(false);
                    setError("");
                }, 5000)
                return
            }

            setIsSuccess(true);
            setIsError(true)
            setError(response.data.message);
            setTimeout(() => {
                setIsError(false)
                setIsSuccess(false);
                setError("");
                localStorage.setItem('token', response.data.token);
                navigate('/dashboard');
            }, 3000)
        } catch (error) {
            setIsError(true);
            setError(error.message);
            setTimeout(() => {
                setIsError(false);
                setError("");
            }, 5000)
            return
        }

    }


    return (
        <div className='bg-[#dbdad7] flex justify-center items-center h-screen '>

            <div className='flex justify-center items-center h-[90%] w-full max-w-[90%] bg-white rounded'>
                <div className='h-full w-[40%] rounded relative hidden lg:block'>
                    <img src="/bg.png" className='h-full object-cover rounded' alt="background" />
                    <div className='absolute bottom-50 text-center'>
                        <p className='text-white text-[1.3rem] font-medium mb-2'>Notes App</p>
                        <p className='w-full text-white text-sm max-w-[80%] mx-auto'>The app focuses on si  mplicity, fast performance, and accessibility, enabling users to organize their ideas and important information anytime, anywhere.</p>
                    </div>
                </div>
                <div className='h-full w-full flex flex-col items-center justify-center gap-6 flex-1 p-4 relative'>
                    {isError && <div className='absolute text-xs font-medium md:text-sm text-[#292929] bg-white border max-w-[95%] px-3 md:px-4 py-2 rounded-md border-[#e9e9e9] top-4 flex gap-1 items-center justify-center'>
                        {isSuccess === true ? (<span>
                            <svg className='w-4 text-green-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path></svg>
                        </span>) : (<span>
                            <svg className='w-4 text-[#ff323b]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"></path></svg>
                        </span>)}
                        {error}
                    </div>}
                    <form className='flex w-full flex-col gap-4 justify-center items-center md:max-w-[50%]'>
                        <div className='text-center flex flex-col gap-1'>
                            <p className='text-[#292929] md:text-[1.2rem] font-medium'>Welcome Back to Notes App</p>
                            <p className='text-xs md:text-[.8rem] text-[#292929]'>Please Enter your Details to signin to your Account</p>
                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="email" className='text-[#292929] text-sm'>Email</label>
                            <input id='email' onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='border border-[#d1d1d1] rounded-md text-sm text-[#292929] py-1 px-3 outline-none placeholder:text-sm' placeholder='usman@gmail.com' />
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="password" className='text-[#292929] text-sm'>Password</label>
                            <input id='password' onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='border border-[#d1d1d1] text-sm text-[#292929] rounded-md py-1 px-3 outline-none placeholder:text-sm' placeholder='********' />
                        </div>

                        <button onClick={loginHandler} className='bg-[#f9a51b] text-sm text-white w-full py-3 rounded-md cursor-pointer font-medium border border-[#fff0e0]'>Login</button>
                    </form>
                    <div className='w-full'>
                        <p className='text-xs md:text-sm text-[#292929] text-center w-full'>Don't have an Account? <Link to={'/'} className='text-[#f9a51b]'>Signup</Link ></p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Login