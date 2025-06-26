/* eslint-disable no-unused-vars */
import {
  useState, TextInput, SubmitBtn, baseUrl, useCookies, checkDataError, useNavigate, SubHeader, handleCreate,
  Selectspeciality, ImageSelect, Textarea
} from '../../import'

function CreateOffer() {
  const emptyOffer = {
    'title': '', 'old_price': '', 'new_price': '', 'description': '',
    'expire_date': '', 'speciality_id': '', 'image': null
  }
  const [newOffer, setNewOffer] = useState({ ...emptyOffer })
  const [errorMsg, setErrorMsg] = useState({})
  const [successChanges, setSuccessChanges] = useState(false)
  const [serverError, setServerError] = useState(false)
  const [speciality, setSpeciality] = useState('')
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()

  const handleChangeOffers = (e) => {
    e.preventDefault()
    setNewOffer({ ...newOffer, [e.target.name]: e.target.value })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setNewOffer({ ...emptyOffer })
    setSpeciality("")
    setErrorMsg({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg({});
    const errors = checkDataError(newOffer, [])
    if (Object.keys(errors).length > 0) {
      setErrorMsg({ ...errors })
      return;
    }
    fetch(`${baseUrl}/api/admin/offer`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newOffer),
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        if ('error' in data) {
          setErrorMsg({ ...data.error })
        } else {
          setSuccessChanges(true)
          setErrorMsg({});
          setNewOffer({ ...emptyOffer })
          setSpeciality("")
          setTimeout(() => {
            setSuccessChanges(false)
          }, 2000)
        }
      })
      .catch((error) => {
        setServerError(true)
        navigate('/server504error')
      });
  }

  return (
    <section className="flex flex-col px-3 md:px-5 pb-[100px]">
      <SubHeader subHead="Create new Offer" btnName='Back' btnPath='/dashboard/offers' image={false} />
      <form onSubmit={handleSubmit}>
        <fieldset className='filedset'>
          <legend className='legend'>Offer Info</legend>
          <TextInput type='text' label='Offer title' placeholder='Enter offer title' id='title' value={newOffer.title}
            changeFunc={handleChangeOffers} error={errorMsg.title} />
          <TextInput type='number' label='Old price' placeholder='Enter old price' id='old_price' value={newOffer.old_price}
            changeFunc={handleChangeOffers} error={errorMsg.old_price} />
          <TextInput type='number' label='New price' placeholder='Enter new price' id='new_price' value={newOffer.new_price}
            changeFunc={handleChangeOffers} error={errorMsg.new_price} />
          <TextInput type='date' label='Expire date' placeholder='Enter expire date' id='expire_date' value={newOffer.expire_date}
            changeFunc={handleChangeOffers} error={errorMsg.expire_date} />
          <Selectspeciality specialityValue={newOffer} setSpecialityValue={setNewOffer} error={errorMsg}
            speciality={speciality} setSpeciality={setSpeciality} setSpecialityPrice='' />
          <Textarea placeholder='Enter offer description' id='description' changeValue={setNewOffer} value={newOffer}
            error={errorMsg.description} />
          <ImageSelect label="Choose offer photo" setChangeProfile={setNewOffer} changeProfile={newOffer} error={errorMsg.image} />
          <SubmitBtn value='Create' error={errorMsg.all} cancel={handleCancel} success={successChanges}
            successMsg='Created successfully' />
        </fieldset>
      </form>
    </section>
  )
}

export default CreateOffer