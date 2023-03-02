export const NotFoundError = (info: any) => {
    return {
        httpCode: 404,
        name: "NotFoundError",
        causes: info
    }
}

