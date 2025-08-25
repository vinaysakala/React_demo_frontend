import React, {  useState,useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Login from '../components/forms/login';
import Register from '../components/forms/register';
import AddFirm from '../components/forms/addFirm';
import AddProduct from '../components/forms/addproduct';

const LandingPage = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [activePage, setActivePage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // NEW

    useEffect(() => {
        const token = localStorage.getItem('token');
        const vender = localStorage.getItem('Vender');
        if (token && vender) {
            setIsLoggedIn(true); 
            setActivePage(''); 
        }
    }, []);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setActivePage(''); // Clear the login form
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setActivePage('');
        localStorage.removeItem('token'); // Clear token on logout
        localStorage.removeItem('Vender'); // Clear user data on logout
    };

    return (
        <>
            <section className='langingSection'>
                <Navbar
                    onMenuClick={() => setSidebarVisible(true)}
                    onLoginClick={() => setActivePage('login')}
                    onRegisterClick={() => setActivePage('register')}
                    onLogOutclick={handleLogout}
                    isLoggedIn={isLoggedIn}
                />
                <Sidebar
                    visible={sidebarVisible}
                    onHide={() => setSidebarVisible(false)}
                    onMenuSelect={(page) => {
                        setActivePage(page);
                        setSidebarVisible(false);
                    }}
                />
                <div className="collectionsection">
                    {activePage === 'login' && <Login onLoginClick={handleLoginSuccess} />}
                    {activePage === 'register' && <Register onRegisterSuccess={() => setActivePage('login')} />}
                    {activePage === 'addFirm' && <AddFirm />}
                    {activePage === 'addProduct' && <AddProduct />}
                </div>
            </section>
        </>
    );
};

export default LandingPage;
