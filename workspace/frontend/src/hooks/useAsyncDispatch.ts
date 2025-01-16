import { useState } from "react";
import { Dispatch, UnknownAction } from "redux";

export function useAsyncDispatch<
    TAction extends (...args: any[]) => ((dispatch: Dispatch<UnknownAction>) => Promise<void>),
>(
    dispatch: Dispatch<any>,
    action: TAction
) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const dispatchAction = async (...arg: Parameters<TAction>) => {
        try {
            setIsLoading(true);
            await dispatch(action(...arg));
            setError(null);
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                setError(error)
            }
        } finally {
            setIsLoading(false);
        }
    }

    return [
        dispatchAction, isLoading, error
    ] as const;
}