/* eslint-disable react/prop-types */
import { NavLink } from '../import';

function SidebarNavLink({ icon, name, route }) {
  return (
    <NavLink to={route} className={`flex-1 flex w-full mb-3`}>
      {({ isActive }) => (
        <li className={`rounded-lg border border-transparent hover:text-teal-color hover:border-gray-200 flex items-center flex-1 flex-grow py-2 px-3
          hover:shadow-md ${isActive && 'text-teal-color border-teal-100 shadow-md'}`}>
          <div className={``} >
            {icon()}
          </div>
          <p className='flex-1 '>{name}</p>
        </li>
      )}
    </NavLink>
  )
}

export default SidebarNavLink