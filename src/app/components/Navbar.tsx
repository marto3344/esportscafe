"use client";
import React, { useState } from 'react'
import Link from 'next/link'
import {FiMenu} from 'react-icons/fi'

function Navbar() {
  const [open,setOpen]= useState(false)
  return (
    <React.Fragment>
      <header className="border-b border-gray-300 py-2 shadow-2xl lg:m-10 lg:rounded-md">
       <div className='flex justify-between items-center xl:max-w-7xl xl:mx-auto max-w-full px-[8%] flex-wrap w-full '>
        <h1 className=' font-bold'>
          <Link href={'/'}>
           EsportsCafe
          </Link>
        
        </h1>
        <FiMenu className='lg:hidden block h-6 w-6 cursor-pointer' onClick={()=>setOpen(!open)}/>
       <nav className={`${open?"block":"hidden"} lg:flex lg:items-center lg:w-auto w-full`}>
         <ul className='text-base text-gray-600 lg:flex lg:justify-between'>
            <li>   
                <Link href={"/"} legacyBehavior ><a className='lg:px-5 py-2 block hover:text-blue-700 font-semibold'>Home</a></Link>
            </li>
            <li>   
                <Link href={"/lol"} legacyBehavior ><a className='lg:px-5 py-2 block hover:text-blue-700 font-semibold'>League of legends</a></Link>
            </li>
            <li>   
                <Link href={"/about"} legacyBehavior ><a className='lg:px-5 py-2 block hover:text-blue-700 font-semibold'>About</a></Link>
            </li>
            <li>   
                <Link href={"/contact"} legacyBehavior ><a className='lg:px-5 py-2 block hover:text-blue-700 font-semibold'>Contact us</a></Link>
            </li>
         </ul>
       </nav>
      </div>
     </header>
    </React.Fragment>
      
  )
}

export default Navbar