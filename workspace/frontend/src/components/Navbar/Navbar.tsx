import { NavLink } from "react-router";
import "./Navbar.scss";
import { MatIcon } from "../MatIcon";

export const Navbar = () => {
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
