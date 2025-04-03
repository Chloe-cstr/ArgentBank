import Logo from '../../assets/images/argentBankLogo.png';
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './header.css';
import { userProfile } from '../../features/profil/profilSlice';
import { logout } from '../../features/auth/authSlice';
import { clearProfile } from '../../features/profil/profilSlice';

const Header = () =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); // Hook pour rediriger l'utilisateur
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.profile);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        token && setIsLoggedIn(true);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearProfile());
        setIsLoggedIn(false);
        navigate("/"); 
    };

    useEffect(() => {
        dispatch(userProfile());
    }, [dispatch]);

    return(
       <header className="header">
            <nav className="main-nav">
                <NavLink to="/" className="main-nav-logo">
                    <img
                        className="main-nav-logo-image"
                        src={Logo}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </NavLink>
                <div>
                    {isLoggedIn && 
                        <NavLink to="/user" className="main-nav-item">
                            <i className="fa fa-user-circle"></i>
                            {user && `${user.userName}`}
                        </NavLink>
                    }
                    {isLoggedIn ? (
                        <NavLink to="/" className="main-nav-item" onClick={handleLogout}>
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </NavLink>
                    ) : (
                        <NavLink to="/signin" className="main-nav-item">
                            <i className="fa fa-user-circle"></i>
                            Sign In
                        </NavLink>
                    )}
                </div>
            </nav>
       </header>
    )
}

export default Header;