/* eslint-disable react/prop-types */

function TableHead({ list }) {
  return (
    <thead className="bg-teal-color text-white text-base">
      <tr className=''>
        {
          list.map((item, index) => (
            <th scope="col" className="px-2 py-4 font-bold" key={index}>{item}</th>
          ))
        }
      </tr>
    </thead>
  )
}

export default TableHead