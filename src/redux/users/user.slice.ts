import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import UserService from "../../service/user.service";
import { type User, StoreUserPayload, UpdateUserPayload } from '../../interfaces/user.interface';

interface initialStateProps {
  users: User[] | null
  selectedUser: User | null,
  isLoading: boolean

}

const initialState: initialStateProps = {
  users: null,
  selectedUser: null,
  isLoading: false,
}

export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async (_payload, thunkAPI) => {
    try {
      const response = await UserService.getAllUsers();
      return { users: response.data.data }
    } catch (error) {
      const message = 'error';
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
      const message = 'error';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const storeUser = createAsyncThunk(
  'users/storeUser',
  async (payload: StoreUserPayload, thunkAPI) => {
    try {
      const response = await UserService.storeUser(payload);
      return { user: response.data.data }
    } catch (error) {
      const message = 'error';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/storeUser',
  async (payload: UpdateUserPayload, thunkAPI) => {
    try {
      const response = await UserService.updateUser(payload);
      return { user: response.data.data }
    } catch (error) {
      const message = 'error';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/storeUser',
  async (payload: string, thunkAPI) => {
    try {
      const response = await UserService.deleteUser(payload);
      return { user: response.data.data }
    } catch (error) {
      const message = 'error';
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload.users;
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
      })
      .addCase(storeUser.pending, (state) => {
        state.isLoading = true
      })
  }
});

export const { setSelectedUser } = userSlice.actions;
const reducer = userSlice.reducer;
export default reducer;