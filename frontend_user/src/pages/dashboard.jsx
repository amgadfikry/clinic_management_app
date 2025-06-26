/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  Routes, Route, NavbarDashboard, Sidebar, FooterDashboard, useState, useCookies, useDispatch, useNavigate, setUserData,
  baseUrl, useEffect, Home, Profile, Appointments, Feedback, ComingSoon, MakeAppointment, Review
} from '../import'

function Dashboard() {
  const [cookies, setCookie] = useCookies(['token_user'])
  const [serverError, setServerError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [toggleSidebar, setToggleSidebar] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${baseUrl}/api/user/state`, {
      headers: {
        'Authorization': 'Bearer ' + cookies.token_user,
      },
      method: 'GET',
      mode: 'cors',
    }).then(response => response.json())
      .then(data => {
        dispatch(setUserData(data))
      })
      .catch((error) => {
        setServerError(true)
        navigate('/server504error')
      });
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])

  return (
    <div className='flex flex-col min-h-screen '>
      <NavbarDashboard toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />
      <Sidebar toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='makeappointment/:id' element={<MakeAppointment />} />
        <Route path='review/:id' element={<Review />} />
        <Route path='appointments' element={<Appointments />} />
        <Route path='history' element={<ComingSoon />} />
        <Route path='billing' element={<ComingSoon />} />
        <Route path='feedback' element={<Feedback />} />
        <Route path='profile' element={<Profile />} />
      </Routes>
      <FooterDashboard className='' />
    </div>
  )
}

export default Dashboard