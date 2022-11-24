import { db } from "../firebase/firebaseConfig"

export const loadfavoritesGiftLists = async (uid) => {
  const baseCollection = `${uid}/favorites/lists`
  const giftListsSnap = await db.collection(baseCollection).get()
  const favoritesGiftLists = []
  
  for(const giftListSnap of giftListsSnap.docs) {
    favoritesGiftLists.push({
      id: giftListSnap.id,
      ...giftListSnap.data(),
    })
  }
  return favoritesGiftLists
}

