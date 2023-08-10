import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import UserService from "../../service/user.service";
import { type User, StoreUserPayload, UpdateUserPayload } from '../../interfaces/user.interface';
import { RootState } from "../store";
import axios from "axios";
import { useRouter } from "next/router";

interface initialStateProps {
  users: User[] | null
  selectedUser: User | null
  isLoading: boolean
  errors: string[] | null | undefined
  storePayload: StoreUserPayload | null
  updatePayload: UpdateUserPayload | null
  isRedirectStore: boolean
  isRedirectUpdate: boolean
}

const initialState: initialStateProps = {
  users: null,
  selectedUser: null,
  isLoading: false,
  errors: null,
  storePayload: null,
  updatePayload: null,
  isRedirectStore: false,
  isRedirectUpdate: false
}

export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async (_payload, thunkAPI) => {
    try {
      const response = await UserService.getAllUsers();
      return { users: response.data.data }
    } catch (error) {
      let message = error;
      if (axios.isAxiosError(error)) {
        message = error.response?.data.message.join()
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserById = createAsyncThunk(
  'users/getUserByID',
  async (payload: string, thunkAPI) => {
    try {
      const response = await UserService.getUserById(payload);
      return { user: response.data.data }
    } catch (error) {
      let message = error;
      if (axios.isAxiosError(error)) {
        message = error.response?.data.message.join()
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const storeUser = createAsyncThunk(
  'users/storeUser',
  async (_payload, thunkAPI) => {
    try {
      const payload = (thunkAPI.getState() as RootState).userReducer.storePayload;
      const response = await UserService.storeUser(payload as StoreUserPayload);
      return { user: response.data.data }
    } catch (error) {
      let message = error;
      if (axios.isAxiosError(error)) {
        message = error.response?.data.message.join()
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (_payload, thunkAPI) => {
    try {
      const payload = (thunkAPI.getState() as RootState).userReducer.updatePayload;
      const response = await UserService.updateUser(payload as UpdateUserPayload);
      return { user: response.data.data }
    } catch (error) {
      let message = error;
      if (axios.isAxiosError(error)) {
        message = error.response?.data.message.join()
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (payload: string, thunkAPI) => {
    try {
      const response = await UserService.deleteUser(payload);
      return { user: response.data.data }
    } catch (error) {
      let message = error;
      if (axios.isAxiosError(error)) {
        message = error.response?.data.message.join()
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload.user;
    },
    setStorePayload: (state, action) => {
      state.storePayload = action.payload;
    },
    setUpdatePayload: (state, action) => {
      state.updatePayload = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload.users;
        state.isRedirectStore = false
        state.isRedirectUpdate = false
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false
        state.selectedUser = action.payload.user;
      })
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(storeUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.storePayload = null
        state.errors = null
        state.isRedirectStore = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.updatePayload = null
        state.errors = null
        state.isRedirectUpdate = true
      })
      .addCase(storeUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(storeUser.rejected, (state, action) => {
        const errors = action.payload as string
        state.errors = errors?.split(',')
        state.isLoading = false
      })
      .addCase(updateUser.rejected, (state, action) => {
        const errors = action.payload as string
        state.errors = errors?.split(',')
        state.isLoading = false
      })
  }
});

export const { setSelectedUser, setStorePayload, setUpdatePayload } = userSlice.actions;
const reducer = userSlice.reducer;
export default reducer;