import {
  BiRightArrowAlt, Link
} from '../../import'
import doctor from '../../assets/doctors.jpg'
import speciality from '../../assets/speciality.jpg'
import offer from '../../assets/offers.jpg'
import appointemnt from '../../assets/appointments.jpg'

function FeaturesPart() {
  const sections = [
    {
      'title': 'Control your staff', 'description': 'Easy way to add, modify, and preview your doctors.',
      'image': doctor, 'url': '/dashboard/doctors'
    },
    {
      'title': 'Expand your work', 'description': 'Add or remove a new speciality to your clinic in flexible way.',
      'image': speciality, 'url': '/dashboard/specialities'
    },
    {
      'title': 'Be special', 'description': 'Add new offers to populate your clinic.',
      'image': offer, 'url': '/dashboard/offers'
    },
    {
      'title': 'Oragnize your times', 'description': 'Organize your work and follow up akll appointments.',
      'image': appointemnt, 'url': '/dashboard/appointments'
    },
  ]

  return (
    <div className="flex flex-wrap items-center text-dark-color">
      {
        sections.map((item, index) => (
          <div key={index} className="w-full md:w-[calc(50%-12px)] flex justify-between items-center overflow-hidden
            rounded-lg drop-shadow-lg bg-gray-color md:mr-3 mb-4 relative md:justify-center group/main">
            <img src={item.image} alt={item.title} className='group-hover/main:scale-105 transition-all duration-300' />
            <div className="flex flex-col items-start absolute top-0 left-0 py-5 px-5">
              <h1 className="text-xl font-bold bg-gray-200 bg-opacity-60 py-1 px-2 rounded-lg">{item.title}</h1>
              <p className="font-light mt-3 bg-gray-200 bg-opacity-60 py-1 px-2  rounded-lg">{item.description}</p>
            </div>
            <Link to={item.url} className='absolute left-5 bottom-5 font-bold group flex bg-dark-color py-1 px-3 rounded-lg text-white'>
              Explore now <BiRightArrowAlt className="text-white text-2xl group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          </div>
        ))
      }
    </div>
  )
}

export default FeaturesPart