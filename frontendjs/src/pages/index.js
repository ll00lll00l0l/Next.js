import Link from 'next/link'
import React from 'react'
import { FaArrowRight } from "react-icons/fa";


export default function index() {
  return (
    <div className='flex flex-col p-20'>
      <Link href="/test" className='flex flex-row gap-2 items-center'><FaArrowRight size={10} color={"blue"}/>Test</Link>
      <Link href="/Shadui" className='flex flex-row gap-2  items-center'><FaArrowRight size={10} color={"blue"}/>shadCN</Link>
    </div>
  )
}
