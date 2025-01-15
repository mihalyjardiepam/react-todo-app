import { IDType } from "./IDType";
import { UnixTimestampMs } from "./UnixTimestampMs";

/**
 * Represents a User
 */
export interface User {
    /**
     * Unique ID of the user
     */
    id: IDType,

    /**
     * Username
     */
    username: string,

    /**
     * Created date timestamp
     */
    createdAt: UnixTimestampMs,
}
