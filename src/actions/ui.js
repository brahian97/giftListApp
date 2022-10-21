import { types } from "../types/types"

export const setError = (err) => ({
    type: types.uiSetError,
    payload: err
})

export const removeError = () => ({
    type: types.uiRemoveError
})

export const startLoading = () => ({
    type: types.uiStartLoading, 
})

export const finishLoading = () => ({
    type: types.uiFinishLoading,
})

export const startLoadingGiftList = () => ({
  type: types.uiStartLoadingGiftList
})

export const finishLoadingGiftList = () => ({
  type: types.uiFinishLoadingGiftList
})