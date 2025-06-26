/* eslint-disable react/prop-types */
function Textarea({ value, changeValue, error, placeholder, id }) {
  return (
    <p className='flex flex-col space-y-1 w-full shrink-0'>
      <textarea className='outline-none resize-none border border-gray-300 rounded-lg p-3'
        placeholder={placeholder} rows={5} name={id} id={id} value={value[id]} maxLength={500}
        onChange={(e) => changeValue({ ...value, [e.target.name]: e.target.value })}></textarea>
      <span className='text-xs text-red-500 pl-1 h-2'>{error}</span>
    </p>
  )
}

export default Textarea