/* eslint-disable react/prop-types */
function TablePart({ appointments, doctors }) {
  const listAppointments = ['Name', 'Speciality', 'Doctor', 'Price', 'Time', 'Status']
  const doctorsList = ['name', 'status']
  return (
    <div className="flex flex-col my-8 md:flex-row  md:items-start ">
      <div className="rounded-lg overflow-hidden w-full md:w-[calc(65%-12px)] h-[400px] md:mr-3 md:mb-0 mb-5 drop-shadow-lg bg-gray-color">
        <div className="overflow-x-auto">
          <h2 className="bg-gray-color text-center py-2 font-light" >Appointments</h2>
          <table className="w-full border-collapse bg-gray-color drop-shadow-lg text-center text-sm text-dark-color ">
            <thead className="  text-base border-b">
              <tr className=''>
                {
                  listAppointments.map((item, index) => (
                    <th scope="col" className="px-2 py-4 font-light text-sm" key={index}>{item}</th>
                  ))
                }
              </tr>
            </thead>
            <tbody className=" border-gray-100 text-dark-color ">
              {appointments.length === 0
                ? (<tr>
                  <td colSpan="6" className='text-2xl text-gray-400 whitespace-nowrap py-[125px] text-center'>
                    No current appointments
                  </td>
                </tr>)
                : (appointments.map((app) => (
                  <tr key={app.id} className="border-b">
                    <td className="px-2 py-3 ">{app.user_name}</td>
                    <td className="px-2 py-3">{app.speciality}</td>
                    <td className="px-2 py-3">{app.doctor_name}</td>
                    <td className="px-2 py-3" >{app.price}</td>
                    <td className="px-2 py-3" >{app.date}</td>
                    <td className="px-2 py-3 flex justify-center items-center">
                      {
                        app.attend
                          ? (<span className="w-6 h-6 bg-green-600 rounded-full "></span>)
                          : (<span className="w-6 h-6 bg-gray-500 rounded-full "></span>)
                      }
                    </td>
                  </tr>
                )))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="rounded-lg overflow-hidden w-full md:w-[calc(35%-12px)] h-[400px] drop-shadow-lg bg-gray-color">
        <div className="overflow-x-auto">
          <h2 className="bg-gray-color text-center py-2 font-light" >Doctors</h2>
          <table className="w-full border-collapse bg-gray-color drop-shadow-lg text-left text-sm text-dark-color ">
            <thead className="  text-base border-b">
              <tr className=''>
                {
                  doctorsList.map((item, index) => (
                    <th scope="col" className="px-2 py-4 font-light text-sm" key={index}>{item}</th>
                  ))
                }
              </tr>
            </thead>
            <tbody className=" border-gray-100 text-dark-color ">
              {doctors.length === 0
                ? (<tr>
                  <td colSpan="2" className='text-2xl text-gray-400 whitespace-nowrap py-[125px] text-center'>
                    No current doctors
                  </td>
                </tr>)
                : (doctors.map((doc) => (
                  <tr key={doc.id} className="border-b font-light">
                    <td className="px-2 py-3 ">{doc.full_name}</td>
                    <td className="px-2 py-3 flex justify-left items-center">
                      {
                        doc.stop
                          ? (<span className=" bg-red-600 rounded-lg text-white py-1 px-2 text-sm ">Inactive</span>)
                          : (<span className=" bg-green-600 rounded-lg text-white py-1 px-2 text-sm">Active</span>)
                      }
                    </td>
                  </tr>
                )))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TablePart