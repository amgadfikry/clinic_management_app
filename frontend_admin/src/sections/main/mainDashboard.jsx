/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  OverviewPart, useEffect, useCookies, useNavigate, baseUrl, useState, LoadingComponent, FeaturesPart,
  TablePart
} from '../../import'

function MainDashboard() {
  const [overView, setOverView] = useState("")
  const [appointments, setAppointments] = useState("")
  const [doctors, setDoctors] = useState("")
  const [loading, setLoading] = useState(true)
  const [serverError, setServerError] = useState(false)
  const navigate = useNavigate()
  const [cookies] = useCookies()

  const fetchLibrary = [
    { 'url': '/api/admin/overview', 'action': setOverView },
    { 'url': '/api/admin/appointment', 'action': setAppointments },
    { 'url': '/api/admin/doctor', 'action': setDoctors }
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
          item.action(data)
        })
        .catch((error) => {
          setServerError(true)
          navigate('/server504error')
        });
    })
    setTimeout(() => {
      setLoading(false)
    }, 1000);
    console.log(appointments)
  }, [])

  if (loading) {
    return (
      <LoadingComponent />
    )
  } else {
    return (
      <div className='relative min-h-full py-5 px-4'>
        <OverviewPart overView={overView} />
        <FeaturesPart />
        <TablePart appointments={appointments} doctors={doctors} />
      </div>
    )
  }
}

export default MainDashboard