/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  PiStethoscopeBold, useState, useEffect, useCookies, baseUrl
} from '../import'

function SelectDiv({ specialityValue, setSpecialityValue }) {
  const [specialityMenu, setSpecialityMenu] = useState(false)
  const [specialityList, setSpecialityList] = useState([])
  const [serverError, setServerError] = useState(false)
  const [cookies, setCookie] = useCookies(['token'])


  const handleSpecialityMenu = () => {
    setSpecialityMenu(!specialityMenu)
  }
  const handleSpecialitySelect = (e) => {
    setSpecialityValue(e.target.id)
    setSpecialityMenu(false)
  }

  useEffect(() => {
    fetch(`${baseUrl}/api/public/speciality`, {
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
      },
      method: 'GET',
      mode: 'cors',
    }).then(response => response.json())
      .then(data => {
        setSpecialityList(data)
      })
      .catch((error) => {
        setServerError(true)
      });
  }, [])

  return (
    <div className='flex flex-row  items-center border rounded-lg p-2 text-dark-color relative cursor-pointer z-30
      md:rounded-l-lg md:rounded-r-none md:flex-grow' onClick={handleSpecialityMenu} >
      <PiStethoscopeBold className=' text-teal-color font-[500] text-[30px] mr-3 pointer-event-none' />
      <div className='flex flex-col flex-grow pointer-event-none' >
        <div className='text-teal-color text-lg font-light mb-1 pointer-event-none cursor-pointer'>Select Speciality</div>
        <input type='text' name='speciality' id='speciality' value={specialityValue} readOnly placeholder='Choose Speciality'
          className='text-center focus:outline-0 active:outline-0 pointer-event-none cursor-pointer placeholder:text-dark-color' />
        <ul className={`absolute w-full border bg-white rounded-b-lg top-[103%] left-0 overflow-hidden text-center md:text-left
          ${specialityMenu ? 'block' : 'hidden'} max-h-[200px] overflow-y-scroll z-30 pointer-events-auto`}>
          <li className='border-b hover:bg-teal-color hover:text-white cursor-pointer px-4 py-2'
            onClick={(e) => handleSpecialitySelect(e)} id='' >All</li>
          {
            specialityList.map((speciality) => (
              <li className='border-b hover:bg-teal-color hover:text-white cursor-pointer px-4 py-2'
                onClick={(e) => handleSpecialitySelect(e)} key={speciality.id} id={speciality.name}>{speciality.name}</li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default SelectDiv