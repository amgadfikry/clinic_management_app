/* eslint-disable react/prop-types */
function TextInput({ type, label, placeholder, id, value, changeFunc, error }) {
  return (
    <p className='flex flex-col space-y-1 w-full shrink-0 md:w-[calc(50%-12px)] flex-grow lg:flex-grow-0 md:mr-3'>
      <label htmlFor={id} className='text-sm pl-1 text-bold'>{label}</label>
      <input type={type} name={id} id={id}
        className='border border-gray-300 py-2 px-3 rounded-md focus:outline-0  focus:border-gray-400'
        placeholder={placeholder} value={value} onChange={changeFunc} />
      <span className='text-xs text-red-500 pl-1 h-2'>{error}</span>
    </p>
  )
}

export default TextInput