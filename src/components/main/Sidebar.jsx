import { Link, useLocation } from 'react-router-dom';
import { Calendar1Icon, HomeIcon, User2Icon, UserSquare2Icon } from 'lucide-react';
import { logoutUser } from '../../reducers/user/userSlice';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../auth/hooks/useAuth';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const dispatch = useDispatch()
  const user = useAuth();

  const navLinks = [
    { label: 'Dashboard', to: '/', icon: <HomeIcon size={18} />, onlyForAdmin: false },
    { label: 'Add/Edit Events', to: '/events/manage', icon: <Calendar1Icon size={18} />, onlyForAdmin: false },
    { label: 'My Profile', to: '/profile/123', icon: <User2Icon size={18} />, onlyForAdmin: false },
    { label: 'Register Users', to: '/users/manage', icon: <UserSquare2Icon size={18} />, onlyForAdmin: true },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const renderLinks = () => (
  <nav className="flex flex-col gap-2 mt-4">
    {navLinks
      .filter(link => !link.onlyForAdmin || user.isAdmin)
      .map(({ label, to, icon }) => (
        <Link
          key={to}
          to={to}
          onClick={onClose}
          className={`flex items-center gap-4 px-4 py-3 rounded transition-colors
            ${location.pathname === to
              ? 'bg-indigo-500 font-semibold text-white rounded-xl'
              : 'text-gray-200 hover:bg-gray-600 hover:rounded-xl'
            }`}
        >
          {icon}
          {label}
        </Link>
      ))}
  </nav>
);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-80 bg-gray-900 shadow h-full p-4">
        <div className="flex items-center gap-4 mt-[20%] mb-2">
          <img src="/logo.png" alt="event-manager-logo" className="w-8 h-auto rounded" />
          <h2 className="text-xl font-bold text-gray-100 font-sans">Events Manager</h2>
        </div>
        <div className='mt-10'></div>
        {renderLinks()}

        <button
          onClick={handleLogout}
          className='bg-amber-700 cursor-pointer'
        >
          Logout
        </button>
      </aside>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}>
          <div
            className="absolute top-0 left-0 w-64 h-full bg-zinc-800 shadow p-4 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 mt-4 mb-2">
              <img src="/logo.png" alt="event-manager-logo" className="w-8 h-auto rounded" />
              <h2 className="text-xl font-bold text-gray-100 font-sans">Events Media</h2>
            </div>
            <hr className="border-t border-zinc-700 my-2" />
            {renderLinks()}
          </div>

          <button
            onClick={handleLogout}
            className='bg-amber-700 cursor-pointer'
          >
            Logout
          </button>
        </div>
      )}


    </>
  );
};

export default Sidebar;
