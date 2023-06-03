import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types/user";
import { Status } from "../../types/status";
import { LoginFormValues } from "../../types/loginFormValues";
import { api, authApi } from "../../api/api";
import { getToken, removeToken, setToken } from "../../utils/token";

const namespace: string = 'auth';

export const fetchLogin = createAsyncThunk('auth/login', async (payload: LoginFormValues): Promise<User>  => {
    const { data } = await api.post<User>(`/${namespace}/login`, payload);
    setToken(data.accessToken);
    return data;
});

export const fetchLogout = createAsyncThunk('auth/logout', async ({ id }: Pick<User, 'id'>): Promise<void>  => {
    const { data } = await authApi.post<void>(`/${namespace}/logout`, { id })
    removeToken()
    return data;
});

export const getMe = createAsyncThunk('auth/get-me', async (): Promise<User>  => {
    const { data } = await authApi.get<User>(`/user/get-me`);
    return data;
});

export interface IUserState {
    data: User | null,
    status: Status
}

const initialState: IUserState = {
    data: null,
    status: 'idle',
}

const userSlice = createSlice({
    name: '@user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchLogin.pending, (state) => {
            state.data = null;
            state.status = 'pending';
        });
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'fulfilled';
        });
        builder.addCase(fetchLogin.rejected, (state) => {
            state.data = null;
            state.status = 'rejected';
        });
        builder.addCase(getMe.pending, (state) => {
            state.data = null;
            state.status = 'pending';
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'fulfilled';
        });
        builder.addCase(getMe.rejected, (state) => {
            state.data = null;
            state.status = 'rejected';
        });
        builder.addCase(fetchLogout.fulfilled, (state, action) => {
            state.data = null;
            state.status = 'logout';
            removeToken();
        });
    }
});

export const userReducer = userSlice.reducer;

export const {} = userSlice.actions;