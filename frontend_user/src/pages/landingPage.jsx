/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  Head, Insurance, Navbar, Offers, Search, Services, Testimonial, setUserData, baseUrl, useDispatch, useCookies, LoadingComponent,
  useNavigate, useEffect, useState, About, Footer
} from "../import"

function LandingPage() {
  const [userData, setUserData] = useState({})
  const [doctorsData, setDoctorsData] = useState([])
  const [testimonialsData, setTestimonialsData] = useState([])
  const [offersData, setOffersData] = useState([])
  const [serverError, setServerError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [cookies] = useCookies(['token_user'])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const fetchLibrary = [
    { 'url': '/api/public/state', 'action': setUserData },
    { 'url': '/api/public/doctor', 'action': setDoctorsData },
    { 'url': '/api/public/testimonial', 'action': setTestimonialsData },
    { 'url': '/api/public/offer', 'action': setOffersData },
  ]

  useEffect(() => {
    fetchLibrary.forEach((item) => {
      fetch(baseUrl + item.url, {
        headers: {
          'Authorization': 'Bearer ' + cookies.token_user,
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
    setTimeout(()=>{
      setLoading(false)
    }, 3000)
  }, [])

  if (loading) {
    return (
      <LoadingComponent />
    )
  } else {
    return (
      <div>
        <Navbar userData={userData} />
        <Head />
        <Search doctorsData={doctorsData} />
        <Services />
        <Testimonial testimonialsData={testimonialsData} />
        <Offers offersData={offersData} />
        <Insurance />
        <About />
        <Footer />
      </div>
    )
  }
}

export default LandingPage