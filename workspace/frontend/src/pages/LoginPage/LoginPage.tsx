import { Link } from "react-router";
import "./LoginPage.scss";

export const LoginPage = () => {
    async function login() {}

    return (
        <div className="login-form">
            <form action={login}>
                <label>
                    Username
                    <input className="input" placeholder="enter username" type="text" />
                </label>
                <label>
                    Password
                    <input className="input" placeholder="●●●●" type="password" />
                </label>
                <div className="actions">
                    <button className="btn btn-primary">Login</button>
                    <Link to="/signup">or sign up</Link>
                </div>
            </form>
        </div>
    );
};
