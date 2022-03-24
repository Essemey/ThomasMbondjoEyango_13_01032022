

export const checkToken = (urlToken, storageToken, profile) => {
    if (urlToken) {
        return ['INITIALIZATION', urlToken]
    }
    if (storageToken && !profile) {
        return ['REFRESH', storageToken]
    }
    if (storageToken && profile) {
        return ['NAVIGATE', storageToken]
    }

    return [null, null]
}

