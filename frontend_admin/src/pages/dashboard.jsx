/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars*/
import {
  Navbar, Sidebar, Footer, LoadingComponent, ComingSoon, Doctors, useEffect, useState, useNavigate, ServerError,
  useDispatch, useCookies, Routes, Route, baseUrl, Settings, Specialities, Offers, setAdminData, NotFound,
  MainDashboard, Testimonial, Appointment
} from '../import'

function Dashboard() {
  const [cookies, setCookie] = useCookies(['token'])
  const [serverError, setServerError] = useState(false)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const fetchLibrary = [
    { 'url': '/api/admin/state', 'action': setAdminData },
  ]

  useEffect(() => {
    fetchLibrary.forEach((item) => {
      fetch(baseUrl + item.url, {
        headers: {
          'Authorization': 'Bearer ' + cookies.token,
        },
        method: 'GET',
        mode: 'cors',
      }).then(response => response.json())
        .then(data => {
          dispatch(item.action(data))
        })
        .catch((error) => {
          setServerError(true)
          navigate('/server504error')
        });
    })
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])

  if (serverError) {
    return <ServerError />
  } else if (loading) {
    return <LoadingComponent />
  } else {
    return (
      <div className="flex flex-col h-[100vh]">
        <Navbar className='flex-1' />
        <Sidebar />
        <div className="min-w-[calc(100%-50px)] min-h-[calc(100%-89px)] mt-[56px] ml-[50px] ">
          <Routes>
            <Route exact path='/' element={<MainDashboard />} ></Route>
            <Route exact path="analysis" element={<ComingSoon />} />
            <Route exact path='doctors/*' element={<Doctors />} ></Route>
            <Route exact path='appointments/*' element={<Appointment />} ></Route>
            <Route exact path='calendar' element={<ComingSoon />} ></Route>
            <Route exact path='specialities/*' element={<Specialities />} ></Route>
            <Route exact path='offers/*' element={<Offers />} ></Route>
            <Route exact path='testimonials/*' element={<Testimonial />} ></Route>
            <Route exact path='roles' element={<ComingSoon />} ></Route>
            <Route exact path='settings' element={<Settings />} ></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Dashboard