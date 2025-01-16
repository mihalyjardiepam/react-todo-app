import { AsyncThunk } from "@reduxjs/toolkit";
import { useAppDispatch } from "../store";
import { useState } from "react";

export function useAsyncDispatcher
    <TAction extends AsyncThunk<any, any, any>>(
        dispatch: ReturnType<typeof useAppDispatch>,
        action: TAction
    ) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    // i honestly have no idea how to extract the return
    // type of the dispatch(action) invocation..
    const [result, setResult] = useState<any>(null);

    const dispatcher = async (arg?: Parameters<TAction>[0]) => {
        try {
            setLoading(true);
            setResult((await dispatch(action(arg))).payload);
            setError(null);
        } catch (error) {
            if (error instanceof Error) {
                setError(error);
            }
            setResult(null);
        }
        finally {
            setLoading(false);
        }
    }

    return [dispatcher, loading, error, result] as const;
}
