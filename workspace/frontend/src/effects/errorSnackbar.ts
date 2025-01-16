import { createListenerMiddleware, isRejected } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { RootState } from "../store";

export const errorListener = createListenerMiddleware<RootState>();

errorListener.startListening({
    effect: (action, _) => {
        if (isRejected(action)) {
            enqueueSnackbar({
                variant: "error",
                message: action.error.message
            })
        }
    },
    predicate: (action) => {
        return action.type.includes("rejected")
    },
});
