export const Logger = (prefix: string) => {
    return {
        log: (message) => {
            console.log(`${prefix} ${message}`);
        },
        error: (error) => {
            console.error(`${prefix} ${error}`);
        }
    }
}
