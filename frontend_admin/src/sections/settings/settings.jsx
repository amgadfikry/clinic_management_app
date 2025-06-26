import {
  BsFillPersonFill, useSelector, adminDataState, ChangeInfo, ChangePassword
} from '../../import'

function Settings() {
  const adminData = useSelector(adminDataState)


  return (
    <section className=" text-dark-color ">
      <div className='w-full h-[100px] sm:h-[150px] md:h-[200px] bg-gradient-to-r from-teal-400 via-teal-color to-teal-500 '></div>
      <div className='flex flex-col px-7 pt-[60px] md:pt-[130px] pb-3 relative sm:pt-[100px] '>
        <div className='absolute top-0 left-5 translate-y-[-20%] flex items-center'>
          {adminData.image
            ? <img src={adminData.image} alt="admin" className='w-[60px] h-[60px] md:w-[128px] md:h-[128px] mr-1
              sm:w-[96px] sm:h-[96px] rounded-full border' />
            : <BsFillPersonFill className='w-[60px] h-[60px] md:w-[128px] md:h-[128px] text-gray-600 bg-gray-200 p-1  md:p-2 rounded-full
            sm:w-[96px] sm:h-[96px] mr-1' />
          }
          <div className='text-dark-color'>
            <h1 className='text-lg font-bold md:text-2xl sm:text-xl'>{adminData.admin_name}</h1>
            <p className='text-xs'>{adminData.email}</p>
          </div>
        </div>
        <ChangeInfo />
        <ChangePassword />
      </div>
    </section>
  )
}

export default Settings