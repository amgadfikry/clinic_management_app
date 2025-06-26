/* eslint-disable react/prop-types */
import { FaEyeSlash, FaEye, Stars } from '../../import'

function DetailsTestimonial({ detailsData, setDetailsData, setSeeDetails }) {
  const handleClose = () => {
    setSeeDetails(false)
    setDetailsData({})
  }

  return (
    <div className="absolute z-10 top-[20%] flex justify-center pb-12">
      <div className="bg-gray-200 rounded-lg w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] flex
        flex-col overflow-hidden  text-dark-color relative">
        <div className='w-full relative flex justify-center items-center'>
          <img src={detailsData.user_image} alt='offer description' className=' block' />
          <p className='absolute top-2 left-2 bg-teal-color text-white font-medium px-3 py2 text-lg'>
            {
              detailsData.live
                ? <FaEye className='text-white text-2xl' />
                : <FaEyeSlash className='text-white text-2xl' />
            }
          </p>
        </div>
        <div className='flex-grow  px-4 py-6 relative'>
          <h3 className='font-medium text-2xl mb-2'>{detailsData.user_name}</h3>
          <div className='flex items-center mb-2'>
            <Stars starsNumber={detailsData.stars} />
          </div>
          <p className='mb-5 text-dark-color whitespace-normal mt-5'>{detailsData.details}</p>
        </div>
        <div className="flex justify-center items-center">
          <button className="w-6 h-6 p-2 rounded-full text-medium bg-teal-color transition-all duration-300 cursor-pointer
          hover:bg-dark-color text-white absolute top-1 right-1 flex justify-center items-center" onClick={handleClose}>X</button>
        </div>

      </div>
    </div>
  )
}

export default DetailsTestimonial