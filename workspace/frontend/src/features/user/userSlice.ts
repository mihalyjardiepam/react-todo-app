import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { User } from "../../models/User";

const createAppSlice = buildCreateSlice({
    creators: {
        asyncThunk: asyncThunkCreator
    }
});

export const userSlice = createAppSlice({
    name: "user",
    initialState: {
        user: <User | null>null
    },
    reducers: (create => ({

    }))
});
