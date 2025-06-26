/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  useState, Link, baseUrl, useCookies, LoadingComponent, ConfirmMsg, useEffect,
  useNavigate, SubHeader, TableHead, handleDeleteItem, handleGet, Stars, BsFillPersonFill
} from '../../import'

function ContentDoctor() {
  const tableHeadList = ['#', '', 'Name', 'Speciality', 'Price', 'Visits', 'Stars', 'Preview', 'Edit', 'Delete']
  const [loading, setLoading] = useState(true)
  const [confirmDelete, setConfirmDelete] = useState("")
  const [doctorData, setDoctorData] = useState([])
  const [serverError, setServerError] = useState(false)
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()

  const handleDelete = (e) => {
    setConfirmDelete(e.target.id)
  }

  const deleteFunction = () => {
    const otions = {
      baseUrl: baseUrl, apiUrl: 'doctor', id: confirmDelete, dataState: doctorData, cookies: cookies,
      setDataState: setDoctorData, setConfirmDelete: setConfirmDelete, navigate: navigate, setServerError: setServerError
    }
    handleDeleteItem(otions)
  }

  useEffect(() => {
    fetch(`${baseUrl}/api/admin/doctor`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
      },
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        setDoctorData(data)
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
        <SubHeader subHead="All Doctors" btnName='Add new' btnPath='/dashboard/doctors/create' image={false} />
        <div className="rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-gray-color drop-shadow-lg text-center text-base text-dark-color ">
              <TableHead list={tableHeadList} />
              <tbody className=" border-gray-100 text-dark-color ">
                {doctorData.length === 0
                  ? (<tr>
                    <td colSpan="10" className='text-2xl text-gray-400 whitespace-nowrap py-[125px] text-center'>
                      No current Doctors
                    </td>
                  </tr>)
                  : (doctorData.map((doctor, index) => (
                    <tr key={doctor.id} className=" even:bg-gray-200 relative">
                      {confirmDelete == doctor.id && <ConfirmMsg state={setConfirmDelete} func={deleteFunction} />}
                      <th className="flex items-center justify-center gap-3 px-2 py-3">{index + 1}</th>
                      <td className="px-2 py-3 ">
                        <div className='min-w-[30px] flex items-center justify-center'>
                          {doctor.image
                            ? <img src={doctor.image} alt="admin" className='w-[30px] h-[30px] rounded-full border' />
                            : <BsFillPersonFill className='w-[30px] h-[30px] text-gray-600 bg-gray-200 p-1 rounded-full' />
                          }
                        </div>
                      </td>
                      <td className="px-2 py-3">{doctor.full_name}</td>
                      <td className="px-2 py-3">{doctor.speciality.name}</td>
                      <td className="px-2 py-3">{doctor.price}</td>
                      <td className="px-2 py-3" >{doctor.visits}</td>
                      <td className="px-2 py-3 flex justify-center items-center" >{
                        <Stars starsNumber={doctor.stars} />
                      }</td>
                      <td className="px-2 py-3">
                        <Link to={`/dashboard/doctors/preview/${doctor.full_name}`} state={doctor}>
                          <button className='details-btn'>Preview</button>
                        </Link>
                      </td>
                      <td className="px-2 py-3">
                        <Link to={`/dashboard/doctors/edit/${doctor.full_name}`} state={doctor}>
                          <button className='edit-btn'>Edit</button>
                        </Link>
                      </td>
                      <td className="px-2 py-3">
                        <button className='delete-btn' onClick={handleDelete} id={doctor.id}>Delete</button>
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

export default ContentDoctor