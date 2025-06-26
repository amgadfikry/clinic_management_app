/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  useState, Link, baseUrl, useCookies, LoadingComponent, ConfirmMsg, useEffect,
  useNavigate, SubHeader, TableHead, handleDeleteItem, handleGet
} from '../../import'

function ContentSpeciality() {
  const tableHeadList = ['#', 'Name', 'Price', 'Doctors', 'Offers', 'Edit', 'Delete']
  const [specialitiesData, setspecialitiesData] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirmDelete, setConfirmDelete] = useState("")
  const [serverError, setServerError] = useState(false)
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()

  const handleDelete = (e) => {
    setConfirmDelete(e.target.id)
  }

  const deleteFunction = () => {
    const otions = {
      baseUrl: baseUrl, apiUrl: 'speciality', id: confirmDelete, dataState: specialitiesData, cookies: cookies,
      setDataState: setspecialitiesData, setConfirmDelete: setConfirmDelete, navigate: navigate, setServerError: setServerError
    }
    handleDeleteItem(otions)
  }

  useEffect(() => {
    fetch(`${baseUrl}/api/admin/speciality`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
      },
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        setspecialitiesData(data)
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
        <SubHeader subHead="All specialities" btnName='Create new' btnPath='/dashboard/specialities/create' image={false} />
        <div className="rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-gray-color drop-shadow-lg text-center text-base text-dark-color ">
              <TableHead list={tableHeadList} />
              <tbody className=" border-gray-100 text-dark-color ">
                {specialitiesData.length === 0
                  ? (<tr>
                    <td colSpan="7" className='text-2xl text-gray-400 whitespace-nowrap py-[125px] text-center'>
                      No current specialities
                    </td>
                  </tr>)
                  : (specialitiesData.map((speciality, index) => (
                    <tr key={speciality.id} className=" even:bg-gray-200 relative">
                      {confirmDelete == speciality.id && <ConfirmMsg state={setConfirmDelete} func={deleteFunction} />}
                      <th className="flex items-center justify-center gap-3 px-2 py-3">{index + 1}</th>
                      <td className="px-2 py-3 ">{speciality.name}</td>
                      <td className="px-2 py-3">{speciality.price}</td>
                      <td className="px-2 py-3">{speciality.doctors}</td>
                      <td className="px-2 py-3" >{speciality.offers}</td>
                      <td className="px-2 py-3">
                        <Link to={`/dashboard/specialities/edit/${speciality.name}`} state={speciality}>
                          <button className='edit-btn'>Edit</button>
                        </Link>
                      </td>
                      <td className="px-2 py-3">
                        <button className='delete-btn' onClick={handleDelete} id={speciality.id}>Delete</button>
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

export default ContentSpeciality