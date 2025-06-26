/* eslint-disable react/prop-types */
import {
  FaUserNurse, useRef
} from '../import'

function InputDiv({ doctorName, setDoctorName }) {
  const input = useRef(null)

  return (
    <div className='flex flex-row  items-center border rounded-lg p-2 text-dark-color relative cursor-text
      md:rounded-none border-l-0 border-r-0 md:flex-grow'onClick={() => input.current.focus()}>
      <FaUserNurse className=' text-teal-color font-[500] text-[30px] mr-3 pointer-events-none' />
      <div className='flex flex-col flex-grow pointer-events-none'>
        <label htmlFor='doctor' className='text-teal-color text-lg font-light mb-1 pointer-events-none' >Search by name</label>
        <input type='text' name='doctor' id='doctor' value={doctorName} placeholder='Enter doctor name'
          onChange={(e) => setDoctorName(e.target.value)} ref={input}
          className='text-center focus:outline-0 active:outline-0 placeholder:text-dark-color pointer-events-none' />
      </div>
    </div>
  )
}

export default InputDiv