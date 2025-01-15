import { Link, useNavigate } from "react-router";
import "./LoginSignupPage.scss";
import { useAppDispatch } from "../../store";
import { login, signup as signupAction } from "../../features/auth/authSlice";
import { SyntheticEvent, useRef } from "react";
import { enqueueSnackbar } from "notistack";
import { isRejected } from "@reduxjs/toolkit";

export interface LoginSignupPageProps {
    signup?: boolean;
}

export default ({ signup }: LoginSignupPageProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);

    async function dispatchForm(e: SyntheticEvent) {
        e.preventDefault();

        if (!usernameRef.current || !passwordRef.current) {
            return;
        }

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        if (signup) {
            if (!passwordConfirmRef.current) {
                return;
            }

            const passwordConfirm = passwordConfirmRef.current.value;

            if (passwordConfirm !== password) {
                return enqueueSnackbar({
                    message: "Passwords must match!",
                    variant: "error",
                });
            }

            const result = await dispatch(
                signupAction({
                    password,
                    username,
                })
            );

            if (!isRejected(result)) {
                navigate("/");
            }
        } else {
            const result = await dispatch(
                login({
                    password,
                    username,
                })
            );

            if (!isRejected(result)) {
                navigate("/");
            }
        }
    }

    return (
        <div className="login-form">
            <form onSubmit={dispatchForm}>
                <h2>{signup ? "Sign up" : "Login"}</h2>
                <label>
                    Username
                    <input
                        ref={usernameRef}
                        className="input"
                        name="username"
                        placeholder="enter username"
                        type="text"
                    />
                </label>
                <label>
                    Password
                    <input
                        ref={passwordRef}
                        className="input"
                        name="password"
                        placeholder="enter password"
                        type="password"
                    />
                </label>
                {signup ? (
                    <>
                        <label>
                            Confirm Password
                            <input
                                ref={passwordConfirmRef}
                                type="password"
                                className="input"
                                name="passwordConfirm"
                                placeholder="confirm password"
                            />
                        </label>
                        <div className="actions">
                            <button className="btn btn-primary">Sign up</button>
                            <Link to="/login">or login</Link>
                        </div>
                    </>
                ) : (
                    <div className="actions">
                        <button className="btn btn-primary">Login</button>
                        <Link to="/signup">or sign up</Link>
                    </div>
                )}
                <label></label>
            </form>
        </div>
    );
};
