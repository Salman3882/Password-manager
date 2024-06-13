import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-zinc-800 text-white flex justify-around items-center  border-b-[3px]  border-[#4f81c7] shadow-lg'>

        <div className="logo px-4 flex   text-[2rem] ">
            <div className='text-[#4f81c7] font-bold'>&lt;</div>
            Pass
            <div className='text-[#4f81c7] font-bold'> OP/&gt;</div>
            </div>
        <ul className='flex gap-5 px-4'>
            <li><a  className=' hover:text-[#4f81c7] transition-all' href="/">Home</a></li>
            <li><a  className=' hover:text-[#4f81c7] transition-all' href="">About us</a></li>
        </ul>
    </nav>
)
}

export default Navbar