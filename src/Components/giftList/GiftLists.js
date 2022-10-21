import { useDispatch, useSelector } from 'react-redux';
import { addNewGiftList } from '../../actions/giftList';
import { GiftListCard } from './GiftListCard';
import { LoadingScreen } from '../ui/LoadingScreen';

export const GiftLists = () => {

  const { giftLists } = useSelector(state => state.giftLists)
  const { isLoadingGiftList } = useSelector(state => state.ui)
  const dispatch = useDispatch()

  const handleAddNewGiftList = () => {
    dispatch(addNewGiftList())
  }

  return isLoadingGiftList ? (
    <LoadingScreen message='Cargando listas de regalo'/>
  ) : (
    <div className='row row-cols-1 row-cols-md-3 g-4 card-deck'>
      <div className='col'>
        <div className='card h-100 shadow' onClick={handleAddNewGiftList}>
          <div className='card-body  w-100'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512' width='32' height='32' >
              <path d='M184.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L39 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L39 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM256 96c0-17.7 14.3-32 32-32H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H288c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H288c-17.7 0-32-14.3-32-32zM192 416c0-17.7 14.3-32 32-32H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32zM80 464c-26.5 0-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48z' />
            </svg>
            <h6 className='card-title'>Nueva lista</h6>
          </div>
          <div className='card-footer text-muted'>
            Crea tu nueva lista
          </div>
        </div>
      </div>
      {
        giftLists.map(giftList => (
          <GiftListCard key={giftList.id} giftList={giftList} />
        ))
      }
    </div>
  )
}