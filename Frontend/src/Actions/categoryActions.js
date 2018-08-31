import axios from 'axios';

export const FETCH_ALL_CATEGORIES = 'fetchAllCategories';
export const FETCH_SINGLE_CATEGORY = 'fetchSingleCategory';


export const fetchAllCategories = () => (dispatch, getState) => {
    const AlreadyFetched = getState().category.allCategories ? true : false;
    if (!AlreadyFetched) {
        axios.get(`http://localhost:62152/api/categories`)
            .then(response => dispatch({
                type: FETCH_ALL_CATEGORIES,
                payload: response.data

            }))
    }
}

export const fetchSingleCategory = (id) => (dispatch, getState) => {
    const previousId = getState().category.currentCategory && getState().category.currentCategory.id;
    if (previousId !== id) {
        if (id > 0) {
            axios.get(`http://localhost:62152/api/categories/${id}`)
                .then(response => dispatch({
                    type: FETCH_SINGLE_CATEGORY,
                    payload: response.data

                })

                )
        }

        else {
            dispatch({
                type: FETCH_SINGLE_CATEGORY,
                payload: {}
            })
        }
    }
  
}
