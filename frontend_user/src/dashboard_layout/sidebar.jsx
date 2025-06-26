/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  useSelector, userDataState, BsFillPersonFill, MdSpaceDashboard, SidebarNavLink, AiOutlineSchedule, FaCcVisa, VscFeedback, CgProfile, LiaSignOutAltSolid,
  useCookies, useNavigate, AiOutlineClose, BsClipboardData
} from '../import'

function Sidebar({ toggleSidebar, setToggleSidebar }) {
  const userData = useSelector(userDataState)
  const [cookies, setCookie, removeCookie] = useCookies(['token_user'])
  const navigate = useNavigate()

  const handleSidebar = () => {
    setToggleSidebar(!toggleSidebar)
  }

  const handleLogOut = () => {
    removeCookie('token_user', { path: '/' });
    navigate('/')
  };

  return (
    <div className={`fixed top-1/2 translate-y-[-50%] left-4 translate-x-0 rounded-xl py-5 px-3 shadow-lg border whitespace-nowrap bg-white
      border-gray-200 overflow-hidden z-50 text-dark-color transition duration-300 ${toggleSidebar && 'translate-x-[-103%]'}`}>
      <div className='h-full flex flex-col relative'>
        <AiOutlineClose className='absolute  -top-2 right-0 text-xl cursor-pointer' onClick={handleSidebar} />
        <div className="flex flex-col items-center py-2 border-b mb-5 px-8" >
          {userData.image
            ? <img src={userData.image} alt="admin" className='w-[80px] h-[80px] rounded-full border' />
            : <BsFillPersonFill className='w-[80px] h-[80px] text-gray-600 bg-gray-200 p-1 rounded-full' />
          }
          <p className='mt-3 text-xl whitespace-nowrap'>{userData.user_name}</p>
        </div>
        <ul className='flex- flex-col flex-grow h-full'>
          <SidebarNavLink icon={() => <MdSpaceDashboard className='font-bold text-2xl  mr-2 flex-shrink-0' />} name='Home' route='/dashboard/' />
          <SidebarNavLink icon={() => <AiOutlineSchedule className='font-bold text-2xl  mr-2 flex-shrink-0' />}
            name='Appointments' route='/dashboard/appointments' />
          <SidebarNavLink icon={() => <BsClipboardData className='font-bold text-2xl  mr-2 flex-shrink-0' />}
            name='History' route='/dashboard/history' />
          <SidebarNavLink icon={() => <FaCcVisa className='font-bold text-2xl  mr-2 flex-shrink-0' />} name='Billing' route='/dashboard/billing' />
          <SidebarNavLink icon={() => <VscFeedback className='font-bold text-2xl  mr-2 flex-shrink-0' />} name='Feedback' route='/dashboard/feedBack' />
          <SidebarNavLink className='mb-auto' icon={() => <CgProfile className='font-bold text-2xl  mr-2 flex-shrink-0' />}
            name='Profile' route='/dashboard/Profile' />
          <li className='rounded-lg border border-transparent hover:text-teal-color hover:border-gray-200 flex items-center flex-1 flex-grow py-2 px-3
          hover:shadow-md cursor-pointer'  onClick={handleLogOut}>
            <div >
              <LiaSignOutAltSolid className='font-bold text-2xl  mr-2 flex-shrink-0' />
            </div>
            <p className='flex-1 '>Log Out</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar