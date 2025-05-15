import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"

const initialState={
    status:'',
    bookmarkedArticles:[],
    error:''
}

export const addBookmark=createAsyncThunk('bookmark/addBookmark',async({title,description,url,urlToImage,source,publisedAt},{rejectWithValue})=>{
   try {
    const {data}=await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/bookmarks/addbookmark`,{title,description,url,urlToImage,source,publisedAt},{
        withCredentials:true
      })

      if(!data.success){
        return rejectWithValue(data);
      }

      return data;
   } catch (error) {
      
      return rejectWithValue({message:error.message});   
    
   }
})

export const getBookmarks=createAsyncThunk('bookmark/getBookmarks',async(_,{rejectWithValue})=>{
    try {
     const {data}=await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/bookmarks/getBookmark`,{
         withCredentials:true
       })


       if(!data.success){
         return rejectWithValue(data);
       }
 
       return data;
    } catch (error) {
       return rejectWithValue(error.message);
     
    }
 })

 export const removeBoomark=createAsyncThunk('bookmark/removeBookmark',async(id,{rejectWithValue})=>{
  try {
   const {data}=await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/bookmarks/removeBookmark/${id}`,{
       withCredentials:true
     })


     if(!data.success){
       return rejectWithValue(data);
     }

     return data;
  } catch (error) {
    return rejectWithValue(error.message);
   
  }
})

const bookmarkSlice=createSlice({
    name:'bookmarks',
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        builder
          .addCase(getBookmarks.pending, (state) => {
            state.status = 'loading';
            state.error = '';
          })
          .addCase(getBookmarks.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.bookmarkedArticles = action.payload.bookmarks;
          })
          .addCase(getBookmarks.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
          })
          
      }
})

export default bookmarkSlice.reducer