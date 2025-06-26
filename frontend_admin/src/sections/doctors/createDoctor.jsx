/* eslint-disable no-unused-vars*/
import {
  Link, useState, TextInput, SubmitBtn, baseUrl, useCookies, Selectspeciality, BiSolidCloudUpload,
  checkDataError, Textarea, useNavigate, ImageSelect, SubHeader
} from '../../import'

function CreateDoctor() {
  const emptyDoctor = {
    'full_name': '', 'title': '', 'price': '', 'details': '', 'speciality_id': '',
    'image': null
  }
  const [newDoctor, setNewDoctor] = useState({ ...emptyDoctor })
  const [errorMsg, setErrorMsg] = useState({})
  const [successChanges, setSuccessChanges] = useState(false)
  const [speciality, setSpeciality] = useState('')
  const [specialityPrice, setSpecialityPrice] = useState('Default speciality price')
  const [serverError, setServerError] = useState(false)
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()

  const handleChangeDoctors = (e) => {
    e.preventDefault()
    setNewDoctor({ ...newDoctor, [e.target.name]: e.target.value })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setNewDoctor({ ...emptyDoctor })
    setSpeciality("")
    setErrorMsg({})
    setSpecialityPrice('Default speciality price')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg({});
    const errors = checkDataError(newDoctor, ['price', 'image'])
    if (Object.keys(errors).length > 0) {
      setErrorMsg({ ...errors })
      return;
    }
    if (newDoctor['price'] === '') {
      newDoctor['price'] = specialityPrice
    }
    fetch(`${baseUrl}/api/admin/doctor`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDoctor),
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        setSuccessChanges(true)
        setErrorMsg({});
        setNewDoctor({ ...emptyDoctor })
        setSpeciality("")
        setSpecialityPrice('Default speciality price')
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
    <section className="flex flex-col px-3 md:px-5 pb-[100px]">
      <SubHeader subHead="Add new doctor" btnName='Back' btnPath='/dashboard/doctors' image={false} />
      <form onSubmit={handleSubmit}>
        <fieldset className='filedset'>
          <legend className='legend'>Doctor Info</legend>
          <TextInput type='text' label='Doctor name' placeholder='Enter Doctor full name' id='full_name' value={newDoctor.full_name}
            changeFunc={handleChangeDoctors} error={errorMsg.full_name} />
          <TextInput type='text' label='Title' placeholder='Enter doctor title' id='title' value={newDoctor.title}
            changeFunc={handleChangeDoctors} error={errorMsg.title} />
          <TextInput type='number' label='Price' placeholder={specialityPrice}
            id='price' value={newDoctor.price} changeFunc={handleChangeDoctors} error={errorMsg.price} />
          <Selectspeciality specialityValue={newDoctor} setSpecialityValue={setNewDoctor} error={errorMsg}
            speciality={speciality} setSpeciality={setSpeciality} setSpecialityPrice={setSpecialityPrice} />
          <Textarea placeholder='Enter doctor full details' id='details' changeValue={setNewDoctor} value={newDoctor}
            error={errorMsg.details} />
          <ImageSelect label="Choose doctor photo" setChangeProfile={setNewDoctor} changeProfile={newDoctor} error={errorMsg.image} />
          <SubmitBtn value='Add new' error={errorMsg.all} cancel={handleCancel} success={successChanges}
            successMsg='Created successfully' />
        </fieldset>
      </form>
    </section>
  )
}

export default CreateDoctor