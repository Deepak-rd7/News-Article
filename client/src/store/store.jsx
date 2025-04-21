import {configureStore} from "@reduxjs/toolkit"
import articleReducer from '../slice/ArticleSlice'
import authReducer from "../slice/authSlice"
import bookmarkReducer from "../slice/BookmarkSlice"

export const store=configureStore({
    reducer:{
        articles:articleReducer,
        auth:authReducer,
        bookmarks:bookmarkReducer
    }
})