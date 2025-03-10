import React from 'react'
import imageDown from '../assets/addinvImg.png'
import pencil from '../assets/pencil.png'

const AddInventory = () => {
  return (
    <>
      <div className='flex flex-col items-center m-4 justify-center'>
        <div className='text-[#5A67BA] text-3xl font-semibold mb-8'>
          <div>Add Inventory</div>
        </div>

        <div className='w-[560px] h-[500px] bg-[#5A67BA] bg-opacity-20 p-8 rounded-3xl'>
          <div className='flex items-center justify-center'>
            <div className='flex flex-row'>
              <div className='items-center flex flex-row justify-center'>
                <img src={imageDown} alt="IMAGE DOWN" className='mr-4' />
              </div>
              <div className='font-sans text-[#5A67BA] text-2xl font-semibold'>
                CATEGORY
              </div>
            </div>
          </div>

          <div className='flex flex-col space-y-8 mt-8 items-center'>
            <div className='relative w-1/2'>
              <input 
                type="text" 
                className='p-4 pr-12 w-full rounded-xl border-gray-300 border-2 shadow-sm' 
                placeholder='ITEM NAME'
              />
              <img 
                src={pencil} 
                alt="Edit" 
                className='absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-50'
              />
            </div>

            <div className='relative w-1/2'>
              <input 
                type="text" 
                className='p-4 pr-12 w-full rounded-xl border-gray-300 border-2 shadow-sm' 
                placeholder='ADD QTY'
              />
              <img 
                src={pencil} 
                alt="Edit" 
                className='absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5  opacity-50'
              />
            </div>

            <div className='relative w-1/2'>
              <input 
                type="text" 
                className='p-4 pr-12 w-full rounded-xl border-gray-300 border-2 shadow-sm' 
                placeholder='COST PER UNIT'
              />
              <img 
                src={pencil} 
                alt="Edit" 
                className='absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5  opacity-50'
              />
            </div>
          </div>

          <div className='text-white text-lg font-semibold mt-12'>
            <button className='bg-[#5A67BA] px-8 py-2 rounded-full'>Save</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddInventory