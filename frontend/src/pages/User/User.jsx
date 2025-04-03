import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Account from "../../components/Account/Account";
import './user.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { userProfile } from "../../features/profil/profilSlice";
import EditName from "../../components/EditName/EditName";
import { updateUserName } from "../../features/UpdateUserName/UpdateUserNameSlice";
import { useNavigate } from 'react-router-dom';


const User =()=>{
    const accountsData = [
        {
          title: "Argent Bank Checking (x8349)",
          amount: "$2,082.79",
          description: "Available Balance"
        },
        {
          title: "Argent Bank Savings (x6712)",
          amount: "$10,928.42",
          description: "Available Balance"
        },
        {
          title: "Argent Bank Credit Card (x8349)",
          amount: "$184.30",
          description: "Current Balance"
        }
    ];

    const dispatch = useDispatch();
    const { loading, user } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(userProfile());
    }, [dispatch]);

    useEffect(() => {
        if (!loading && !user) {
          navigate('/');
        }
      }, [loading, user, navigate]);

    const [isEditing, setIsEditing] = useState(false);

    const handleSave = (newUserName) => {
        dispatch(updateUserName({ userName: newUserName}))
            .then(() => {
                dispatch(userProfile()); // Recharge les nouvelles infos utilisateur
                setIsEditing(false);
            });
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    return(
        <div className="body-container">
            <Header />
            <main className="main bg-dark">
                <div className="header">
                    {isEditing ? (
                        <>
                            <h1>Edit user info</h1>
                            <EditName
                                    initialUserName={user?.userName || ""}
                                    initialFirstName={user?.firstName || ""}
                                    initialLastName={user?.lastName || ""}
                                    onSave={handleSave}
                                    onCancel={() => setIsEditing(false)}
                            />
                        </>
                        ) : (
                        <>
                            <h1>Welcome back <br />
                                {user ? `${user.firstName} ${user.lastName}` : "?"} !
                            </h1>
                            <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
                        </>
                    )}
                    {accountsData.map((item, index) =>(
                        <Account 
                            key={index}
                            title={item.title}
                            amount={item.amount}
                            description={item.description}
                        />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default User;