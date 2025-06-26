/* eslint-disable no-unused-vars */
import {
  BiSolidDashboard, FaChartLine, FaUserDoctor, MdSchedule, BsCalendar3, FaKitMedical, BiSolidOffer, MdReviews,
  MdManageAccounts, MdSettings, VscSignOut, IoIosArrowForward, IoIosArrowBack, useState, useCookies, useNavigate,
  SidebarNavLink
} from '../import'

function Sidebar() {
  const [sidebar, setSidebar] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const navigate = useNavigate()

  const handleSidebar = () => {
    setSidebar(!sidebar)
  }

  const handleLogOut = () => {
    removeCookie('token', { path: '/' });
    navigate('/')
  };
  return (
    <ul className={`z-50 scroll-x-auto bg-gray-color drop-shadow-lg w-[200px] py-4 h-[calc(100vh-89px)] top-[56px] border-t text-dark-color font font-medium
    flex flex-col fixed transition-all duration-500 linear ${sidebar && 'w-[50px]'}`}>
      <button onClick={handleSidebar} className='z-50 absolute top-1/2 right-0 translate-x-[25px] translate-y-[-50%] bg-gray-color
      w-[25px] h-[50px] rounded-tr-[50%] rounded-br-[50%] py-1 border-t border-r border-b  scale '>
        {sidebar
          ? <IoIosArrowForward className='text-2xl text-teal-color font-bold' />
          : <IoIosArrowBack className='text-2xl text-teal-color font-bold' />
        }
      </button>
      <SidebarNavLink icon={BiSolidDashboard} name='Dashboard' route='/dashboard/' sidebar={sidebar} />
      <SidebarNavLink icon={FaChartLine} name='Analysis' route='/dashboard/analysis' sidebar={sidebar} />
      <SidebarNavLink icon={FaUserDoctor} name='Doctors' route='/dashboard/doctors' sidebar={sidebar} />
      <SidebarNavLink icon={MdSchedule} name='Appointments' route='/dashboard/appointments' sidebar={sidebar} />
      <SidebarNavLink icon={BsCalendar3} name='Calendar' route='/dashboard/calendar' sidebar={sidebar} />
      <SidebarNavLink icon={FaKitMedical} name='Specialities' route='/dashboard/specialities' sidebar={sidebar} />
      <SidebarNavLink icon={BiSolidOffer} name='Offers' route='/dashboard/offers' sidebar={sidebar} />
      <SidebarNavLink icon={MdReviews} name='Testimonials' route='/dashboard/testimonials' sidebar={sidebar} />
      <SidebarNavLink icon={MdManageAccounts} name='Roles' route='/dashboard/roles' sidebar={sidebar} />
      <SidebarNavLink icon={MdSettings} name='Settings' route='/dashboard/settings' sidebar={sidebar} />
      <hr className={`border-gray-300 w-[80%] mx-auto transition-all duration-500 mb-2 mt-auto ${sidebar && 'w-0 opacity-0'}`} />
      <li className='sidebar-li group' onClick={handleLogOut}>
        <VscSignOut className='sidebar-icon' />
        <p className={`sidebar-text ${sidebar && 'scale-x-0 opacity-0'}`}>Logout</p>
      </li>
    </ul>
  )
}

export default Sidebar