import { types } from "../types/types"

const initialState = {
  giftLists: [],
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

    default:
      return state
  }
}