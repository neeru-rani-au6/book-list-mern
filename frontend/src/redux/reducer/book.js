import { CREATEBOOK, ALLBOOK, DELETEBOOK, UPDATEBOOK, PUBLICBOOK } from '../type';

const initalstate = {
    books: null,
    currentBook: null
}

const bookReducer = (state = initalstate, action) => {
    const { type, payload } = action;
    switch (type) {
        case CREATEBOOK:
            return { ...state, books: [...state.books, payload] };
        case ALLBOOK:
            return { ...state, books: payload };
        case PUBLICBOOK:
            return { ...state, books: payload };
        case DELETEBOOK:
            return {
                ...state, books: state.books.filter((books) => books._id !== payload.id)
            }
        case UPDATEBOOK:
            var newBook = [...state.books];
            newBook.forEach((book) => {
                if (book._id === payload.id) {
                    book.photoUrl = payload.photoUrl;
                    book.title = payload.title;
                    book.author = payload.author;
                    book.genre = payload.genre
                }
            })
            return {
                ...state, books: newBook
            }
        default:
            return state;
    }
}


export default bookReducer;