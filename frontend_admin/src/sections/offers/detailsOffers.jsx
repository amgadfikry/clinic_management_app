/* eslint-disable react/prop-types */
function DetailsOffer({ detailsData, setDetailsData, setSeeDetails }) {
  const handleClose = () => {
    setSeeDetails(false)
    setDetailsData({})
  }

  return (
    <div className="absolute z-10 top-[20%] flex justify-center pb-12">
      <div className="bg-gray-200 rounded-lg w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] flex
        flex-col overflow-hidden  text-dark-color relative">
        <div className='w-full relative'>
          <img src={detailsData.image} alt='offer description' className=' block' />
          <p className='absolute top-2 left-2 bg-teal-color text-white font-medium px-3 py2 text-lg'>{parseInt(detailsData.percentage)}%</p>
        </div>
        <div className='flex-grow  px-4 py-6 relative'>
          <h3 className='font-medium text-2xl mb-2'>{detailsData.title}</h3>
          <div className='flex items-center mb-2'>
            <p className='line-through font-light mr-2 bg-red-600 py-1 px-2 text-white'>{detailsData.old_price}</p>
            <p className='mr-2'>&rarr;</p>
            <p className='font-light bg-teal-color py-1 px-2 text-white'>{detailsData.new_price}</p>
          </div>
          <p className='mb-5 text-dark-color whitespace-normal mt-5'>{detailsData.description}</p>
        </div>

        <div className="flex justify-center items-center">
          <button className="w-6 h-6 p-2 rounded-full text-medium bg-teal-color transition-all duration-300 cursor-pointer
          hover:bg-dark-color text-white absolute top-1 right-1 flex justify-center items-center" onClick={handleClose}>X</button>
        </div>

      </div>
    </div>
  )
}

export default DetailsOffer