/* eslint-disable react/prop-types */
function SubmitBtn({ value, error, cancel, success, successMsg }) {
  return (
    <div className='w-full flex justify-end items-start pr-2 pt-5 relative pb-5'>
      {success && <p className='text-green-500 text-sm absolute left-0 md:bottom-[10%] bottom-0'>
        {successMsg}</p>}
      <div  value='Cancel' onClick={cancel}
        className='border border-teal-color rounded-3xl px-4 py-1 text-teal-color font-medium cursor-pointer ml-auto
        hover:bg-dark-color hover:border-dark-color hover:text-white transition-all duration-300 mr-2'>Cancel</div>
      <input type="submit" value={value}
        className='border border-teal-color rounded-3xl px-4 py-1 text-white font-medium cursor-pointer
        hover:bg-dark-color hover:border-dark-color hover:text-white transition-all duration-300 mr-2
        bg-teal-color'></input>
      <div className="text-red-500 text-xs mt-2 h-2 text-right pr-2 w-full absolute bottom-[10%] right-0">{error}</div>
    </div>
  )
}

export default SubmitBtn