import { hashString, verifyHash } from "../lib/cryptoUtils";
import { generateId } from "../lib/generate-id";
import { AuthCredentials } from "../models/Auth";
import { IDType } from "../models/IDType";
import { User } from "../models/User";
import { AuthService } from "./AuthService";

const ID_LENGTH = 12;
const AUTH_LOCALSTORAGE_KEY = "users";
const AUTH_CURRENT_USER_KEY = "current_user_id";

interface LocalStorageUser extends User {
    password: string;
}

export class AuthLocalStorageService implements AuthService {
    constructor() {
        if (localStorage.getItem(AUTH_LOCALSTORAGE_KEY) == null) {
            this._writeLocalStorage([]);
        }
    }

    /**
     * Simulates an API returning the current authenticated user
     * stored in an auth cookie.
     * @returns The current User
     */
    async getUser(): Promise<User | null> {
        const currentUserId = this._getCurrentAuthenticatedUserId();

        if (!currentUserId) {
            return null;
        }

        const allUsers = this._readLocalStorage();

        const user = allUsers.find(user => user.id === currentUserId)

        if (!user) {
            await this.logout();
            return null;
        }

        return {
            id: user.id,
            createdAt: user.createdAt,
            username: user.username
        }
    }

    async login(credentials: AuthCredentials): Promise<User | never> {
        const { username, password } = credentials;
        const users = this._readLocalStorage();

        const user = users.find(user => user.username === username);
        if (!user) {
            throw new Error("Invalid username.");
        }

        if (!await verifyHash(password, user.password)) {
            throw new Error("Invalid password.");
        }

        this._setCurrentAuthenticatedUserId(user.id);

        return {
            createdAt: user.createdAt,
            id: user.id,
            username: user.username
        }
    }

    async signup(credentials: AuthCredentials): Promise<User | never> {
        const users = this._readLocalStorage();

        if (users.findIndex(user => user.username == credentials.username) != -1) {
            throw new Error("Username is taken.");
        }

        const newUser: LocalStorageUser = {
            id: generateId(ID_LENGTH),
            createdAt: new Date().getTime(),
            password: await hashString(credentials.password),
            username: credentials.username
        }

        users.push(newUser);
        this._writeLocalStorage(users);

        return {
            createdAt: newUser.createdAt,
            id: newUser.id,
            username: newUser.username
        };
    }

    async logout(): Promise<void> {
        this._setCurrentAuthenticatedUserId(null);
    }

    private _setCurrentAuthenticatedUserId(userId: IDType | null) {
        if (userId) {
            localStorage.setItem(AUTH_CURRENT_USER_KEY, userId);
        } else {
            localStorage.removeItem(AUTH_CURRENT_USER_KEY);
        }
    }

    private _getCurrentAuthenticatedUserId(): IDType | null {
        return localStorage.getItem(AUTH_CURRENT_USER_KEY);
    }

    private _readLocalStorage(): LocalStorageUser[] {
        return JSON.parse(localStorage.getItem(AUTH_LOCALSTORAGE_KEY) || "[]");
    }

    private _writeLocalStorage(users: LocalStorageUser[]) {
        localStorage.setItem(AUTH_LOCALSTORAGE_KEY, JSON.stringify(users));
    }
}
