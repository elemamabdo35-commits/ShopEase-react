// import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import { storage } from "@shared/lib/storage";
// import { STORAGE_KEYS } from "@shared/constants/storage-keys";
// import type { AuthState, AuthUser } from "./types";

// const initialState: AuthState = {
//   user: storage.get<AuthUser | null>(STORAGE_KEYS.AUTH_USER, null),
//   token: storage.get<string | null>(STORAGE_KEYS.AUTH_TOKEN, null),
//   isAuthenticated: Boolean(storage.get<string | null>(STORAGE_KEYS.AUTH_TOKEN, null)),
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setCredentials: (
//       state,
//       action: PayloadAction<{ user: AuthUser; token: string }>,
//     ) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.isAuthenticated = true;

//       storage.set(STORAGE_KEYS.AUTH_USER, action.payload.user);
//       storage.set(STORAGE_KEYS.AUTH_TOKEN, action.payload.token);
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;

//       storage.remove(STORAGE_KEYS.AUTH_USER);
//       storage.remove(STORAGE_KEYS.AUTH_TOKEN);
//     },
//   },
// });

// export const { setCredentials, logout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { storage } from "@shared/lib/storage";
import { STORAGE_KEYS } from "@shared/constants/storage-keys";
import { LOCAL_ADMIN_CREDENTIALS } from "@shared/constants/admin";
import type { AuthState, AuthUser } from "./types";

function computeIsAdmin(user: AuthUser | null): boolean {
  if (!user) return false;
  return user.username === LOCAL_ADMIN_CREDENTIALS.username;
}

const persistedUser = storage.get<AuthUser | null>(STORAGE_KEYS.AUTH_USER, null);

const initialState: AuthState = {
  user: persistedUser,
  token: storage.get<string | null>(STORAGE_KEYS.AUTH_TOKEN, null),
  isAuthenticated: Boolean(storage.get<string | null>(STORAGE_KEYS.AUTH_TOKEN, null)),
  isAdmin: computeIsAdmin(persistedUser),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: AuthUser; token: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isAdmin = computeIsAdmin(action.payload.user);

      storage.set(STORAGE_KEYS.AUTH_USER, action.payload.user);
      storage.set(STORAGE_KEYS.AUTH_TOKEN, action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isAdmin = false;

      storage.remove(STORAGE_KEYS.AUTH_USER);
      storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;