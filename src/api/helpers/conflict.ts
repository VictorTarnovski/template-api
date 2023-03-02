export const ConflictError = (info: any) => {
    return {
        httpCode: 409,
        name: "ConflictError",
        causes: info
    }
}

