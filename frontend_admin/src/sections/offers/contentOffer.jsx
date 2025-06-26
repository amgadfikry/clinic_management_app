/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  useState, Link, baseUrl, useCookies, LoadingComponent, ConfirmMsg, useEffect,
  useNavigate, SubHeader, TableHead, handleDeleteItem, handleGet, DetailsOffer
} from '../../import'

function ContentOffer() {
  const tableHeadList = ['#', 'Title', 'speciality', 'Percentage', 'Expire date', 'Preview', 'Edit', 'Delete']
  const [loading, setLoading] = useState(true)
  const [confirmDelete, setConfirmDelete] = useState("")
  const [offersData, setOffersData] = useState([])
  const [serverError, setServerError] = useState(false)
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()
  const [seeDetails, setSeeDetails] = useState(false)
  const [detailsData, setDetailsData] = useState({})

  const handleDelete = (e) => {
    setConfirmDelete(e.target.id)
  }

  const handleDetails = (e) => {
    setSeeDetails(!seeDetails)
    setDetailsData(offersData.find(offer => offer.id == e.target.id))
  }

  const deleteFunction = () => {
    const otions = {
      baseUrl: baseUrl, apiUrl: 'offer', id: confirmDelete, dataState: offersData, cookies: cookies,
      setDataState: setOffersData, setConfirmDelete: setConfirmDelete, navigate: navigate, setServerError: setServerError
    }
    handleDeleteItem(otions)
  }

  useEffect(() => {
    fetch(`${baseUrl}/api/admin/offer`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
      },
      mode: 'cors',
    }).then(response => response.json())
      .then(data => {
        setOffersData(data)
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
        {seeDetails && <DetailsOffer detailsData={detailsData} setDetailsData={setDetailsData} setSeeDetails={setSeeDetails} />}
        <section className="flex flex-col px-3 md:px-5 pb-[100px] whitespace-nowrap">
          <SubHeader subHead="All Offers" btnName='Create new' btnPath='/dashboard/offers/create' image={false} />
          <div className="rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-gray-color drop-shadow-lg text-center text-base text-dark-color ">
                <TableHead list={tableHeadList} />
                <tbody className=" border-gray-100 text-dark-color ">
                  {offersData.length === 0
                    ? (<tr>
                      <td colSpan="7" className='text-2xl text-gray-400 whitespace-nowrap py-[125px] text-center'>
                        No current Offers
                      </td>
                    </tr>)
                    : (offersData.map((offer, index) => (
                      <tr key={offer.id} className=" even:bg-gray-200 relative">
                        {confirmDelete == offer.id && <ConfirmMsg state={setConfirmDelete} func={deleteFunction} />}
                        <th className="flex items-center justify-center gap-3 px-2 py-3">{index + 1}</th>
                        <td className="px-2 py-3 ">{offer.title}</td>
                        <td className="px-2 py-3">{offer.speciality.name}</td>
                        <td className="px-2 py-3">{parseInt(offer.percentage)}%</td>
                        <td className="px-2 py-3" >{offer.expire_date}</td>
                        <td className="px-2 py-3">
                          <button className='details-btn' onClick={handleDetails} id={offer.id}>Preview</button>
                        </td>
                        <td className="px-2 py-3">
                          <Link to={`/dashboard/offers/edit/${offer.title}`} state={offer}>
                            <button className='edit-btn'>Edit</button>
                          </Link>
                        </td>
                        <td className="px-2 py-3">
                          <button className='delete-btn' onClick={handleDelete} id={offer.id}>Delete</button>
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

export default ContentOffer