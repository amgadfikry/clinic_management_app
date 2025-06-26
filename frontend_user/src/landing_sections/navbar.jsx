/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  PiDotsThreeOutlineVerticalFill, useState, Link
} from '../import'

function Navbar({ userData }) {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const handleMenuClick = () => {
    setIsMenuActive(!isMenuActive);
  }

  const closeMenu = () => {
    setIsMenuActive(false);
  }

  return (
    <nav className="border-b select-none sticky top-0 left-0 w-full z-50 bg-white">
      <div className="py-2.5 px-2.5 flex flex-row items-center content-between container mx-auto text-dark-color relative ">
        <div className="text-2xl mr-10 font-black text-teal-color cursor-pointer whitespace-nowrap">
          <a href='#head' >Clinic App</a></div>
        <ul className={`${isMenuActive ? 'flex' : 'hidden'} absolute md:static top-[53px] md:top-0 left-0 space-y-3 md:space-y-0
        bg-white md:bg-transparent px-[100px] py-8 md:px-0 md:py-0 z-10 md:z-0 shadow-lg md:shadow-none 
          w-full rounded-b-lg md:rounded-none flex-col items-center md:flex md:flex-row md:grow font-medium`}>
          <Link to='/dashboard/'>
            <li className="md:mr-2 mr-0 link-hover">Dashboard</li>
          </Link>
          <a href='#search' onClick={closeMenu}>
            <li className="md:mr-2 mr-0 link-hover" >Search</li>
          </a>
          <a href='#services' onClick={closeMenu}>
            <li className="md:mr-2 mr-0 link-hover">Services</li>
          </a>
          <a href='#offers' onClick={closeMenu}>
            <li className="md:mr-2 mr-0 link-hover">Offers</li>
          </a>
          <a href='#testimonials' className='md:mr-auto mr-0' onClick={closeMenu}>
            <li className=" link-hover">Testimonials </li>
          </a>
          {
            userData.type === 'user'
              ? (
                <Link to='/dashboard/profile'>
                  <div className='link-hover'>Profile</div>
                </Link>
              )
              : (
                <div className='flex flex-col md:flex-row items-center'>
                  <Link to='/getstart/'>
                    <div className="md:mr-1 mr-0 md:mb-0 mb-3 link-hover border border-transparent">Sign in</div>
                  </Link>
                  <Link to='/getstart/signup'>
                    <div className="link-border-hover">Sign up</div>
                  </Link>
                </div>
              )
          }
        </ul>
        <div className="md:hidden ml-auto block">
          <PiDotsThreeOutlineVerticalFill
            onClick={handleMenuClick}
            className={`text-2xl text-teal-color font-bold cursor-pointer transition-all duration-300 
              ${isMenuActive ? 'rotate-[-90deg]' : 'rotate-0'}`} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
