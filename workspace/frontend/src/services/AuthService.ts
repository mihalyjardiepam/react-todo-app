import { AuthCredentials } from "../models/Auth";
import { User } from "../models/User";

export interface AuthService {
    getUser(): Promise<User | null>;

    login(credentials: AuthCredentials): Promise<User | never>;

    signup(credentials: AuthCredentials): Promise<User | never>;

    logout(): Promise<void>;
}
