import { db } from "../firebase/firebaseConfig"

export const loadGiftList = async (uid) => {
  const baseCollection = `${uid}/giftLists/lists`
  const giftListsSnap = await db.collection(baseCollection).get()
  const giftLists = []
  
  for(const giftListSnap of giftListsSnap.docs) {
    const giftsSnap = await db.collection(`${baseCollection}/${giftListSnap.id}/gifts`).get()
    const gifts = []
    giftsSnap.forEach(gift => { gifts.push({ id: gift.id, ...gift.data() }) })

    giftLists.push({
      id: giftListSnap.id,
      ...giftListSnap.data(),
      gifts: [...gifts]
    })
  }
  return giftLists
}

export const findGiftListById = async (id, uid) => {
  const baseCollection = `${uid}/giftLists/lists/${id}`
  const gifListSnap = await db.doc(baseCollection).get()
  const giftsSnap = await db.collection(`${baseCollection}/gifts`).get()
  const gifts = []

  giftsSnap.forEach(gift => { gifts.push({ id: gift.id, ...gift.data() }) })

  return {id: gifListSnap.id, ...gifListSnap.data(), gifts: [...gifts]}
}

