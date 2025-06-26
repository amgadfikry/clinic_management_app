/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import schedule from '../../assets/schedule.jpg'
import {
  useEffect, useState, useCookies, useNavigate, LoadingComponent, baseUrl, BsFillPersonFill, Link
} from '../../import'

function Appointments() {
  const [appointmentData, setAppointmentData] = useState([])
  const [cookies] = useCookies(['token_user'])
  const [serverError, setServerError] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const handleDelete = (e) => {
    fetch(`${baseUrl}/api/user/appointment/${e.target.id}`, {
      headers: {
        'Authorization': 'Bearer ' + cookies.token_user,
      },
      method: 'DELETE',
      mode: 'cors',
    }).then(response => response.json())
      .then(data => {
        const newData = appointmentData.filter(item => item.id !== e.target.id)
        setAppointmentData(newData)
      })
      .catch((error) => {
        setServerError(true)
        navigate('/server504error')
      });
  }

  useEffect(() => {
    fetch(`${baseUrl}/api/user/appointment`, {
      headers: {
        'Authorization': 'Bearer ' + cookies.token_user,
      },
      method: 'GET',
      mode: 'cors',
    }).then(response => response.json())
      .then(data => {
        setAppointmentData(data)
        setLoading(false)
      })
      .catch((error) => {
        setServerError(true)
        navigate('/server504error')
      });
  }, [])

  if (loading) {
    return <LoadingComponent />
  } else {
    return (
      <div className='container mx-auto text-dark-color' >
        <header className="relative w-full mb-5">
          <div className='  flex justify-center items-center'>
            <img className='block max-h-[200px] sm:max-h-[250px] lg:max-h-[300px] w-full object-cover rounded-b-xl overflow-hidden' src={schedule}
              alt='Image by wwwfreepikcom' />
          </div>
          <div className='absolute top-0 left-0 w-full h-full bg-teal-color bg-opacity-40 inset-0 rounded-b-xl'></div>
        </header>
        <div className='flex flex-wrap px-2 py-4 mt-12'>
          {
            appointmentData.map((item, index) => {
              return (
                <div key={item.id} className='bg-gray-color rounded-lg border border-gray-200 py-2 px-3 flex items-center
                  w-full md:w-[calc(50%-12px)] mr-0 md:mr-3 mb-4 drop-shadow-lg relative'>
                  <div className='flex-shrink-0 mr-2'>
                    {item.doctor_image
                      ? <img src={item.doctor_image} alt="doctor" className='w-[70px] h-[70px] rounded-full border' />
                      : <BsFillPersonFill className='w-[70px] h-[70px] rounded-full border text-gray-600 bg-gray-200 p-1  md:p-2' />
                    }
                  </div>
                  <div className='flex flex-col space-y-1 flex-grow'>
                    <h1 className='text-base font-bold'>{item.doctor_name}</h1>
                    <p className='text-sm'>{item.date}</p>
                    <p className='text-sm'>${item.price}</p>
                  </div>
                  <div className='flex flex-col flex-shrink-0'>
                    <button className='delete-btn mb-2' id={item.id} onClick={handleDelete}>Delete</button>
                    <div className='group relative'>
                      <Link to={`/dashboard/review/${item.doctor_name}`} className={`${!item.attend && 'pointer-events-none'}`} state={item}>
                        <button className={`review-btn ${item.attend ? '' : 'pointer-events-none opacity-40 '}`}>Review</button>
                      </Link>
                      <span className={`hidden absolute bottom-[102%] max-h-[50px] w-[80px] right-0 bg-yellow-color rounded-lg py-2 px-3 text-xs
                        whitespace-nowrap ${!item.attend && 'group-hover:block'}`}>
                        After attend</span>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}

export default Appointments