/* eslint-disable no-unused-vars */
import {
  useState, TextInput, SubmitBtn, baseUrl, useCookies, useNavigate, checkPassword
} from '../../import.js'

function ChangePassword() {
  const [errorMsg, setErrorMsg] = useState({})
  const [changePassword, setChangePassword] = useState({
    'current_password': '', 'new_password': '', 'confirm_password': ''
  })
  const [successChanges, setSuccessChanges] = useState(false)
  const [serverError, setServerError] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const navigate = useNavigate()

  const handleChangePassword = (e) => {
    setChangePassword({ ...changePassword, [e.target.name]: e.target.value })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setChangePassword({ 'current_password': '', 'new_password': '', 'confirm_password': '' })
    setErrorMsg({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg({})
    const errors = checkPassword(changePassword)
    if (Object.keys(errors).length > 0) {
      setErrorMsg({ ...errors })
      return;
    }
    fetch(`${baseUrl}/api/admin/password`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(changePassword),
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        if ('error' in data) {
          setErrorMsg({ ...data.error })
        } else {
          setErrorMsg({})
          setChangePassword({ 'current_password': '', 'new_password': '', 'confirm_password': '' })
          setSuccessChanges(true)
          setTimeout(() => {
            removeCookie('token', { path: '/' });
            navigate('/signin')
          }, 3000)
        }
      })
      .catch((error) => {
        setServerError(true)
        navigate('/server504error')
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className='filedset ' >
        <legend className='legend'>Change Password</legend>
        <TextInput type='password' label='Current Password' placeholder='Enter your current password' id='current_password'
          value={changePassword.current_password} changeFunc={handleChangePassword} error={errorMsg.current_password} />
        <TextInput type='password' label='New Password' placeholder='Enter your new password' id='new_password'
          value={changePassword.new_password} changeFunc={handleChangePassword} error={errorMsg.new_password} />
        <TextInput type='password' label='Confirm Password' placeholder='confirm new password' id='confirm_password'
          value={changePassword.confirm_password} changeFunc={handleChangePassword} error={errorMsg.confirm_password} />
        <SubmitBtn value='Save Changes' error={errorMsg.all} cancel={handleCancel}
          success={successChanges} successMsg='Change password successfully' />
      </fieldset>
    </form>
  )
}

export default ChangePassword