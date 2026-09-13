// import { useMutation } from "@tanstack/react-query";
// import { authApi } from "../services/auth.api";
// import { useAppDispatch } from "@app/store/hooks";
// import { setCredentials } from "../auth.slice";
// import type { LoginCredentials } from "../types";

// export function useLogin() {
//   const dispatch = useAppDispatch();

//   return useMutation({
//     mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
//     onSuccess: (data) => {
//       dispatch(
//         setCredentials({
//           token: data.accessToken,
//           user: {
//             id: data.id,
//             username: data.username,
//             email: data.email,
//             firstName: data.firstName,
//             lastName: data.lastName,
//             gender: data.gender,
//             image: data.image,
//           },
//         }),
//       );
//     },
//   });
// }

import { useMutation } from "@tanstack/react-query";
import { authApi } from "../services/auth.api";
import { useAppDispatch } from "@app/store/hooks";
import { setCredentials } from "../auth.slice";
import { LOCAL_ADMIN_CREDENTIALS } from "@shared/constants/admin";
import type { LoginCredentials, LoginResponse } from "../types";


function buildLocalAdminResponse(): LoginResponse {
  return {
    id: -1,
    username: LOCAL_ADMIN_CREDENTIALS.username,
    email: "admin@shopease.local",
    firstName: "Store",
    lastName: "Admin",
    gender: "other",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=Admin",
    accessToken: "local-admin-token",
    refreshToken: "local-admin-refresh-token",
  };
}

function isLocalAdminLogin(credentials: LoginCredentials): boolean {
  return (
    credentials.username === LOCAL_ADMIN_CREDENTIALS.username &&
    credentials.password === LOCAL_ADMIN_CREDENTIALS.password
  );
}

export function useLogin() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials): Promise<LoginResponse> => {
      if (isLocalAdminLogin(credentials)) {
        return buildLocalAdminResponse();
      }
      return authApi.login(credentials);
    },
    onSuccess: (data) => {
      dispatch(
        setCredentials({
          token: data.accessToken,
          user: {
            id: data.id,
            username: data.username,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            image: data.image,
          },
        }),
      );
    },
  });
}