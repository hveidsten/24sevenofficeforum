export const fetchDataRequest = () => {
    return {type: 'FETCH_DATA_REQUEST'}
}

export const fetchDataSuccess = (payload) => {
    
    return {type: 'FETCH_DATA_SUCCESS', payload}
}

