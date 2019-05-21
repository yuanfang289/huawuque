import * as types from './mutationTypes';

import apiIsLoginUser from 'api/apiIsLoginUser';
export const isLoginUser = async ({commit}) => {
  commit(types.CHECK_TOKEN_REQUEST);
  commit(types.CHECK_TOKEN_SUCCESS, await apiIsLoginUser());
};

export const serverError = ({commit}) => {
  commit(types.SERVER_ERROR);
};

export const serverErrorResumed = ({commit}) => {
  commit(types.SERVER_ERROR_RESUMED);
};

export const setLanguageEnUs = ({commit}, isEnUs) => {
  commit(types.LANGUAGE_EN_US, isEnUs);
};

import apiLogout from 'api/apiLogout';
export const logout = async ({commit}) => {
  commit(types.LOGOUT_REQUEST, await apiLogout());
};
