/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  useState, PiStethoscopeBold, useEffect, useCookies, baseUrl, useNavigate
} from '../../import'

function Selectspeciality({ specialityValue, setSpecialityValue, error, setSpeciality, speciality, setSpecialityPrice }) {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [specialityList, setSpecialityList] = useState([])
  const [serverError, setServerError] = useState(false)
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu)
  }

  const handleSpecialitySelect = (e) => {
    setSpecialityValue({
      ...specialityValue,
      'speciality_id': e.target.id
    })
    setSpeciality(e.target.innerText)
    if (setSpecialityPrice !== '') {
      setSpecialityPrice(e.target.getAttribute('data'))
    }
    setToggleMenu(false)
  }

  const handleChange = () => {
    setSpeciality(speciality)
  }

  useEffect(() => {
    fetch(`${baseUrl}/api/admin/speciality`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
      },
      mode: 'cors'
    }).then(response => response.json())
      .then(data => setSpecialityList(data))
      .catch((error) => {
        setServerError(true)
        navigate('/server504error')
      });
  }, [])

  return (
    <div className='flex flex-col space-y-1 w-full shrink-0 md:w-[calc(50%-12px)] flex-grow lg:flex-grow-0
      md:mr-3 relative' onClick={handleToggleMenu}>
      <label htmlFor='select' className='text-sm pl-1 text-bold'>Select speciality</label>
      <input type='text' name='select' id='select' readOnly
        className='border border-gray-300 py-2 px-3 rounded-md focus:outline-0  focus:border-gray-400
        cursor-pointer' placeholder='Choose Speciality' value={speciality} onChange={handleChange} />
      <span className='text-xs text-red-500 pl-1 h-2'>{error.speciality_id}</span>
      <ul className={`absolute w-full border bg-white rounded-b-lg top-[81%] left-0 overflow-x-hidden text-center md:text-left
        ${toggleMenu ? 'block' : 'hidden'} max-h-[200px] overflow-y-auto z-10 pointer-events-auto`}>
        {
          specialityList.map(speciality => (
            <li key={speciality.id} name={speciality.name} id={speciality.id} data={speciality.price}
              className='border-b hover:bg-teal-color hover:text-white cursor-pointer px-4 py-2'
              onClick={(e) => handleSpecialitySelect(e)} >{speciality.name}</li>
          ))
        }
        <li className='border-b hover:bg-teal-color hover:text-white cursor-pointer px-4 py-2'
          onClick={() => navigate('/dashboard/specialities/create')} >+ Add new Speciality</li>
      </ul>
    </div>

  )
}

export default Selectspeciality