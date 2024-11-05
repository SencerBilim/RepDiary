import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useTranslation } from "react-i18next";

const Login = () => {
    const { t } = useTranslation(); // translation
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div className="login-page">
            <div className="hero-section">
                <div className="hero-content">
                    <p className="hero-text">{t("heroText")}</p> 
                    <h1 className="hero-head">{t("heroHeader")}</h1> 
                </div>
                <img src="/images/hero2.png" alt="Hero" className="hero-image" />
            </div>
            <form className="login" onSubmit={handleSubmit}>
                <h3>{t("loginHeader")}</h3>
                <label>{t("emailLabel")}</label> 
                <input 
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                />
                <label>{t("passwordLabel")}</label> 
                <input 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} 
                />
                <button disabled={isLoading}>{t("loginButton")}</button> 
                {error && <div className="error">{t("error")}: {error}</div>} 
            </form>
        </div>
    );
}

export default Login;
