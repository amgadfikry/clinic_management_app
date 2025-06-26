/* eslint-disable no-unused-vars */
import feedbackPhoto from '../../assets/feedback.jpg'
import {
  Textarea, SubmitBtn, userDataState, baseUrl, useCookies, useSelector, useState, checkDataError, useNavigate, InteractiveStars
} from '../../import'

function Feedback() {
  const emptyData = { 'stars': 0, 'details': '', 'live': 0 }
  const [cookies] = useCookies(['token_user'])
  const [createFeedback, setCreateFeedback] = useState(emptyData)
  const userData = useSelector(userDataState)
  const [successChanges, setSuccessChanges] = useState(false)
  const [serverError, setServerError] = useState(false)
  const [errorMsg, setErrorMsg] = useState({})
  const navigate = useNavigate()

  const handleChangeProfile = (e) => {
    setCreateFeedback({ ...createFeedback, [e.target.name]: e.target.value });
  };

  const handleCancel = (e) => {
    e.preventDefault()
    setCreateFeedback({ ...emptyData })
    setErrorMsg({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg({})
    const errors = checkDataError(createFeedback, ['live'])
    if (Object.keys(errors).length > 0) {
      setErrorMsg({ ...errors })
      return;
    }
    fetch(`${baseUrl}/api/user/testimonial`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + cookies.token_user,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createFeedback),
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        setCreateFeedback({ ...emptyData })
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
    <div className='container mx-auto' >
      <header className="relative w-full mb-12">
        <div className='  flex justify-center items-center'>
          <img className='block max-h-[200px] sm:max-h-[250px] lg:max-h-[300px] w-full object-cover rounded-b-xl overflow-hidden' src={feedbackPhoto}
            alt='Image by wwwfreepikcom' />
        </div>
        <div className='absolute top-0 left-0 w-full h-full bg-teal-color bg-opacity-40 inset-0 rounded-b-xl'></div>
      </header>
      <div>
        <form onSubmit={handleSubmit}>
          <fieldset className='filedset'>
            <legend className='legend'>Give a feedback</legend>
            <Textarea placeholder='Enter your feedback' id='details' changeValue={setCreateFeedback} value={createFeedback}
              error={errorMsg.details} />
            <InteractiveStars getStars={createFeedback} setStars={setCreateFeedback} error={errorMsg.stars} />
            <SubmitBtn value='Save Changes' error={errorMsg.all} cancel={handleCancel}
              success={successChanges} successMsg='Feedback added thank you' />
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default Feedback