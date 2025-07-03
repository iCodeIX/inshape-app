import React from 'react'

const AdminPanel = () => {
    return (
        <div className='flex flex-col gap-2 p-2 items-center'>
            <p className='font-semibold'>ADMIN PANEL</p>
            <p className='italic'>Manage</p>
            <button className='bg-green-500 text-white  hover:bg-green-400 w-[200px] h-[30px] cursor-pointer'>Orders</button>
            <button className='bg-sky-500 text-white hover:bg-sky-400 w-[200px] h-[30px] cursor-pointer'>Products</button>
        </div>
    )
}

export default AdminPanel
