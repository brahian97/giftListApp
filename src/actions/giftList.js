import { gif } from "@cloudinary/url-gen/qualifiers/format"
import Swal from "sweetalert2"
import { db } from "../firebase/firebaseConfig"
import { loadfavoritesGiftLists } from "../helpers/favoritesHelpers"
import { loadGiftList } from "../helpers/giftListHelpers"
import { types } from "../types/types"
import { finishFavoritesGiftList, finishLoadingGiftList, startLoadingFavoritesGiftList, startLoadingGiftList } from "./ui"

export const addNewGiftList = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth

    const newGiftList = {
      title: 'Nueva lista',
      isPrivate: true,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      gifts: []
    }

    const doc = await db.collection(`${uid}/giftLists/lists`).add(newGiftList)

    dispatch(activeGiftList(doc.id, newGiftList))
  }
}

export const activeGiftList = (id, giftList) => ({
  type: types.giftListActive,
  payload: {
    id,
    ...giftList
  }
})

export const startLoadingGiftLists = () => {
  return async (dispatch, getState) => {
    dispatch(startLoadingGiftList())
    const { uid } = getState().auth
    const giftLists = await loadGiftList(uid)

    dispatch(setGiftLists(giftLists))
    dispatch(finishLoadingGiftList())
  }
}

const setGiftLists = (giftLists) => ({
  type: types.giftListLoad,
  payload: giftLists
})

export const saveGiftList = (giftList) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    const { active } = getState().giftLists

    const giftListToFirestore = { ...giftList }
    delete giftListToFirestore.id

    console.log('------------------ SaveGiftList ------------------')
    console.log('activate: ', active.gifts)
    console.log('giftList: ', giftList.gifts)
    //Eliminar los regalos inexistentes
    active.gifts.forEach(gift => {
      giftList.gifts.find(element => element.id === gift.id) === undefined &&
        db.collection(`${uid}/giftLists/lists/${giftList.id}/gifts`).doc(gift.id).delete()
    })

    giftList.gifts.forEach(async gift => {
      console.log('gift to save: ', gift)
      try {
        if (gift.id) {
          db.collection(`${uid}/giftLists/lists/${giftList.id}/gifts`).doc(gift.id).set(gift)
        } else {
          const nuevo = await db.doc(`${uid}/giftLists/lists/${giftList.id}`).collection('gifts').add(gift)
          console.log('Nuevo: ', nuevo)
        }
      } catch (err) {
        Swal.fire('Error', err.message, 'error')
      }
    })

    delete giftListToFirestore.gifts

    db.doc(`${uid}/giftLists/lists/${giftList.id}`).update(giftListToFirestore).then(async () => {
      const giftsSnap = await db.collection(`${uid}/giftLists/lists/${giftList.id}/gifts`).get()
      const gifts = []
      giftsSnap.forEach(gift => { gifts.push({ id: gift.id, ...gift.data() }) })
      dispatch(refreshGiftList(giftList.id, giftList))
      dispatch(activeGiftList(giftList.id, { ...giftList, gifts }))
      console.log('GIFTS: ', giftList.gifts)
      //await db.doc(`${uid}/giftLists/lists/${giftList.id}`).get()
      Swal.fire('Lista de regalos guardada', '', 'success')
    }).catch(err => {
      Swal.fire('Error', err.message, 'error')
    })
  }
}

export const refreshGiftList = (id, giftList) => ({
  type: types.giftListUpdate,
  payload: {
    id, giftList
  }
})

export const deleteGiftList = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth

    await db.doc(`${uid}/giftLists/lists/${id}`).delete()
    dispatch(removeGiftList(id))
  }
}

const removeGiftList = (id) => ({
  type: types.giftListRemove,
  payload: {
    id
  }
})

export const addGiftListAsFavorite = (userId, giftListId, giftListTitle) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    const profileSnap = await db.doc(`${uid}/profile`).get()

    const newFavorite = {
      user: userId,
      userName: profileSnap.data().name,
      giftList: giftListId,
      title: giftListTitle,
      createdAt: new Date().getTime(),
    }

    await db.collection(`${uid}/favorites/lists`).add(newFavorite)
  }
}

export const startLoadingfavoritesGiftLists = () => {
  return async (dispatch, getState) => {
    dispatch(startLoadingFavoritesGiftList())
    const { uid } = getState().auth
    const favoritesGiftLists = await loadfavoritesGiftLists(uid)

    dispatch(setFavoritesGiftLists(favoritesGiftLists))
    dispatch(finishFavoritesGiftList())
  }
}

const setFavoritesGiftLists = (giftLists) => ({
  type: types.favoriteGiftListsLoad,
  payload: giftLists
})