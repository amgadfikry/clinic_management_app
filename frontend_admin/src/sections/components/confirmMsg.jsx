/* eslint-disable react/prop-types */
function ConfirmMsg({ state, func }) {

  const handleClose = () => {
    state("")
  }

  return (
    <td className="fixed justify-center items-center top-1/2 left-1/2 drop-shadow-lg flex z-10
      translate-x-[-50%] translate-y-[-50%]">
      <div className="bg-gray-200 min-w-[300px] max-w-[600px] py-6 px-8 rounded-lg ">
        <p className='mb-5 text-dark-color'>Are you sure You want to delete item ?</p>
        <div className="flex justify-center">
          <button className="py-1 px-3 text-medium bg-teal-color rounded-lg transition-all duration-300 cursor-pointer
          hover:bg-dark-color text-white mr-4" onClick={func}>Yes</button>
          <button className="py-1 px-3 text-medium bg-teal-color rounded-lg transition-all duration-300 cursor-pointer
          hover:bg-dark-color text-white" onClick={handleClose}>No</button>
        </div>
      </div>
    </td>
  )
}

export default ConfirmMsg