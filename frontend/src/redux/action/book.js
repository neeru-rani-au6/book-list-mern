import { CREATEBOOK, ALLBOOK, FATCHING, UPDATEBOOK, DELETEBOOK, PUBLICBOOK } from '../type';
import axios from 'axios';

export const createBook = (book) => async dispatch => {
    try {
        const { data } = await axios({
            method: "post",
            url: `/book`,
            data: book,
        })
        dispatch({
            type: CREATEBOOK,
            payload: data.book
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: CREATEBOOK,
            payload: {
                error: error.response.data.error
            }
        })
    }
};

export const allBook = () => async dispatch => {
    try {
        //axios.defaults.withCredentials = true;
        dispatch({ type: FATCHING })
        const { data } = await axios(`/book`);
        dispatch({
            type: ALLBOOK,
            payload: data
        })
        //console.log(data)
    } catch (error) {
        console.log(error)
    }
};
export const publicBook = () => async dispatch => {
    try {
        const { data } = await axios(`/book/all`);
        dispatch({
            type: PUBLICBOOK,
            payload: data
        });
    } catch (error) {
        console.log(error)

    }
}

export const updateBook = (book) => async dispatch => {
    try {
        const { data } = await axios({
            method: 'Put',
            url: `/book/${book.id}`,
            data: {
                photoUrl: book.photoUrl,
                title: book.title,
                author: book.author,
                genre: book.genre
            }
        });
        dispatch({
            type: UPDATEBOOK,
            payload: book
        })
    } catch (error) {
        console.log(error)
    }
};

export const deleteBook = (id) => async dispatch => {
    try {
        const { data } = await axios({
            method: 'DELETE',
            url: `/book/${id}`
        });
        dispatch({
            type: DELETEBOOK,
            payload: { id }
        })

    } catch (error) {
        console.log(error)
    }
};

