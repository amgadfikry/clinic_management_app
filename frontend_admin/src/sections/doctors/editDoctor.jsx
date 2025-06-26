/* eslint-disable no-unused-vars */
import {
  useState, useCookies, baseUrl, SubmitBtn, TextInput, useNavigate, Selectspeciality,
  useLocation, checkDataError, samilarData, handleUpdate, SubHeader, Textarea, ImageSelect, TimeControl
} from '../../import'

function EditDoctor() {
  const location = useLocation()
  const doctorsData = location.state
  const specialityName = doctorsData.speciality.name
  const currentSpecialityPrice = doctorsData.speciality.price;
  const [changeDoctor, setChangeDoctor] = useState({ ...doctorsData })
  const [speciality, setSpeciality] = useState(specialityName)
  const [specialityPrice, setSpecialityPrice] = useState(currentSpecialityPrice)
  const [errorMsg, setErrorMsg] = useState({})
  const [serverError, setServerError] = useState(false)
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()

  const handleChangeDoctors = (e) => {
    setChangeDoctor({ ...changeDoctor, [e.target.name]: e.target.value })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setChangeDoctor({ ...doctorsData })
    setSpeciality(specialityName)
    setErrorMsg({})
    setSpecialityPrice(currentSpecialityPrice)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const removedict = { ...changeDoctor };
    ['stars', 'all_times', 'appointments', 'reviews', 'speciality', 'visits'].forEach(el => delete removedict[el])
    if (!removedict['price']) {
      removedict['price'] = parseInt(currentSpecialityPrice)
    }
    const options = {
      baseUrl: baseUrl, apiUrl: 'doctor', cookies: cookies, changeState: removedict, path: 'doctors',
      setChangeState: setChangeDoctor, setErrorMsg: setErrorMsg, state: doctorsData, navigate: navigate,
      setServerError: setServerError, checkDataError: checkDataError, samilarData: samilarData,
      exception: ['price', 'image', 'stop']
    }
    return (handleUpdate(options))
  }

  return (
    <section className="flex flex-col px-3 md:px-5 pb-[100px]">
      <SubHeader subHead={doctorsData.full_name} btnName='Back' btnPath='/dashboard/doctors'
        image={doctorsData.image} />
      <form onSubmit={handleSubmit}>
        <fieldset className='filedset'>
          <legend className='legend'>Doctor Info</legend>
          <TextInput type='text' label='Doctor name' placeholder='Enter Doctor full name' id='full_name' value={changeDoctor.full_name}
            changeFunc={handleChangeDoctors} error={errorMsg.full_name} />
          <TextInput type='text' label='Title' placeholder='Enter doctor title' id='title' value={changeDoctor.title}
            changeFunc={handleChangeDoctors} error={errorMsg.title} />
          <TextInput type='number' label='Price' placeholder={specialityPrice}
            id='price' value={changeDoctor.price} changeFunc={handleChangeDoctors} error={errorMsg.price} />
          <Selectspeciality specialityValue={changeDoctor} setSpecialityValue={setChangeDoctor} error={errorMsg}
            speciality={speciality} setSpeciality={setSpeciality} setSpecialityPrice={setSpecialityPrice} />
          <Textarea placeholder='Enter doctor full details' id='details' changeValue={setChangeDoctor} value={changeDoctor}
            error={errorMsg.details} />
          <ImageSelect label="Choose doctor photo" setChangeProfile={setChangeDoctor} changeProfile={changeDoctor} error={errorMsg.image} />
          <SubmitBtn value='Update' error={errorMsg.all} cancel={handleCancel} success={false}
            successMsg='' />
        </fieldset>
      </form>
      <TimeControl doctorData={doctorsData} />
    </section>
  )
}

export default EditDoctor