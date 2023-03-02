export const UnauthorizedError = (info: any) => {
    return {
        httpCode: 401,
        name: "UnauthorizedError",
        causes: info
    }
}

