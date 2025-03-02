import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginUser } from "../../features/auth/authSlice"; // Importer l'action Redux
import { useNavigate } from "react-router-dom";
import "./form.css";

const Form = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (token) {
            navigate("/"); 
        }
    }, [token, navigate]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(loginUser({ email, password }));

        if (result.meta.requestStatus === "fulfilled") {
            navigate("/"); // Redirige si connexion réussie
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="input-remember">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="sign-in-button" disabled={loading}>
                {loading ? "Connexion en cours..." : "Sign In"}
            </button>
        </form>
    );
};

export default Form;
