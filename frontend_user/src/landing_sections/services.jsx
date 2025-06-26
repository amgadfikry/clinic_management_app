import {
  SectionHeader, FaHandHoldingHeart, FaUserNurse, FaRegCalendarCheck, FaShieldAlt
} from '../import'

const services = [
  {
    'id': 1, 'icon': <FaHandHoldingHeart />, 'title': 'All your healthcare needs',
    'description': 'Search and book a clinic visit, Different clinic that provide wide base of services for your needs'
  },
  {
    'id': 2, 'icon': <FaUserNurse />, 'title': 'Verified patient reviews',
    'description': 'Doctor ratings are from patients who booked and visited the doctor through our clinic.'
  },
  {
    'id': 3, 'icon': <FaRegCalendarCheck />, 'title': 'Your booking is confirmed',
    'description': 'our booking is automatically confirmed, and the doctor is notified of the booking details.'
  },
  {
    'id': 4, 'icon': <FaShieldAlt />, 'title': 'Book for free, and pay in the clinic',
    'description': "The examination or procedure fees stated on website are the actual fees with no extra charges."
  }
]

function Services() {
  return (
    <section className="relative overflow-hidden" id='services'>
      <div className='w-[20px] h-[50px] absolute right-0 top-10 bg-teal-color opacity-30'></div>
      <div className='w-[20px] h-[50px] absolute right-0 bottom-[200px] bg-yellow-color opacity-30'></div>
      <div className='py-16 container mx-auto px-2'>
        <SectionHeader span='Best' title='Services'
          paragraph='Providing best medical services, serve wide range of patients, andfullfilled their needs' />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10">
          {services.map(service => {
            return (
              <article key={service.id}
                className='flex flex-col flex-1 min-w-[200px] md:min-w-[250px] xl:min-w-[270px] overflow-hidden x
              p-3 justify-between'>
                <div className=' text-teal-color text-4xl border-b-2 pb-1 border-yellow-color w-fit'>
                  {service.icon}
                </div>
                <h4 className='text-2xl font-bold text-dark-color mb-auto mt-3'>{service.title}</h4>
                <p className='text-dark-color text-sm font-light mt-2'>{service.description}</p>
              </article>
            )
          })
          }
        </div>
      </div>
    </section>
  )
}

export default Services