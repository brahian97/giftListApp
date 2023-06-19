import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addGiftListAsFavorite } from "../../actions/giftList";
import { findGiftListById } from "../../helpers/giftListHelpers";
import { PageHeader } from "../PageHeader/PageHeader";
import { LoadingScreen } from "../ui/LoadingScreen";
import { GiftCard } from './GiftCard';

export const GiftListShareScreen = () => {

  const { userId, giftListId } = useParams()
  const [finishLoad, setFinishLoad] = useState(false)
  const [giftList, setGiftList] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    const getGiftList = async () => {
      const response = await findGiftListById(giftListId, userId)
      setGiftList(response)
      setFinishLoad(true)
    }

    if (!giftList) getGiftList()

  }, [])

  const handleAddFavorite = () => {
    dispatch(addGiftListAsFavorite(userId, giftListId, giftList.title))
  }

  return finishLoad ? (
    <>
      <PageHeader />
      <div className='container my-5 rounded border border-dark py-4 px-5'>
        <div className='row' style={{ height: '50px' }}>
          <h2 className='text-center'>{giftList.title}</h2>
        </div>
        <div className='row'>
          <h4 className='col text-center my-4'>Regalos</h4>
          <div className='col-auto d-flex justify-content-denter align-items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width='16' height='16' onClick={() => { handleAddFavorite() }} viewBox="0 0 512 512" role='button'>
              <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
            </svg>
          </div>
        </div>
        <div className='row row-cols-1 row-cols-md-3 g-4 card-deck'>
          {
            giftList.gifts.map((gift, index) => (
              <GiftCard gift={gift} key={index} />
            ))
          }
        </div>
      </div>
    </>
  ) : (<LoadingScreen />)
}