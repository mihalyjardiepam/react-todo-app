import { Link, useNavigate } from "react-router";
import "./LoginSignupPage.scss";
import { SyntheticEvent, useRef } from "react";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { signup as signupThunk, login as loginThunk } from "../../features/auth/authReducer";
import { useAsyncDispatch } from "../../hooks/useAsyncDispatch";

export interface LoginSignupPageProps {
    signup?: boolean;
}

export default ({ signup: isSignup }: LoginSignupPageProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [signupAction, isSigningIn, signupError] = useAsyncDispatch(dispatch, signupThunk, { throwError: true });
    const [loginAction, isLoggingIn, loginError] = useAsyncDispatch(dispatch, loginThunk, { throwError: true });

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

        if (isSignup) {
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

            signupAction({
                username,
                password,
            }).then(() => {
                navigate("/");
            });
        } else {
            loginAction({
                username,
                password,
            }).then(() => {
                navigate("/");
            });
        }
    }

    return (
        <div className="login-form">
            <form onSubmit={dispatchForm}>
                {loginError && <div className="alert alert-warn">{loginError.message}</div>}
                {signupError && <div className="alert alert-warn">{signupError.message}</div>}
                <h2>{isSignup ? "Sign up" : "Login"}</h2>
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
                {isSignup ? (
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
