
import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
import LanguageSwitcher from "./LanguageSwitcher"
import { useTranslation } from "react-i18next";


const Navbar = () => {
    const { t } = useTranslation()
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }



    return (
        <header> 
            <div className="container">
                <Link to={"/"}>
                <h1>Rep Diary</h1>

                </Link>
                
                <nav>
                    {user && (
                        <div>
                            <span className="emailColor">{user.email.split('@')[0]}</span>
                            <button onClick={handleClick}>{t("logOut")}</button>
                            
                        </div>
                    )}
                    {!user && (
                        <div className="nav-buttons">
                            <Link to={"/login"}> {t("loginButton")}</Link>
                            <Link to={"/signup"}>{t("signUp")}</Link>
                            
                        </div>
                    )}
                    <LanguageSwitcher />
                </nav>

            </div>
        </header>
    )
}

export default Navbar