import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"

const initialState={
    status:'',
    loggedIn: false,
    
}

const axiosConfig = {
  withCredentials: true, 
};

export const register = createAsyncThunk('auth/register',async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        'http://localhost:3000/users/register',
        { username, email, password },
        axiosConfig
      );

      if (!data.success) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue({ message:  error.message });
    }
  }
);

export const login = createAsyncThunk('auth/login',async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        'http://localhost:3000/users/login',
        { email, password },
        axiosConfig
      );

      if (!data.success) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

export const logout=createAsyncThunk('auth/logout',async()=>{
    const {data}=await axios.post("http://localhost:3000/users/logout",{},{
        withCredentials:true
    }
        
    )

    return data;
})

export const checkAuth=createAsyncThunk('auth/checkAuth',async(_,{ rejectWithValue })=>{
  try {
    const {data}=await axios.get('http://localhost:3000/users/checkAuth',{
      withCredentials:true
    })
 
    if(!data.success){
      return rejectWithValue(data)
    }

    return data;
  } catch (error) {
    rejectWithValue({message:error.message});
  }
})


const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setLoggedIn:(state)=>{
            state.loggedIn = true
        },
        setLoggedOut:(state)=>{
          state.loggedIn=false
        }
    }

})

export default authSlice.reducer;

export const {setLoggedIn,setLoggedOut}=authSlice.actions;