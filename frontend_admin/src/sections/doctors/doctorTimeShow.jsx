/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useCookies, baseUrl, useNavigate } from '../../import'

function DoctorTimeShow({ times, id }) {
  const [allTimes, setAllTimes] = useState(times)
  const [serverError, setServerError] = useState(false)
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()

  const deleteTime = (e) => {
    const newLi = allTimes.filter(el => el.id !== e.target.id)
    setAllTimes(newLi)
    fetch(`${baseUrl}/api/admin/doctor/times/${id}/${e.target.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
      },
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        const newLi = allTimes.filter(el => el.id !== e.target.id)
        setAllTimes(newLi)
      })
      .catch((error) => {
        setServerError(true)
        navigate('/server504error')
      });
  }

  return (
    <div className={`bg-white rounded-lg min-h-[100px] md:min-h-[100%] w-full border md:w-1/2 border-gray-300 p-2 flex
      ${allTimes.length > 0 && 'flex-col'} mt-4 md:mt-0 justify-center items-center space-y-2`}>
      {allTimes.length > 0
        ? allTimes.map(el => (
          <div className='bg-gray-200 flex w-full justify-between px-3 py-1 rounded-lg h-fit' key={el.id}>
            <p>{el.day} from {el.start < 10 ? '0' + el.start + ':00' : el.start + ':00'} to {el.end < 10 ? '0' + el.end + ':00' : el.end + ':00'}</p>
            <span className='text-sm text-red-500 cursor-pointer' id={el.id} onClick={deleteTime}>Del</span>
          </div>
        ))
        : <span className='text-gray-300 text-lg font-bold text-center '>No time selected</span>
      }
    </div>
  )
}

export default DoctorTimeShow