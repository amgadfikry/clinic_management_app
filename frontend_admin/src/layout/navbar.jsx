/* eslint-disable react/prop-types */
import {
  MdDarkMode, MdLightMode, IoMdNotifications, BsFillPersonFill, useState, useSelector, adminDataState, Link
} from '../import';

function Navbar() {
  const [darkMode, setDarkMode] = useState(false)
  const adminData = useSelector(adminDataState)
  const handleTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    <nav className='fixed z-50 top-0 w-full flex flex-row px-3 py-2 items-center h-[56px] bg-gray-color drop-shadow-md select-none'>
      <Link to="/dashboard/" className='text-2xl font-black text-teal-color cursor-pointer mr-auto'>
        <div >Clinic App</div>
      </Link>
      <div className='mr-3' onClick={handleTheme}>
        {darkMode
          ? <MdDarkMode className='text-2xl text-teal-color font-bold cursor-pointer' />
          : <MdLightMode className='text-2xl text-teal-color font-bold cursor-pointer' />
        }
      </div>
      <IoMdNotifications className="text-2xl text-teal-color font-bold cursor-pointer mr-3" />
      <div className='flex flex-row items-center space-x-2'>
        <p>{adminData.user_name}</p>
        <Link to="/dashboard/settings">
          {adminData.image
            ? <img src={adminData.image} alt="admin" className='w-[40px] h-[40px] rounded-full border' />
            : <BsFillPersonFill className='w-[40px] h-[40px] text-gray-600 bg-gray-200 p-1 rounded-full' />
          }
        </Link>
      </div>
    </nav>
  )
}

export default Navbar