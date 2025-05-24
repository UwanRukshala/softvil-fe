import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/main/Sidebar';

const MainLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const toggleMenu = () => setIsMenuOpen(prev => !prev);
    const { user } = useSelector(state => state.user);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="flex h-screen w-full bg-gray-950 text-[#f1f1f1]">
            <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            <div className="flex flex-col flex-1 bg-[#0d0d0d]">
                {/* <Header isMenuOpen={isMenuOpen} onToggleMenu={toggleMenu} /> */}

                <main className="p-4 overflow-y-auto flex-1 bg-gray-950 border-l border-[rgba(59,62,62,0.05)]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
