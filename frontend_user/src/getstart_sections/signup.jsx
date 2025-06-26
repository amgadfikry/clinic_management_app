import {
  useState, useNavigate, useCookies, FaLock, baseUrl, MdEmail, useEffect, LoadingComponent,
  AuthChecker, Link, checkDataError, TextInput
} from '../import'

function Signup() {
  const emptyForm = {
    'email': '', 'password': '', 'full_name': '',
    'user_name': '', 'confirm_password': ''
  }
  const [formState, setFormState] = useState({ ...emptyForm })
  const [errorMsg, setErrorMsg] = useState({})
  const [cookies, setCookie] = useCookies(['token']);
  const [serverError, setServerError] = useState(false)
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false)
  const navigate = useNavigate();

  const handlechange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  const handlesubmit = (e) => {
    e.preventDefault()
    const formData = formState
    setErrorMsg({})
    const errors = checkDataError(formData, [])
    if (Object.keys(errors).length > 0) {
      setErrorMsg({ ...errors })
      return;
    }
    delete formData['confirm_password']
    console.log(formData)
    fetch(`${baseUrl}/api/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        if ('error' in data) {
          setErrorMsg({ ...errorMsg, 'all': data.error })
        } else {
          setErrorMsg({})
          setFormState({ ...emptyForm })
          navigate('/getstart/')
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
      <div className="rounded-xl drop-shadow-xl bg-gray-color px-3 py-8 relative mb-8 w-[90%] md:max-w-[700px]
        border border-gray-200 mt-8">
        <div className="text-xl mr-10 font-black text-teal-color cursor-pointer whitespace-nowrap
          absolute top-1 left-2">Clinic App</div>
        <h2 className="text-teal-color font-[900] text-4xl mb-6 text-center mt-3 md:mt-0">Sign Up</h2>
        <form className='text-dark-color text-left ' onSubmit={handlesubmit}>
          <div className='flex flex-col md:flex-row flex-wrap '>
            <TextInput type='text' label='Full Name' placeholder='Enter your full name' id='full_name' value={formState.full_name}
              changeFunc={handlechange} error={errorMsg.full_name} className='' />
            <TextInput type='text' label='User Name' placeholder='Enter your user name' id='user_name' value={formState.user_name}
              changeFunc={handlechange} error={errorMsg.user_name} className='' />
            <TextInput type='text' label='Email' placeholder='Enter your Email address' id='email' value={formState.email}
              changeFunc={handlechange} error={errorMsg.email} className='' />
            <TextInput type='password' label='Password' placeholder='Enter your password' id='password' value={formState.password}
              changeFunc={handlechange} error={errorMsg.password} className='' />
            <TextInput type='password' label='Confirm password' placeholder='Confirm your password' id='confirm_password'
              value={formState.confirm_password} changeFunc={handlechange} error={errorMsg.confirm_password} className='' />
          </div>
          <div className='flex-1 flex justify-center items-center w-full'>
            <input type="submit" value="Submit"
              className='bg-teal-color rounded-3xl w-[50%] mx-auto px-6 py-2 text-white font-medium text-lg cursor-pointer
            hover:bg-dark-color transition-all duration-300 text-center mt-3'></input>
          </div>
          <div className="text-red-500 text-sm mt-2 h-2 text-center">{errorMsg.all}</div>
          <p className='mt-5 text-center'>
            have an account?
            <Link to='/getstart/' className='text-teal-color font-medium ml-1'>Sign In</Link>
          </p>
        </form>
      </div>
    )
  }
}

export default Signup;