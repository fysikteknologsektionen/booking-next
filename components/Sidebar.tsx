import { signOut } from 'next-auth/react';
import NavLink from './NavLink';

const Sidebar: React.VFC = () => (
  <div className="offcanvas offcanvas-end" tabIndex={-1} id="sidebar" aria-labelledby="sidebar-title">
    <div className="offcanvas-header">
      <h4 className="offcanvas-title" id="sidebar-title">Admin panel</h4>
      <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
    </div>
    <div className="offcanvas-body">
      <ul className="nav nav-pills d-flex flex-column h-100">
        <li className="nav-item">
          <NavLink href="/dashboard" exact className="nav-link">
            Overview
          </NavLink>
        </li>
        <li>
          <NavLink href="/dashboard/users" className="nav-link">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink href="/dashboard/venues" className="nav-link">
            Venues
          </NavLink>
        </li>
        <li>
          <NavLink href="/dashboard/reservations" className="nav-link">
            Reservations
          </NavLink>
        </li>
        <button
          className="btn btn-outline-secondary mt-auto"
          type="button"
          onClick={() => signOut()}
        >
          Log out
        </button>
      </ul>
    </div>
  </div>
);

export default Sidebar;
