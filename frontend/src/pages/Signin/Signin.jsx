import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Form from "../../components/Form/Form";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import './signin.css';

const Signin = () =>{
    const { user, loading } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && user) {
          navigate('/');
        }
    }, [loading, user, navigate]);

    return(
        <div className="body-container">
            <Header />
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <Form />
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default Signin;