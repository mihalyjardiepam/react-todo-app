import { NavLink } from "react-router";
import "./Navbar.scss";
import { MatIcon } from "../MatIcon";
import { useAppDispatch, useAppSelector } from "../../store";
import { logout } from "../../features/auth/authSlice";

export const Navbar = () => {
    const dispatch = useAppDispatch();
    const authState = useAppSelector((state) => state.auth);

    const resetLocalStorage = () => {
        localStorage.clear();
        location.reload();
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
                {authState.user ? (
                    <>
                        <li>
                            <div>Hey, {authState.user.username}</div>
                        </li>
                        <li>
                            <a href="#" onClick={() => dispatch(logout())}>
                                <MatIcon icon="logout" />
                                logout
                            </a>
                        </li>
                    </>
                ) : (
                    <li>
                        <NavLink to="/login">
                            <MatIcon icon="person" />
                            login
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
