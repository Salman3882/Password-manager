import React from 'react'
import '../App.css'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


import 'react-toastify/dist/ReactToastify.css';
const Manager = () => {
    const ref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordType, setpasswordType] = useState('text')
    const [passwordArray, setpasswordArray] = useState([])
    const show = '/eye.png';
    const hide = '/hidden.png'

    useEffect(() => {
        let passwords = localStorage.getItem('passwords')
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])

    const showPassword = () => {
        if (ref.current.src.includes(show)) {
            ref.current.src = hide
            setpasswordType('password')
        }
        else {
            ref.current.src = show
            setpasswordType('text')
        }
    }
    const savePassword = () => {
        if (!form.site || !form.username || !form.password) {
            toast.error('Please fill in all fields', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        setpasswordArray([...passwordArray, {...form,id:uuidv4()}])
        
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]))
        console.log([...passwordArray, form])

        setform({ site: "", username: "", password: "" })
        toast.success('Password saved successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    }
    const deletePassword = (id)=>{
        console.log('deleting password with id:' , id)
        let c = confirm("Do you really want to delete this password")
        if(c){
        setpasswordArray(passwordArray.filter(item=>item.id!==id))
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id) ))
        toast.success('Password deleted', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
        
        }
        const editPassword = (id)=>{
        console.log('editing password with id:' , id)
        setform(passwordArray.filter(item=>item.id===id)[0])
        setpasswordArray(passwordArray.filter(item=>item.id!==id))


    }
    const handleChange = (e) => {

        setform({ ...form, [e.target.name]: [e.target.value] })
        


    }
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
        toast.success('Text copied to clipbboard', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={14}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute top-0 -z-10 h-full w-full bg-white"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-sky-200 opacity-50 blur-[80px]"></div>
            </div>
            <div className="  items-center flex flex-col my-10 px-5  ">
                <div className="head text-center">
                    <div className="flex justify-center  text-[2rem] ">
                        <div className='text-[#4f81c7] font-bold'>&lt;</div>
                        Pass
                        <div className='text-[#4f81c7] font-bold'> OP/&gt;</div>
                    </div>
                    <div className="text-[#4f81c7]">Your own password manager</div>
                </div>
                <div className="flex flex-col py-4 w-full max-w-4xl mx-10  lg:mx-auto items-center  text-[0.6rem]">
                    <input autocomplete="off" type="text" className='my-5  p-2 w-full rounded-full border border-[#4fB1c7]  focus:outline-[2px] focus:outline-[#4fB1c7]' required placeholder='Enter the website URL' name='site' value={form.site} onChange={handleChange} />
                    <div className='flex gap-x-6 w-full'>
                        <input autocomplete="off" type="text" className='rounded-full p-2 w-1/2 border border-[#4fB1c7] focus:outline-[2px] focus:outline-[#4fB1c7]' required placeholder='Enter username' name='username' value={form.username} onChange={handleChange} />
                        <div className="relative w-1/2">
                            <input autocomplete="off" type={passwordType} className='rounded-full p-2 w-full border relative border-[#4fB1c7]  focus:outline-[2px] focus:outline-[#4fB1c7] ' required placeholder='Enter password' name='password' value={form.password} onChange={handleChange} />
                            <span className="absolute top-[2px] right-[2px]" onClick={showPassword} >
                                <img ref={ref} src="/public/eye.png" className='p-1' width={26} alt="" />
                            </span>
                        </div>
                    </div>
                </div>
                <button onClick={savePassword} onSubmit={savePassword} className="flex items-center justify-center rounded-full bg-sky-600  gap-2 border-none py-1 px-4 transition-all hover:bg-sky-500">
                    <lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover"
                        className="w-[100px] h-[100px]"
                    >
                    </lord-icon>
                    Add Password
                </button>

                <div className="passwords mt-5 w-full max-w-4xl mx-10  lg:mx-auto ">
                    <h1 className='font-bold text-sky-600 py-5'>Your Passwords</h1>
                    {passwordArray.length == 0 ? <div>No passwords to show</div> :
                        <table className="table-fixed w-full py-5 text-sm lg:text-md text-center">
                            <thead className='bg-sky-600 text-white'>
                                <tr>
                                    <th>Website URL</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className=' bg-blue-200 text-center'>
                                {
                                    passwordArray.map((item, index) => {
                                        return <tr key={index} className='border'>
                                            <td className=''><a href={item.site} target='_blank'>
                                                {
                                                    item.site.length < 20 ? item.site : item.site.slice(0, 20) + "..."

                                                }
                                            </a>
                                                <span className='mx-2 ' onClick={() => { copyToClipboard(item.site) }}>

                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/omiqopzf.json"
                                                        trigger="hover"
                                                        style={{ "height": "20px", "width": "20px", "paddingTop": "4px" }}
                                                    >
                                                    </lord-icon>
                                                </span>
                                            </td>
                                            <td className=''>{item.username}
                                                <span className='mx-2 ' onClick={() => { copyToClipboard(item.username) }}>

                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/omiqopzf.json"
                                                        trigger="hover"
                                                        style={{ "height": "20px", "width": "20px", "paddingTop": "4px" }}
                                                    >
                                                    </lord-icon>
                                                </span>
                                            </td>
                                            <td className=''>{
                                
                                                '*'.repeat(item.password.length)
                                            }
                                                <span className='mx-2 ' onClick={() => { copyToClipboard(item.password) }}>

                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/omiqopzf.json"
                                                        trigger="hover"
                                                        style={{ "height": "20px", "width": "20px", "paddingTop": "4px" }}
                                                    >
                                                    </lord-icon>
                                                </span>
                                            </td>
                                            <td className='flex items-center justify-center'>
                                             

                                                        <img 
                                                        src="/public/icons8-edit-50.png" 
                                                        alt="" 
                                                        style={{ "height": "20px", "width": "20px", "paddingTop": "8px" }}
                                                        onClick={()=>{editPassword(item.id)}}
                                                        />
                                                <span className='mx-1 ' onClick={()=>{deletePassword(item.id)}}> 

                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                        style={{ "height": "20px", "width": "20px", "paddingTop": "4px" }}
                                                    >
                                                    </lord-icon>
                                                </span>
                                            </td>
                               

                                        </tr>
                                    })

                                }


                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager