/* eslint-disable react/prop-types */
import { Link } from '../../import'

function SubHeader({ subHead, btnName, image, btnPath }) {
  return (
    <div className='absolute bg-gray-color bg-opacity-90 w-[90%] rounded-2xl h-[100px] left-[5%] translate-y-[-50%]
        drop-shadow-lg flex items-center py-3 px-3 md:px-6 top-[200px] sm:top-[250px] lg:top-[300px] ' >
      {
        image &&
        <img className='w-20 h-20 rounded-lg object-cover mr-2' src={image} alt={subHead} />
      }
      <p className='text-teal-color font-medium text-lg md:text-xl mr-auro flex-1'>{subHead}</p>
      <Link to={btnPath}>
        <button className="py-1 px-3 text-medium bg-teal-color rounded-lg transition-all duration-300 cursor-pointer
          hover:bg-dark-color text-white">{btnName}</button>
      </Link>
    </div>
  )
}

export default SubHeader