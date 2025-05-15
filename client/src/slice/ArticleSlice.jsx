import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"

const initialState={

    buisnessStatus:'',
    teslaStatus:'',
    techCrunchStatus:'',
    gadgetArticlesStatus:'',
    buisnessArticles:[],
    teslaArticles:[],
    techCrunchArticles:[],
    gadgetsArticles:[],
    error:''
}

export const fetchBuisnessArticles=createAsyncThunk("articles/buisnessArticles",async ()=>{
    const {data}= await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/articles/buisness`)

    return data.articles;
})

export const fetchTeslaArticles=createAsyncThunk("articles/teslaArticles",async ()=>{
    const {data}= await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/articles/tesla`)

    return data.articles;
})

export const fetchTechCrunchArticles=createAsyncThunk("articles/techCrunchArticles",async ()=>{
    const {data}= await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/articles/techCrunch`)

    return data.articles;
})

export const fetchGadgetsArticles=createAsyncThunk("articles/gadgetsArticles",async ()=>{
    const {data}= await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/artciles/mobiles`)

    return data.articles;
})


const articleSlice=createSlice({
    name:'articles',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchBuisnessArticles.pending,(state)=>{
            state.buisnessStatus="loading"
        })
        .addCase(fetchBuisnessArticles.fulfilled,(state,action)=>{
            state.buisnessArticles=action.payload.articles
            state.buisnessStatus = "succeeded"
        })
        .addCase(fetchBuisnessArticles.rejected,(state,error)=>{  
            state.buisnessStatus = "failed";
            state.error=error
        })
        .addCase(fetchTeslaArticles.pending,(state)=>{
            state.teslaStatus="loading"
        })
        .addCase(fetchTeslaArticles.fulfilled,(state,action)=>{
            state.teslaArticles=action.payload.articles
            state.teslaStatus = "succeeded";
        })
        .addCase(fetchTeslaArticles.rejected,(state,error)=>{  
            state.teslaStatus = "failed";
            state.error=error
        })
        .addCase(fetchTechCrunchArticles.pending,(state)=>{
            state.techCrunchStatus="loading"
        })
        .addCase(fetchTechCrunchArticles.fulfilled,(state,action)=>{
            state.techCrunchArticles=action.payload.articles
            state.techCrunchStatus="succeded"
        })
        .addCase(fetchTechCrunchArticles.rejected,(state,error)=>{  
            state.techCrunchStatus = "failed";
            state.error=error
        })
        .addCase(fetchGadgetsArticles.pending,(state)=>{
            state.gadgetArticlesStatus="loading"
        })
        .addCase(fetchGadgetsArticles.fulfilled,(state,action)=>{
            state.gadgetsArticles=action.payload.articles
            state.gadgetArticlesStatus="succeded"
        })
        .addCase(fetchGadgetsArticles.rejected,(state,error)=>{  
            state.gadgetArticlesStatus = "failed";
            state.error=error
        })
        
    }
})


export default articleSlice.reducer;