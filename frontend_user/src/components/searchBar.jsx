/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import {
  TbCalendarPlus, InputDiv, SelectDiv, useState
} from '../import'

function SearchBar({ data, setData, doctorsData }) {
  const [specialityValue, setSpecialityValue] = useState('')
  const [doctorName, setDoctorName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    let newData = doctorsData
    if (specialityValue) {
      newData = newData.filter((doctor) => doctor.speciality === specialityValue)
    }
    if (doctorName) {
      newData = newData.filter((doctor) => doctor.full_name.toLowerCase().includes(doctorName.toLowerCase()))
    }
    setData(newData)
  }

  return (
    <div className="container mx-auto bg-white drop-shadow-lg rounded-lg py-3 relative z-40">
      <div className='flex items-center justify-center text-teal-color border-b pb-3'>
        <TbCalendarPlus className='font-[500] text-5xl mr-3' />
        <div className=''>
          <h3 className='font-[500] text-xl'>Book a doctor</h3>
          <p className='font-[300] text-sm'>Examination or procedure</p>
        </div>
      </div>
      <form className='flex flex-col p-3 space-y-3 md:flex-row md:space-y-0' onSubmit={handleSubmit}>
        <SelectDiv className='md:flex-1' specialityValue={specialityValue} setSpecialityValue={setSpecialityValue} />
        <InputDiv className='md:flex-1' doctorName={doctorName} setDoctorName={setDoctorName} />
        <button type='submit' className='bg-teal-color text-white py-2 rounded-lg  md:rounded-l-none md:flex-grow
        font-[500] text-lg hover:bg-yellow-color hover:text-dark-color transition-all duration-300'>Search</button>
      </form>
    </div>
  )
}

export default SearchBar