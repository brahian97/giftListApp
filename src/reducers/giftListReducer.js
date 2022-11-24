import { types } from "../types/types"

const initialState = {
  giftLists: [],
  favorites: [],
  active: null,
}

export const giftListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.giftListAdd:
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          gifts: action.gifts,
          isPrivate: action.isPrivate,
          createdAt: action.createdAt
        }
      ]

    case types.giftListRemove:
      return {
        ...state,
        giftLists: state.giftLists.filter(giftList => giftList.id !== action.payload.id)
      }

    case types.giftListActive:
      return {
        ...state,
        active: {
          ...action.payload
        }
      }

    case types.giftListLoad:
      return {
        ...state,
        giftLists: [...action.payload]
      }

    case types.giftListUpdate:
      return {
        ...state,
        giftLists: state.giftLists.map(giftList => giftList.id === action.payload.id ? action.payload.giftList : giftList)
      }

    case types.favoriteGiftListsAdd:
      return [
        ...state,
        {
          gift: action.gift,
          user: action.user,
          createdAt: action.createdAt
        }
      ]

    case types.favoriteGiftListsLoad:
      return {
        ...state,
        favorites: [...action.payload]
      }

    default:
      return state
  }
}