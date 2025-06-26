/* eslint-disable no-unused-vars */
import {
  useState, useCookies, baseUrl, SubmitBtn, TextInput, useNavigate,
  useLocation, checkDataError, samilarData, handleUpdate, SubHeader
} from '../../import'

function EditSpeciality() {
  const location = useLocation()
  const specialityData = location.state
  delete specialityData.offers
  delete specialityData.doctors
  const [changeSpeciality, setChangeSpeciality] = useState({ ...specialityData })
  const [errorMsg, setErrorMsg] = useState({})
  const [serverError, setServerError] = useState(false)
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()

  const handleChangeSpeciality = (e) => {
    setChangeSpeciality({ ...changeSpeciality, [e.target.name]: e.target.value })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setChangeSpeciality({ ...specialityData })
    setErrorMsg({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const options = {
      baseUrl: baseUrl, apiUrl: 'speciality', cookies: cookies, changeState: changeSpeciality, path: 'specialities',
      setChangeState: setChangeSpeciality, setErrorMsg: setErrorMsg, state: specialityData, navigate: navigate,
      setServerError: setServerError, checkDataError: checkDataError, samilarData: samilarData, exception: []
    }
    return (handleUpdate(options))
  }

  return (
    <section className="flex flex-col px-3 md:px-5 pb-[100px]">
      <SubHeader subHead={`Update ${specialityData.name}`} btnName='Back' btnPath='/dashboard/specialities' image={false} />
      <form onSubmit={handleSubmit}>
        <fieldset className='filedset'>
          <legend className='legend'>Speciality Info</legend>
          <TextInput type='text' label='Speciality Name' placeholder='Enter Speciality name' id='name' value={changeSpeciality.name}
            changeFunc={handleChangeSpeciality} error={errorMsg.name} className='' />
          <TextInput type='number' label='Price' placeholder='Enter default price' id='price' value={changeSpeciality.price}
            changeFunc={handleChangeSpeciality} error={errorMsg.price} />
          <SubmitBtn value='Update' error={errorMsg.all} cancel={handleCancel}
            success={false} successMsg='' />
        </fieldset>
      </form>
    </section>
  )
}

export default EditSpeciality