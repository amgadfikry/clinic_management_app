/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  useState, useCookies, baseUrl, checkDataError, SubmitBtn, SubHeader
} from '../../import'
import Select from "react-select";

function CreateTime() {
  const emptyTime = { 'day': '', 'start': '', 'end': '' }
  const [selectedTime, setSelectedTime] = useState({ ...emptyTime })
  const [serverError, setServerError] = useState(false)
  const [successChanges, setSuccessChanges] = useState(false)
  const [error, setError] = useState({})
  const [cookies] = useCookies(['token'])
  const days = [
    { value: 'Saturday', label: 'Saturday' }, { value: 'Sunday', label: 'Sunday' }, { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' }, { value: 'Wednesday', label: 'Wednesday' }, { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },]
  const hours = []
  for (let i = 0; i < 24; i++) {
    if (i < 10) {
      hours.push({ value: `0${i}:00`, label: `0${i}:00`, num: i, name: 'start' })
    } else {
      hours.push({ value: `${i}:00`, label: `${i}:00`, num: i, name: 'start' })
    }
  }
  const handleChangeDay = (target) => {
    setSelectedTime({ ...selectedTime, 'day': target.value })
  };
  const handleChangestart = (target) => {
    setSelectedTime({ ...selectedTime, 'start': target.value })
  };
  const handleChangeEnd = (target) => {
    setSelectedTime({ ...selectedTime, 'end': target.value })
  };
  const handleCancel = () => {
    setError({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = checkDataError(selectedTime, [])
    if (Object.keys(errors).length > 0) {
      setError({ ...errors })
      return;
    }
    fetch(`${baseUrl}/api/admin/time`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(selectedTime)
    }).then(response => response.json())
      .then(data => {
        if ('error' in data) {
          setError({ ...error, 'all': data.error })
          return
        }
        setSuccessChanges(true)
        setError({})
        setTimeout(() => {
          setSuccessChanges(false)
        }, 2000)
      })
      .catch((error) => {
        setServerError(true)
      });
  }

  return (
    <section className="flex flex-col px-3 md:px-5 pb-[100px]">
      <SubHeader subHead="Add new time" btnName='Back' btnPath={-1} image={false} />
      <form onSubmit={handleSubmit} className=''>
        <fieldset className='filedset'>
          <legend className='legend'>Add new time</legend>
          <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 flex-1 flex-wrap'>
            <div className=' flex flex-col space-y-1 w-full shrink-0 md:w-[calc(50%-12px)] flex-grow lg:flex-grow-0 md:mr-3 md:mb-3'>
              <p className='text-sm pl-1 text-bold'>Start</p>
              <Select options={hours} placeholder={"select start in hours"} onChange={handleChangestart} />
              <span className='text-xs text-red-500 pl-1 h-2'>{error.start}</span>
            </div>
            <div className=' flex flex-col space-y-1 w-full shrink-0 md:w-[calc(50%-12px)] flex-grow lg:flex-grow-0 md:mr-3 md:mb-3'>
              <p className='text-sm pl-1 text-bold'>End</p>
              <Select options={hours} placeholder={"select end in hours"} onChange={handleChangeEnd} />
              <span className='text-xs text-red-500 pl-1 h-2'>{error.end}</span>
            </div>
            <div className=' flex flex-col space-y-1 w-full shrink-0 md:w-[calc(50%-12px)] flex-grow lg:flex-grow-0 md:mr-3'>
              <p className='text-sm pl-1 text-bold'>Day</p>
              <Select options={days} placeholder={"select day"} onChange={handleChangeDay} />
              <span className='text-xs text-red-500 pl-1 h-2'>{error.day}</span>
            </div>
          </div>
          <div className='w-full flex justify-end items-start pr-2 pt-5 relative pb-5'>
            {successChanges && <p className='text-green-500 text-sm absolute left-0 md:bottom-[10%] bottom-0'>Added successfully</p>}
            <input type="submit" value='Add'
              className='border border-teal-color rounded-3xl px-8 py-1 text-white font-medium cursor-pointer
        hover:bg-dark-color hover:border-dark-color hover:text-white transition-all duration-300 mr-2
        bg-teal-color'></input>
            <div className="text-red-500 text-xs mt-2 h-2 text-right pr-2 w-full absolute bottom-[10%] right-0">{error.all}</div>
          </div>
        </fieldset>
      </form>
    </section>
  )
}

export default CreateTime