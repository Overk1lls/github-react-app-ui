import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/authAPI';
import { branchesApi } from '../features/branch/branchAPI';
import { commitsApi } from '../features/commits/commitsAPI';
import { repositoriesApi } from '../features/repositories/repositoriesAPI';
import { userApi } from '../features/user/userAPI';
import organizationReducer from '../features/organization/organizationSlice';
import repositoryReducer from '../features/repositories/repositorySlice';

export const store = configureStore({
  reducer: {
    orgReducer: organizationReducer,
    repoReducer: repositoryReducer,
    [branchesApi.reducerPath]: branchesApi.reducer,
    [repositoriesApi.reducerPath]: repositoriesApi.reducer,
    [commitsApi.reducerPath]: commitsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(branchesApi.middleware)
      .concat(repositoriesApi.middleware)
      .concat(commitsApi.middleware)
      .concat(authApi.middleware)
      .concat(userApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
