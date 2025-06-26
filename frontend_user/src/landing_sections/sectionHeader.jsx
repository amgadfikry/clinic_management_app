/* eslint-disable react/prop-types */

function SectionHeader({ span, title, paragraph, span2 = '' }) {
  return (
    <>
      <h3 className="text-center text-5xl font-bold text-teal-color mb-3">
        <span className=" text-gray-500 font-thin">{span}</span> {title} <span className=" text-gray-500 font-thin">{span2}</span>
      </h3>
      <p className="text-dark-color text-light text-center text-sm mb-16">{paragraph}</p>
    </>
  )
}

export default SectionHeader
