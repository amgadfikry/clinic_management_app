/* eslint-disable react/prop-types */
import { NavLink } from '../import';

function SidebarNavLink({ icon, name, route, sidebar }) {
  return (
    <NavLink to={route}>
      {({ isActive }) => (
        <li className={`sidebar-li group ${isActive && 'sidebar-active'}`}>
          <div className={`sidebar-icon ${isActive && 'sidebar-icon-active'}`} >
            {icon()}
          </div>
          <p className={`sidebar-text ${sidebar && 'scale-x-0 opacity-0'}`}>{name}</p>
        </li>
      )}
    </NavLink>
  )
}

export default SidebarNavLink