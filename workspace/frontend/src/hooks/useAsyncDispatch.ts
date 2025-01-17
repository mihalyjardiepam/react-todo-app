import { useState } from "react";
import { Dispatch, UnknownAction } from "redux";

export interface AsyncDispatchOptions {
    throwError?: boolean,
    onError?: (error: unknown) => any,
}

export function useAsyncDispatch<
    TAction extends (...args: any[]) => ((dispatch: Dispatch<UnknownAction>) => Promise<any>),
>(
    dispatch: Dispatch<any>,
    action: TAction,
    options: AsyncDispatchOptions = {},
) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const dispatchAction = async (...arg: Parameters<TAction>) => {
        try {
            setIsLoading(true);
            let result = await dispatch(action(...arg));
            setError(null);

            return result;
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                setError(error)
            }

            if (options.onError) {
                options.onError(error);
            }

            if (options.throwError) {
                throw error;
            }
        } finally {
            setIsLoading(false);
        }
    }

    return [
        dispatchAction, isLoading, error
    ] as const;
}