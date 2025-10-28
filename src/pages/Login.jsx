import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
    return (
        <div className='bg-[#dbdad7] flex justify-center items-center h-screen'>
            <div className='flex justify-center items-center h-[90%] w-full max-w-[90%] bg-white rounded'>
                <div className='h-full w-[40%] rounded relative hidden lg:block'>
                    <img src="/bg.png" className='h-full object-cover rounded' alt="background" />
                    <div className='absolute bottom-50 text-center'>
                        <p className='text-white text-[1.3rem] font-medium mb-2'>Notes App</p>
                        <p className='w-full text-white text-sm max-w-[80%] mx-auto'>The app focuses on si  mplicity, fast performance, and accessibility, enabling users to organize their ideas and important information anytime, anywhere.</p>
                    </div>
                </div>
                <div className='h-full w-full flex flex-col items-center justify-between flex-1 p-4'>
                    <div className='w-full '>
                        <div className='text-[#f9a51b] font-medium'>The Notes</div>
                    </div>
                    <form className='flex w-full flex-col gap-4 justify-center items-center md:max-w-[50%]'>
                        <div className='text-center flex flex-col gap-1'>
                            <p className='text-[#292929] md:text-[1.2rem] font-medium'>Welcome Back to Notes App</p>
                            <p className='text-xs md:text-[.8rem] text-[#292929]'>Please Enter your Details to signin to your Account</p>
                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="email" className='text-[#292929] text-sm'>Email</label>
                            <input id='email' type="email" className='border border-[#d1d1d1] rounded-md py-1 px-3 outline-none placeholder:text-sm' placeholder='usman@gmail.com' />
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="password" className='text-[#292929] text-sm'>Password</label>
                            <input id='password' type="password" className='border border-[#d1d1d1] rounded-md py-1 px-3 outline-none placeholder:text-sm' placeholder='********' />
                        </div>

                        <button className='bg-[#f9a51b] text-sm text-white w-full py-3 rounded-md cursor-pointer font-medium border border-[#fff0e0]'>Login</button>
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