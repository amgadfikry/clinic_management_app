/* eslint-disable no-unused-vars */
import {
  useState, useEffect, LoadingComponent, Link
} from '../import'
import error from '../assets/error.jpg'

function ServerError() {
  const [Loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  if (Loading) {
    return <LoadingComponent />
  } else {
    return (
      <div className="max-h-screen flex items-center justify-center py-5 overflow-hidden">
        <div className="container flex flex-col md:flex-row items-center justify-between md:px-5 text-gray-700">
          <div className="w-full lg:w-1/2 text-center md:text-left">
            <div className="text-7xl text-teal-color font-dark font-extrabold mb-8 "> 504</div>
            <p className="text-base md:text-lg font-light mb-8">
              OOPS! Something went wrong on our end.<br></br>
              We are working to resolve this issue and should be back running soon.
            </p>
            <button className='btn-dark'><Link to='/'>Homepage</Link></button>
          </div>
          <div className="w-full lg:flex lg:justify-end lg:w-1/2">
            <img src={error}
              className="max-w-[50%] md:max-w-full mx-auto max-h-1/2 block" alt="Page not found" />
          </div>
        </div>
      </div>
    )
  }
}

export default ServerError