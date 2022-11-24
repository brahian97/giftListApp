import { type } from "@testing-library/user-event/dist/type"
import { authTypes } from "../types/authTypes"
import { types } from "../types/types"

const initialState = {
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isLoadingGiftList: false,
  isLoadingFavoritesGiftLists: false
}

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiSetError:
      return {
        ...state,
        error: authTypes.errors[action.payload] ? authTypes.errors[action.payload] : 'Opps! Algo salió mal'
      }
    case types.uiRemoveError:
      return {
        ...state,
        error: null
      }
    case types.uiStartLoading:
      return {
        ...state,
        isLoading: true
      }
    case types.uiFinishLoading:
      return {
        ...state,
        isLoading: false
      }
    case types.uiStartLoadingGiftList:
      return {
        ...state,
        isLoadingGiftList: true
      }
    case types.uiFinishLoadingGiftList:
      return {
        ...state,
        isLoadingGiftList: false
      }
    case types.uiStartLoadingFavoritesGiftLists:
      return {
        ...state,
        isLoadingFavoritesGiftLists: true
      }
    case types.uiFinishLoadingFavoritesGiftLists:
      return {
        ...state,
        isLoadingFavoritesGiftLists: false
      }
    default:
      return state
  }
}