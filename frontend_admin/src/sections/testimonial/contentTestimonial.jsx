/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  useState, Link, baseUrl, useCookies, LoadingComponent, ConfirmMsg, useEffect, FaEye, FaEyeSlash,
  useNavigate, SubHeader, TableHead, handleDeleteItem, handleGet, Stars, BsFillPersonFill, DetailsTestimonial
} from '../../import'

function ContentTestimonial() {
  const tableHeadList = ['#', '', 'User Name', 'Stars', 'Live', 'Preview', 'Delete']
  const [loading, setLoading] = useState(true)
  const [confirmDelete, setConfirmDelete] = useState("")
  const [testimonialData, setTestimonialData] = useState([])
  const [serverError, setServerError] = useState(false)
  const [detailsData, setDetailsData] = useState({})
  const [seeDetails, setSeeDetails] = useState(false)
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()

  const handleDelete = (e) => {
    setConfirmDelete(e.target.id)
  }

  const handleDetails = (e) => {
    setSeeDetails(!seeDetails)
    setDetailsData(testimonialData.find(testi => testi.id == e.target.id))
  }

  const deleteFunction = () => {
    const otions = {
      baseUrl: baseUrl, apiUrl: 'testimonial', id: confirmDelete, dataState: testimonialData, cookies: cookies,
      setDataState: setTestimonialData, setConfirmDelete: setConfirmDelete, navigate: navigate, setServerError: setServerError
    }
    handleDeleteItem(otions)
  }

  const handleLive = (e) => {
    const currentTesti = testimonialData.findIndex(testi => testi.id == e.target.id)
    const copy = [...testimonialData]
    const removedict = { 'live': !copy[currentTesti].live };

    fetch(`${baseUrl}/api/admin/testimonial/${e.target.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(removedict),
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        copy[currentTesti].live = !copy[currentTesti].live
        setTestimonialData(copy)
      })
      .catch((error) => {
        setServerError(true)
        navigate('/server504error')
      });
  }

  useEffect(() => {
    fetch(`${baseUrl}/api/admin/testimonial`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
      },
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        setTestimonialData(data)
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
      <>
        {seeDetails && <DetailsTestimonial detailsData={detailsData} setDetailsData={setDetailsData} setSeeDetails={setSeeDetails} />}
        <section className="flex flex-col px-3 md:px-5 pb-[100px] whitespace-nowrap">
          <SubHeader subHead="All Testimonials" btnName='back' btnPath='/dashboard/' image={false} />
          <div className="rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-gray-color drop-shadow-lg text-center text-base text-dark-color ">
                <TableHead list={tableHeadList} />
                <tbody className=" border-gray-100 text-dark-color ">
                  {testimonialData.length === 0
                    ? (<tr>
                      <td colSpan="7" className='text-2xl text-gray-400 whitespace-nowrap py-[125px] text-center'>
                        No current testiomnials
                      </td>
                    </tr>)
                    : (testimonialData.map((testi, index) => (
                      <tr key={testi.id} className=" even:bg-gray-200 relative">
                        {confirmDelete == testi.id && <ConfirmMsg state={setConfirmDelete} func={deleteFunction} />}
                        <th className="flex items-center justify-center gap-3 px-2 py-3">{index + 1}</th>
                        <td className="px-2 py-3 ">
                          <div className='min-w-[30px] flex items-center justify-center'>
                            {testi.user_image
                              ? <img src={testi.user_image} alt="admin" className='w-[30px] h-[30px] rounded-full border' />
                              : <BsFillPersonFill className='w-[30px] h-[30px] text-gray-600 bg-gray-200 p-1 rounded-full' />
                            }
                          </div>
                        </td>
                        <td className="px-2 py-3">{testi.user_name}</td>
                        <td className="px-2 py-3 flex justify-center items-center" >{
                          <Stars starsNumber={testi.stars} />
                        }</td>
                        <td className="px-2 py-3" >
                          <div className='text-2xl cursor-pointer flex justify-center items-center' id={testi.id}
                            onClick={(e) => handleLive(e)} >
                            {
                              testi.live
                                ? <FaEye className='text-green-500 text-2xl cursor-pointer' style={{ pointerEvents: "none" }} />
                                : <FaEyeSlash className='text-red-500 text-2xl cursor-pointer' style={{ pointerEvents: "none" }} />
                            }
                          </div>
                        </td>
                        <td className="px-2 py-3">
                          <button className='details-btn' onClick={handleDetails} id={testi.id}>Preview</button>
                        </td>
                        <td className="px-2 py-3">
                          <button className='delete-btn' onClick={handleDelete} id={testi.id}>Delete</button>
                        </td>
                      </tr>
                    )))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default ContentTestimonial