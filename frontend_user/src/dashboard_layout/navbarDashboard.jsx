/* eslint-disable react/prop-types */
import {
  useState, useEffect, MdDarkMode, MdLightMode, IoMdNotifications, Link, MdOutlineSearch, TbMenu2, TbMenuDeep
} from '../import'

function NavbarDashboard({ toggleSidebar, setToggleSidebar }) {
  const [scroll, setScroll] = useState(0)
  const [darkMode, setDarkMode] = useState(false)

  const handleTheme = () => {
    setDarkMode(!darkMode)
  }

  const handleSidebar = () => {
    setToggleSidebar(!toggleSidebar)
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY)
    })
  }, [])

  return (
    <div className={`container mx-auto bg-white py-2 px-3 flex items-center bg-opacity-80 text-dark-color transition-position duration-300
      ${scroll > 50 && 'fixed top-3 left-1/2 translate-x-[-50%] rounded-xl drop-shadow-lg mx-auto z-50'}`}>
      <Link to="/dashboard/" className='text-2xl font-black text-teal-color cursor-pointer mr-auto whitespace-nowrap'>
        <div >Clinic App</div>
      </Link>
      <div className='mr-3 relative'>
        <label htmlFor="search" className='absolute top-1 left-1 text-gray-300 font-bold cursor-pointer'>
          <MdOutlineSearch className='text-2xl ' /> </label>
        <input type="search" className='outline-0 border border-gray-300 rounded-xl py-1 px-7 focus:border-gray-400
        w-[130px]' placeholder='Search' id='search' name='search' />
      </div>
      <div className='mr-3' onClick={handleTheme}>
        {darkMode
          ? <MdDarkMode className='text-2xl text-teal-color font-bold cursor-pointer' />
          : <MdLightMode className='text-2xl text-teal-color font-bold cursor-pointer' />
        }
      </div>
      <IoMdNotifications className="text-2xl text-teal-color font-bold cursor-pointer mr-3 whitespace-nowrap" />
      <div className=''>
        {toggleSidebar
          ? <TbMenu2 className='text-2xl font-bold cursor-pointer' onClick={handleSidebar} />
          : <TbMenuDeep className='text-2xl font-bold cursor-pointer' onClick={handleSidebar} />
        }
      </div>
    </div>
  )
}

export default NavbarDashboard