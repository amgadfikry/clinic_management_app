/* eslint-disable no-unused-vars */
import {
  useState, useEffect, Link, LoadingComponent
} from '../import'

function NotFound() {
  const [Loading, setLoading] = useState(true)

  useEffect(() => {
    const img = new Image()
    img.src = "https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
    img.onload = () => {
      setLoading(false)
    }
  }, [])

  if (Loading) {
    return <LoadingComponent />
  } else {
    return (
      <div className="h-screen w-screen bg-gray-color flex items-center justify-center relative">
        <p className='absolute bottom-1 left-1/2 translate-x-[-50%] text-xs text-gray-500'>
          Design By: Osalumense <a href='https://github.com/Osalumense' >Github</a>
        </p>
        <div className="container flex flex-col md:flex-row items-center justify-between md: px-5 text-gray-700">
          <div className="w-full lg:w-1/2 mx-8 text-center md:text-left">
            <div className="text-7xl text-teal-color font-dark font-extrabold mb-8"> 404</div>
            <p className="text-lg md:text-xl font-light mb-8">
              Sorry we could not find the page you are looking for
            </p>
            <button className='btn-dark'><Link to='/dashboard/'>Homepage</Link></button>
          </div>
          <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
            <img src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
              className="" alt="Page not found" />
          </div>
        </div>
      </div>
    )
  }
}

export default NotFound