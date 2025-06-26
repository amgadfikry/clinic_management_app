/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  useState, useCookies, baseUrl, SubmitBtn, useNavigate, useEffect, Select, DoctorTimeShow
} from '../../import'

function TimeControl({ doctorData }) {
  const [selectedOption, setSelectedOption] = useState();
  const [timeData, setTimeData] = useState([])
  const [toggleMenu, setToggleMenu] = useState(false)
  const [serverError, setServerError] = useState(false)
  const [error, setError] = useState([])
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()

  const handleToggleMenu = () => {
    navigate('/dashboard/doctors/time')
  }

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedOption) {
      navigate(`/dashboard/doctors`)
      return
    }
    const ListIds = selectedOption.map(el => el.id)
    fetch(`${baseUrl}/api/admin/doctor/times/${doctorData.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ListIds),
      mode: 'cors'
    }).then(response => response.json())
      .then(data => navigate(`/dashboard/doctors`))
      .catch((error) => {
        setServerError(true)
        navigate('/server504error')
      });

  }

  useEffect(() => {
    fetch(`${baseUrl}/api/admin/time`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
      },
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        const li = []
        data.forEach(el => {
          li.push(
            {
              value: `${el.day} (${el.start < 10 ? '0' + el.start + ':00' : el.start + ':00'} - ${el.end < 10 ? '0' + el.end + ':00' : el.end + ':00'})`,
              label: `${el.day} (${el.start < 10 ? '0' + el.start + ':00' : el.start + ':00'} - ${el.end < 10 ? '0' + el.end + ':00' : el.end + ':00'})`,
              id: el.id
            })
        })
        setTimeData([...li])
      })
      .catch((error) => {
        setServerError(true)
        navigate('/server504error')
      });
  }, [])

  useEffect(() => {
    console.log('');
  }, [selectedOption]);

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className='filedset'>
        <legend className='legend'>Time info</legend>
        <div className='flex-col flex flex-1'>
          <div className='flex flex-col md:flex-row flex-1 md:items-center mb-8'>
            <div className='flex flex-col space-y-2 w-full shrink-0 md:w-[calc(50%-12px)] flex-grow lg:flex-grow md:mr-3'>
              <label htmlFor='time' className='text-sm pl-1 text-bold'>Time</label>
              <Select className='w-full' options={timeData} isMulti onChange={handleChange} />
              <button type='button' className='bg-teal-color text-white rounded-lg px-3 py-2 flex-grow-0 w-fit'
                onClick={handleToggleMenu}>Add new time</button>
            </div>
            <DoctorTimeShow times={doctorData.all_times} id={doctorData.id} />
          </div>
        </div>
        <div className='w-full flex justify-end items-start pr-2 pt-5 relative pb-5'>
          <input type="submit" value='Add'
            className='border border-teal-color rounded-3xl px-8 py-1 text-white font-medium cursor-pointer
        hover:bg-dark-color hover:border-dark-color hover:text-white transition-all duration-300 mr-2
        bg-teal-color'></input>
          <div className="text-red-500 text-xs mt-2 h-2 text-right pr-2 w-full absolute bottom-[10%] right-0">{error.all}</div>
        </div>
      </fieldset>
    </form>
  )
}

export default TimeControl