/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {
  useState, useSelector, userDataState, TextInput, SubmitBtn, baseUrl, useCookies, setUserData, useDispatch,
  checkDataError, samilarData, ImageSelect
} from '../../import.js'

function ChangeInfo() {
  const [cookies] = useCookies(['token_user'])
  const userData = useSelector(userDataState)
  const dispatch = useDispatch()
  const [changeProfile, setChangeProfile] = useState({ ...userData })
  const [successChanges, setSuccessChanges] = useState(false)
  const [serverError, setServerError] = useState(false)
  const [errorMsg, setErrorMsg] = useState({})

  const handleChangeProfile = (e) => {
    setChangeProfile({ ...changeProfile, [e.target.name]: e.target.value });
  };

  const handleCancel = (e) => {
    e.preventDefault()
    setChangeProfile({ ...userData })
    setErrorMsg({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg({})
    const errors = checkDataError(changeProfile, ['image'])
    if (Object.keys(errors).length > 0) {
      setErrorMsg({ ...errors })
      return;
    }
    const errorSame = samilarData(changeProfile, userData)
    if (Object.keys(errorSame).length > 0) {
      setErrorMsg({ ...errorSame })
      return;
    }
    fetch(`${baseUrl}/api/user/update`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + cookies.token_user,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(changeProfile),
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        dispatch(setUserData(data))
        setChangeProfile({ ...data })
        setSuccessChanges(true)
        setTimeout(() => {
          setSuccessChanges(false)
        }, 2000)
      })
      .catch((error) => {
        setServerError(true)
        navigate('/server504error')
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className='filedset'>
        <legend className='legend'>Personal info</legend>
        <TextInput type='text' label='Full Name' placeholder='Enter your full name' id='full_name' value={changeProfile.full_name}
          changeFunc={handleChangeProfile} error={errorMsg.full_name} className='' />
        <TextInput type='text' label='User Name' placeholder='Enter your user name' id='user_name' value={changeProfile.user_name}
          changeFunc={handleChangeProfile} error={errorMsg.user_name} />
        <TextInput type='text' label='Email' placeholder='Enter your email address' id='email' value={changeProfile.email}
          changeFunc={handleChangeProfile} error={errorMsg.email} />
        <ImageSelect label="Choose profile photo" setChangeProfile={setChangeProfile} changeProfile={changeProfile} error='' />
        <SubmitBtn value='Save Changes' error={errorMsg.all} cancel={handleCancel}
          success={successChanges} successMsg='Change successfully' />
      </fieldset>
    </form>
  )
}

export default ChangeInfo
/*


*/