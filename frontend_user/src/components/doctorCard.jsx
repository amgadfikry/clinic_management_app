/* eslint-disable react/prop-types */
import {
  BsFillPersonFill, Stars, FaMoneyBill1Wave, PiStethoscopeBold, PiIdentificationCard, DoctorDateMonthly
} from '../import'

function DoctorCard({ doctor }) {

  return (
    <div className="flex-1 rounded-xl overflow-hidden drop-shadow-lg mb-3 bg-white py-4 px-2 text-dark-color flex flex-col md:flex-row">
      <div className='flex items-start md:flex-grow lg:max-w-[60%] lg:mr-auto'>
        <div className='mr-2 flex-shrink-0'>
          {doctor.image
            ? <img src={doctor.image} alt='profile photo for doctor'
              className='w-[80px] h-[80px] overflow-hidden rounded-full' />
            : <BsFillPersonFill className='w-[80px] h-[80px] text-gray-600 bg-gray-200 p-1 rounded-full' />
          }
        </div>
        <div className="  flex-grow">
          <div className="font-bold text-xl text-teal-color">{doctor.full_name}</div>
          <p className='text-sm font-light '>{doctor.details}</p>
          <div className="">
            <Stars starsNumber={doctor.stars} />
          </div>
          <p className="text-gray-700 text-base flex items-center mt-1">
            <PiIdentificationCard className=' border-b border-yellow-color text-teal-color mr-2' />{doctor.title}
          </p>
          <p className="text-gray-700 text-base flex items-center">
            <PiStethoscopeBold className=' border-b border-yellow-color text-teal-color mr-2' />{doctor.speciality}
          </p>
          <p className="text-gray-700 text-base flex items-center">
            <FaMoneyBill1Wave className=' border-b border-yellow-color text-teal-color mr-2' />{doctor.price}
          </p>
        </div>
      </div>
      <div className='flex-shrink-0 flex justify-center items-center'>
        <DoctorDateMonthly times={doctor.all_times} doctor={doctor} />
      </div>
    </div>
  );
}

export default DoctorCard