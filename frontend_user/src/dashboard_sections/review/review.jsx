/* eslint-disable no-unused-vars */
import feedbackPhoto from '../../assets/feedback.jpg'
import {
  Textarea, SubmitBtn, baseUrl, useCookies, useState, checkDataError, useNavigate, InteractiveStars, useLocation
} from '../../import'

function Review() {
  const location = useLocation()
  const appData = location.state
  const emptyData = { 'stars': 0, 'text': '' }
  const [cookies] = useCookies(['token_user'])
  const [createReview, setCreateReview] = useState(emptyData)
  const [successChanges, setSuccessChanges] = useState(false)
  const [serverError, setServerError] = useState(false)
  const [errorMsg, setErrorMsg] = useState({})
  const navigate = useNavigate()

  const handleChangeReview = (e) => {
    setCreateReview({ ...createReview, [e.target.name]: e.target.value });
  };

  const handleCancel = (e) => {
    e.preventDefault()
    setCreateReview({ ...emptyData })
    setErrorMsg({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg({})
    const errors = checkDataError(createReview, ['text'])
    if (Object.keys(errors).length > 0) {
      setErrorMsg({ ...errors })
      return;
    }
    const reviewData = { ...createReview, 'doctor_id': appData.doctor_id }
    fetch(`${baseUrl}/api/user/review`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + cookies.token_user,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reviewData),
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        setCreateReview({ ...emptyData })
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
            <legend className='legend'>Give a Review</legend>
            <Textarea placeholder='Enter your feedback' id='text' changeValue={setCreateReview} value={createReview}
              error={errorMsg.text} />
            <InteractiveStars getStars={createReview} setStars={setCreateReview} error={errorMsg.stars} />
            <SubmitBtn value='Save Changes' error={errorMsg.all} cancel={handleCancel}
              success={successChanges} successMsg='Feedback added thank you' />
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default Review