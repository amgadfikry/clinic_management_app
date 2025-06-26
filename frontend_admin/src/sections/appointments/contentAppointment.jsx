/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  useState, baseUrl, useCookies, LoadingComponent, ConfirmMsg, useEffect, FaUserCheck, FaUserTimes,
  useNavigate, SubHeader, TableHead, handleDeleteItem, Stars, BsFillPersonFill
} from '../../import'

function ContentAppointment() {
  const tableHeadList = ['#', '', 'Date', 'User Name', 'Speciality', 'Doctor', 'Price', 'Attend', 'Delete']
  const [loading, setLoading] = useState(true)
  const [confirmDelete, setConfirmDelete] = useState("")
  const [appointmentData, setAppointmentData] = useState([])
  const [serverError, setServerError] = useState(false)
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()

  const handleDelete = (e) => {
    setConfirmDelete(e.target.id)
  }

  const deleteFunction = () => {
    console.log(confirmDelete)
    const otions = {
      baseUrl: baseUrl, apiUrl: 'appointment', id: confirmDelete, dataState: appointmentData, cookies: cookies,
      setDataState: setAppointmentData, setConfirmDelete: setConfirmDelete, navigate: navigate, setServerError: setServerError
    }
    handleDeleteItem(otions)
  }

  const handleAttend = (e) => {
    const currentApp = appointmentData.findIndex(app => app.id == e.target.id)
    const copy = [...appointmentData]
    const removedict = { 'attend': !copy[currentApp].attend };

    fetch(`${baseUrl}/api/admin/appointment/${e.target.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(removedict),
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        copy[currentApp].attend = !copy[currentApp].attend
        setAppointmentData(copy)
      })
      .catch((error) => {
        setServerError(true)
        navigate('/server504error')
      });
  }

  useEffect(() => {
    fetch(`${baseUrl}/api/admin/appointment`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
      },
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        setAppointmentData(data)
        setLoading(false)
      })
      .catch((error) => {
        setServerError(true)
        navigate('/server504error')
      });
  }, [])

  if (loading) {
    return <LoadingComponent />
  } else {
    return (
      <section className="flex flex-col px-3 md:px-5 pb-[100px] whitespace-nowrap">
        <SubHeader subHead="All Appointments" btnName='back' btnPath='/dashboard/' image={false} />
        <div className="rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-gray-color drop-shadow-lg text-center text-base text-dark-color ">
              <TableHead list={tableHeadList} />
              <tbody className=" border-gray-100 text-dark-color ">
                {appointmentData.length === 0
                  ? (<tr>
                    <td colSpan="9" className='text-2xl text-gray-400 whitespace-nowrap py-[125px] text-center'>
                      No current appointments
                    </td>
                  </tr>)
                  : (appointmentData.map((app, index) => (
                    <tr key={app.id} className=" even:bg-gray-200 relative">
                      {confirmDelete == app.id && <ConfirmMsg state={setConfirmDelete} func={deleteFunction} />}
                      <th className="flex items-center justify-center gap-3 px-2 py-3">{index + 1}</th>
                      <td className="px-2 py-3 ">
                        <div className='min-w-[30px] flex items-center justify-center'>
                          {app.user_image
                            ? <img src={app.user_image} alt="admin" className='w-[30px] h-[30px] rounded-full border' />
                            : <BsFillPersonFill className='w-[30px] h-[30px] text-gray-600 bg-gray-200 p-1 rounded-full' />
                          }
                        </div>
                      </td>
                      <td className="px-2 py-3">{app.date}</td>
                      <td className="px-2 py-3">{app.user_name}</td>
                      <td className="px-2 py-3">{app.speciality}</td>
                      <td className="px-2 py-3">{app.doctor_name}</td>
                      <td className="px-2 py-3">{app.price}</td>
                      <td className="px-2 py-3 flex justify-center items-center" >
                        <div className='text-2xl cursor-pointer flex justify-center items-center' id={app.id}
                          onClick={(e) => handleAttend(e)} >
                          {
                            app.attend
                              ? <FaUserCheck className='text-green-500 text-2xl cursor-pointer' style={{ pointerEvents: "none" }} />
                              : <FaUserTimes className='text-red-500 text-2xl cursor-pointer' style={{ pointerEvents: "none" }} />
                          }
                        </div>
                      </td>
                      <td className="px-2 py-3">
                        <button className='delete-btn' onClick={handleDelete} id={app.id}>Delete</button>
                      </td>
                    </tr>
                  )))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    )
  }
}

export default ContentAppointment