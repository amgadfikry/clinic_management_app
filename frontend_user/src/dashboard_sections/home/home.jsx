/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import clinic from '../../assets/clinic.jpg'
import {
  SearchBar, useState, SearchResults, useEffect, baseUrl, useCookies, useNavigate, LoadingComponent
} from '../../import'

function Home() {
  const [data, setData] = useState([])
  const [doctorsData, setDoctorsData] = useState([])
  const [cookies] = useCookies(['token_user'])
  const [serverError, setServerError] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${baseUrl}/api/public/doctor`, {
      headers: {
        'Authorization': 'Bearer ' + cookies.token_user,
      },
      method: 'GET',
      mode: 'cors',
    }).then(response => response.json())
      .then(data => {
        setData(data)
        setDoctorsData(data)
      })
      .catch((error) => {
        setServerError(true)
        navigate('/server504error')
      });
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])

  if (loading) {
    return (
      <LoadingComponent />
    )
  } else {
    return (
      <div className='container mx-auto' >
        <header className="relative w-full mb-5">
          <div className='  flex justify-center items-center'>
            <img className='block max-h-[200px] sm:max-h-[250px] lg:max-h-[300px] w-full object-cover rounded-b-xl overflow-hidden' src={clinic}
              alt='Image by wwwfreepikcom' />
          </div>
        </header>
        <SearchBar data={data} setData={setData} doctorsData={doctorsData} />
        <SearchResults data={data} />
      </div>
    )
  }
}

export default Home