/* eslint-disable no-unused-vars */
// Desc: Signin page for admin
import {
  useState, useNavigate, useCookies, FaUserAlt, FaLock, baseUrl, MdEmail, useEffect, LoadingComponent,
  AuthChecker
} from '../import'

function Signin() {
  const [formState, setFormState] = useState({ 'email': '', 'password': '', 'remember': false })
  const [loginError, setLoginError] = useState('')
  const [cookies, setCookie] = useCookies(['token']);
  const [serverError, setServerError] = useState(false)
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false)
  const navigate = useNavigate();

  const handlechange = (e) => {
    if (e.target.name === 'remember') {
      setFormState({ ...formState, [e.target.name]: !formState.remember })
    } else {
      setFormState({ ...formState, [e.target.name]: e.target.value })
    }
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  const handlesubmit = (e) => {
    e.preventDefault()
    const formData = formState
    setLoginError('')
    fetch(`${baseUrl}/api/admin/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        if ('access_token' in data) {
          if (formData.remember) {
            setCookie('token', data.access_token, { path: '/', expires: new Date(Date.now() + 604800000) })
          } else {
            setCookie('token', data.access_token, { path: '/' })
          }
          navigate('/dashboard/')
        } else {
          setLoginError(data.error)
        }
      })
      .catch((error) => {
        setServerError(true)
        navigate('/server504error')
      });
  }
  if (loading) {
    return <LoadingComponent />
  } else {
    return (
      <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-teal-color">
        <div className="rounded-xl drop-shadow-xl bg-white px-6 py-8 md:px-12 md:py-16 relative min-w-[350px] md:min-w-[450px]">
          <div className="text-xl mr-10 font-black text-teal-color cursor-pointer whitespace-nowrap
          absolute top-1 left-2">Clinic App</div>
          <h2 className="text-teal-color font-[900] text-4xl mb-12 text-center mt-3 md:mt-0">Admin Login</h2>
          <form className='text-dark-color text-center' onSubmit={handlesubmit}>
            <div className="flex flex-col relative mb-2 w-full">
              <MdEmail className='absolute text-teal-color text-base md:text-lg left-3 top-[30%]' />
              <input type="text" id="email" name="email" placeholder='Email address' onChange={handlechange}
                className="bg-gray-200 rounded-lg outline-none px-9 py-2 md:px-12 text-lg "></input>
            </div>
            <div className="flex flex-col relative mb-2 w-full">
              <FaLock className='absolute text-teal-color text-base md:text-lg left-3 top-[30%]' />
              <input type="password" id="password" name="password" placeholder='Password' onChange={handlechange}
                className="bg-gray-200 rounded-lg outline-none px-9 py-2 md:px-12 text-lg"></input>
            </div>
            <div className="flex flex-row items-center mb-6 px-1">
              <input type="checkbox" id="remember" name="remember" className="accent-teal-color outline-dark-color"
                onChange={handlechange}></input>
              <label htmlFor="remember" className="font-medium ml-2">Remember me</label>
            </div>
            <input type="submit" value="Submit"
              className='bg-teal-color rounded-3xl w-[50%] px-6 py-2 text-white font-medium text-lg cursor-pointer
            hover:bg-dark-color transition-all duration-300'></input>
            <div className="text-red-500 text-sm mt-2 h-2">{loginError}</div>
          </form>
        </div>
      </div>
    )
  }
}

export default Signin