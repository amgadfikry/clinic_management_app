import {
  useLocation, SubHeader, Stars, BsFillPersonFill
} from '../../import'


function PreviewDoctor() {
  const location = useLocation()
  const doctorsData = location.state

  function renderDoctorImage() {
    if (doctorsData.image) {
      return (
        <img
          src={doctorsData.image}
          alt="profile photo for doctor"
          className="w-[250px] h-auto block overflow-hidden rounded-2xl"
        />
      )
    } else {
      return (
        <BsFillPersonFill className="w-[250px] h-auto text-gray-600 bg-gray-200 p-1 rounded-2xl" />
      )
    }
  }

  function renderDoctorInfo() {
    return (
      <div className="flex flex-col items-center max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%]">
        <p className="font-bold text-lg">{doctorsData.full_name}</p>
        <p className="opacity-90 mt-1">{doctorsData.speciality.name}</p>
        <div>
          <Stars starsNumber={doctorsData.stars} />
        </div>
        <p className="opacity-90 mt-3 text-sm text-center">{doctorsData.details}</p>
        <div className="flex space-x-6 mt-5">
          <div className="flex flex-col space-y-1">
            <div className="flex justify-center items-center">
              {doctorsData.stop ? (
                <span className="w-[20px] h-[20px] rounded-full bg-red-500"></span>
              ) : (
                <span className="w-[20px] h-[20px] rounded-full bg-green-500"></span>
              )}
            </div>
            <span className="opacity-90 text-sm">
              {doctorsData.stop ? "Inactive" : "Active"}
            </span>
          </div>
          <p className="flex flex-col items-center">
            <span className="font-bold">{doctorsData.visits}</span>
            <span className="opacity-90 text-sm">Visits</span>
          </p>
          <p className="flex flex-col items-center">
            <span className="font-bold">{doctorsData.price}</span>
            <span className="opacity-90 text-sm">Price</span>
          </p>
        </div>
      </div>
    )
  }

  function renderAppointments() {
    if (doctorsData.appointments.length === 0) {
      return (
        <p className=" text-2xl text-gray-400 whitespace-nowrap">
          No current Appointments
        </p>
      )
    } else {
      return (
        <div className="flex flex-col space-y-2">
          <h3 className="mb-3 text-center font-medium text-lg">
            Doctor Appointments
          </h3>
          {doctorsData.appointments.map((app) => {
            return (
              <div key={app.id} className="flex items-center justify-between border-b py-2">
                <p className="text-sm px-1 ">{app.date}</p>
                {app.attend ? (
                  <span className="w-6 h-6 bg-green-600 rounded-full "></span>
                ) : (
                  <span className="w-6 h-6 bg-gray-500 rounded-full "></span>
                )}
              </div>
            )
          })}
        </div>
      )
    }
  }

  function renderTimes() {
    if (doctorsData.all_times.length === 0) {
      return (
        <p className=" text-2xl text-gray-400 whitespace-nowrap">
          No current Times
        </p>
      )
    } else {
      return (
        <div className="flex flex-col space-y-2">
          <h3 className="mb-3 text-center font-medium text-lg">Doctor time</h3>
          {doctorsData.all_times.map((time) => {
            return (
              <div key={time.id} className="flex items-center justify-between border-b py-2">
                <p className="text-sm px-1 ">{time.day}</p>
                <p className="text-sm px-1">from</p>
                <p className="text-sm px-1">
                  {time.start < 10 ? "0" + time.start + ":00" : time.start + ":00"}
                </p>
                <p className="text-sm px-1">to</p>
                <p className="text-sm px-1">
                  {time.end < 10 ? "0" + time.end + ":00" : time.end + ":00"}
                </p>
              </div>
            )
          })}
        </div>
      )
    }
  }

  function renderReviews() {
    if (doctorsData.reviews.length === 0) {
      return (
        <p className=" text-2xl text-gray-400 whitespace-nowrap">
          No current Reviews
        </p>
      )
    } else {
      return (
        <div className="flex flex-col space-y-2">
          <h3 className="mb-3 text-center font-medium text-lg">
            Doctor Reviews
          </h3>
          {doctorsData.reviews.map((rev) => {
            return (
              <div key={rev.id} className="flex items-center justify-between border-b py-2">
                <div className='mr-2'>
                  <Stars starsNumber={rev.stars} />
                </div>
                <p className="text-sm px-1 ">{rev.text}</p>
                <p className="text-sm px-1 ">{rev.created_at}</p>
              </div>
            )
          })}
        </div>
      )
    }
  }

  return (
    <section className="flex flex-col px-3 md:px-5 pb-[100px] text-dark-color">
      <SubHeader
        subHead="Doctor preview"
        btnName="Back"
        btnPath="/dashboard/doctors"
        image={false}
      />
      <div className="px-3 py-5 pb-8 flex flex-col items-center justify-center border-b border-gray-300">
        <div className="mb-5">{renderDoctorImage()}</div>
        {renderDoctorInfo()}
      </div>

      <div className="flex flex-wrap py-8 px-2">
        <div
          className={`w-full md:w-[calc(50%-10px)] min-h-[400px] bg-gray-color drop-shadow-lg rounded-xl px-2 py-4 
        ${doctorsData.appointments.length === 0 && " flex justify-center items-center"} flex-grow mb-5 md:mr-5 md:flex-grow-0`}
        >
          {renderAppointments()}
        </div>
        <div
          className={`w-full md:w-[calc(50%-10px)] min-h-[400px] bg-gray-color drop-shadow-lg rounded-xl px-3 py-6 
        ${doctorsData.all_times.length === 0 && " flex justify-center items-center"} flex-grow mb-5 md:flex-grow-0`}
        >
          {renderTimes()}
        </div>
        <div
          className={`w-full min-h-[400px] bg-gray-color drop-shadow-lg rounded-xl px-2 py-4 
        ${doctorsData.reviews.length === 0 && " flex justify-center items-center"} flex-grow`}
        >
          {renderReviews()}
        </div>
      </div>
    </section>
  )
}

export default PreviewDoctor