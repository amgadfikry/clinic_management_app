/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  FaUserDoctor, FaUserCheck, MdSchedule, FaMoneyBillTrendUp,
} from '../../import'

function OverviewPart({ overView }) {
  for (let i = 0; i < overView.length; i++) {
    if (overView[i]['name'] === 'Total doctors') {
      overView[i]['icon'] = <FaUserDoctor className="text-white text-3xl" />
    }
    if (overView[i]['name'] === 'Total users') {
      overView[i]['icon'] = <FaUserCheck className="text-white text-3xl" />
    }
    if (overView[i]['name'] === 'Appointments') {
      overView[i]['icon'] = <MdSchedule className="text-white text-3xl" />
    }
    if (overView[i]['name'] === 'Total income') {
      overView[i]['icon'] = <FaMoneyBillTrendUp className="text-white text-3xl" />
    }
  }

  return (
    <div className="flex flex-wrap items-center text-dark-color my-5">
      {
        overView.map((item, index) => (
          <div key={index} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-12px)] flex justify-between items-center py-2 px-3
            rounded-lg drop-shadow-lg bg-gray-color md:mr-3 mb-4">
            <div className="flex flex-col items-start">
              <h1 className="text-lg ">{item.name}</h1>
              <p className="text-bold font-bold text-2xl text-teal-color">{item.name === 'Total income' ? `$${item.value}` : item.value}</p>
            </div>
            <div className="w-14 h-14 bg-teal-color rounded-2xl flex justify-center items-center">
              {item.icon}
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default OverviewPart