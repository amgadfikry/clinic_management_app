/* eslint-disable no-unused-vars */
import booking from '../../assets/booking.jpg'
import {
  useLocation, BsFillPersonFill, Stars, FaMoneyBill1Wave, AiOutlineSchedule, BsBriefcase, useNavigate, baseUrl, useCookies, useState
} from '../../import'

function MakeAppointment() {
  const location = useLocation()
  const doctorData = location.state[0]
  const date = location.state[1]
  const navigate = useNavigate()
  const [cookies] = useCookies(['token_user'])
  const [serverError, setServerError] = useState(false)

  const handleCancel = () => {
    navigate(-1)
  }

  const handleConfirm = () => {
    const appointmentData = { 'doctor_id': doctorData.id, 'date': date, 'price': doctorData.price, 'attend': false }
    fetch(`${baseUrl}/api/user/appointment`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + cookies.token_user,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(appointmentData),
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        navigate('/dashboard/appointments')
      })
      .catch((error) => {
        setServerError(true)
        navigate('/server504error')
      });
  }

  return (
    <div className='container mx-auto mb-12' >
      <header className="relative w-full mb-12">
        <div className='  flex justify-center items-center'>
          <img className='block max-h-[200px] sm:max-h-[250px] lg:max-h-[300px] w-full object-cover rounded-b-xl overflow-hidden' src={booking}
            alt='Image by wwwfreepikcom' />
        </div>
      </header>
      <div className='w-full flex flex-col items-center text-dark-color'>
        <div className='flex flex-col py-8 px-3 bg-gray-color border border-gray-200 shadow-xl rounded-lg w-[80%] md:w[70%]
        lg:w-[60%] items-center'>
          <div className='mb-1'>
            {doctorData.image
              ? <img src={doctorData.image} alt="admin" className='rounded-lg w-[200px] h-[200px' />
              : <BsFillPersonFill className='rounded-lg w-[200px] h-[200px] text-gray-600 bg-gray-200 p-1  md:p-2 ' />
            }
          </div>
          <p className='text-teal-color text-2xl font-bold'>{doctorData.full_name}</p>
          <p className=' text-gray-300'>{doctorData.title} / {doctorData.speciality}</p>
          <div className="">
            <Stars starsNumber={doctorData.stars} />
          </div>
          <div className='flex mt-3 space-x-12 '>
            <div className='w-[calc(50%-12px)] items-center flex flex-col'>
              <FaMoneyBill1Wave className='text-teal-color text-2xl mb-1' />
              <p className='text-lg'>${doctorData.price}</p>
            </div>
            <div className='w-[calc(50%-12px)] items-center flex flex-col'>
              <AiOutlineSchedule className='text-teal-color text-2xl mb-1' />
              <p className='text-lg'>{doctorData.price}</p>
            </div>
          </div>
          <div className='border-t w-full py-5 mt-5'>
            <div className='w-full items-center flex flex-col'>
              <BsBriefcase className='text-teal-color text-3xl mb-2' />
              <p className='text-sm text-gray-400'>{doctorData.details}</p>
            </div>
          </div>
          <div className='flex items-center justify-center space-x-4 mt-5 border-t pt-5 w-full'>
            <button onClick={handleCancel}
              className='border border-teal-color rounded-3xl px-4 py-1 text-teal-color font-medium cursor-pointer
            hover:bg-dark-color hover:border-dark-color hover:text-white transition-all duration-300'>Cancel</button>
            <button
              className='border border-teal-color rounded-3xl px-4 py-1 text-white font-medium cursor-pointer
            hover:bg-dark-color hover:border-dark-color hover:text-white transition-all duration-300 
            bg-teal-color' onClick={handleConfirm}>Confirm Booking</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MakeAppointment