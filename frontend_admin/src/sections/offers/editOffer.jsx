/* eslint-disable no-unused-vars */
import {
  useState, useCookies, baseUrl, SubmitBtn, TextInput, useNavigate, Selectspeciality,
  useLocation, checkDataError, samilarData, handleUpdate, SubHeader, Textarea, ImageSelect
} from '../../import'

function EditOffer() {
  const location = useLocation()
  const offersData = location.state
  const specialityName = offersData.speciality.name.slice()
  const [changeOffer, setChangeOffer] = useState({ ...offersData })
  const [speciality, setSpeciality] = useState(specialityName)
  const [errorMsg, setErrorMsg] = useState({})
  const [serverError, setServerError] = useState(false)
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()

  const handleChangeOffers = (e) => {
    setChangeOffer({ ...changeOffer, [e.target.name]: e.target.value })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setChangeOffer({ ...offersData })
    setSpeciality(specialityName)
    setErrorMsg({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const options = {
      baseUrl: baseUrl, apiUrl: 'offer', cookies: cookies, changeState: changeOffer, path: 'offers',
      setChangeState: setChangeOffer, setErrorMsg: setErrorMsg, state: offersData, navigate: navigate,
      setServerError: setServerError, checkDataError: checkDataError, samilarData: samilarData, exception: []
    }
    return (handleUpdate(options))
  }

  return (
    <section className="flex flex-col px-3 md:px-5 pb-[100px]">
      <SubHeader subHead={`Update ${offersData.title}`} btnName='Back' btnPath='/dashboard/offers' image={offersData.image} />
      <form onSubmit={handleSubmit}>
        <fieldset className='filedset'>
          <legend className='legend'>Offer Info</legend>
          <TextInput type='text' label='Offer title' placeholder='Enter offer title' id='title' value={changeOffer.title}
            changeFunc={handleChangeOffers} error={errorMsg.title} />
          <TextInput type='number' label='Old price' placeholder='Enter old price' id='old_price' value={changeOffer.old_price}
            changeFunc={handleChangeOffers} error={errorMsg.old_price} />
          <TextInput type='number' label='New price' placeholder='Enter new price' id='new_price' value={changeOffer.new_price}
            changeFunc={handleChangeOffers} error={errorMsg.new_price} />
          <TextInput type='date' label='Expire date' placeholder='Enter expire date' id='expire_date' value={changeOffer.expire_date}
            changeFunc={handleChangeOffers} error={errorMsg.expire_date} />
          <Selectspeciality specialityValue={changeOffer} setSpecialityValue={setChangeOffer} error={errorMsg}
            speciality={speciality} setSpeciality={setSpeciality} setSpecialityPrice='' />
          <Textarea placeholder='Enter offer description' id='description' changeValue={setChangeOffer} value={changeOffer}
            error={errorMsg.description} />
          <ImageSelect label="Choose offer photo" setChangeProfile={setChangeOffer} changeProfile={changeOffer} error={errorMsg.image} />
          <SubmitBtn value='Update' error={errorMsg.all} cancel={handleCancel} success={false}
            successMsg='' />
        </fieldset>
      </form>
    </section>
  )
}

export default EditOffer