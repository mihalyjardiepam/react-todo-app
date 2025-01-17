import { NavLink } from "react-router";
import "./Navbar.scss";
import { MatIcon } from "../MatIcon";
import { connect, useDispatch } from "react-redux";
import { User } from "../../models/User";
import { AppState } from "../../store";
import { useAsyncDispatch } from "../../hooks/useAsyncDispatch";
import { logout as logoutThunk } from "../../features/auth/authReducer";

interface NavbarProps {
    user: User | null;
}

const Navbar = ({ user }: NavbarProps) => {
    const dispatch = useDispatch();
    const [logoutAction] = useAsyncDispatch(dispatch, logoutThunk);

    const resetLocalStorage = () => {
        localStorage.clear();
        location.reload();
    };

    const logoutUser = () => {
        logoutAction();
    };

    return (
        <div className="navbar">
            <ul>
                <li>
                    <NavLink to="/">
                        <MatIcon icon="list" />
                        home
                    </NavLink>
                </li>

                {user ? (
                    <>
                        <li>
                            <p>Hey, {user.username}</p>
                        </li>
                        <li>
                            <button className="btn" onClick={logoutUser}>
                                <MatIcon icon="logout" /> logout
                            </button>
                        </li>
                    </>
                ) : (
                    <li>
                        <NavLink to="/login">
                            <MatIcon icon="person" /> login
                        </NavLink>
                    </li>
                )}

                <li className="flex-spacer"></li>
                <li>
                    <button className="btn" onClick={resetLocalStorage}>
                        Clear localStorage
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default connect((state: AppState) => ({
    user: state.auth!.user,
}))(Navbar);
