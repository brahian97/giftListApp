import { useEffect } from "react"
import { OverlayTrigger, Tooltip } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { startLoadingfavoritesGiftLists } from "../../actions/giftList"
import { PageHeader } from "../PageHeader/PageHeader"
import { LoadingScreen } from "../ui/LoadingScreen"

export const FavoritesScreen = () => {

  const dispatch = useDispatch()
  const { favorites } = useSelector(state => state.giftLists)
  const { isLoadingFavoritesGiftLists } = useSelector(state => state.ui)

  useEffect(() => {
    dispatch(startLoadingfavoritesGiftLists())
  }, [])

  const goToFavorite = (fav) => {
    const { protocol, host } = window.location
    window.location.href = `${protocol}//${host}/giftListApp/share/${fav.user}/${fav.giftList}`
  }

  const handleDelete = () => {

  }

  return !isLoadingFavoritesGiftLists ? (
    <>
      <PageHeader />
      <div className='container my-5 rounded border border-dark py-4 px-5'>
        <h3 className="text-center mb-3">Mis favoritos</h3>
        {
          favorites.length === 0 ?
            (<p className="text-center my-0">No tienes ningún favorito</p>) :
            favorites.map(fav => (
              <div key={fav.id} className='container my-5 rounded border border-dark py-4 px-4 shadow favorite d-flex justify-content-between' onClick={() => { goToFavorite(fav) }} role='button'>
                <div>
                  <p className="my-0 fw-bold d-inline">{fav.title} </p>
                  <span>por</span>
                  <p className="my-0 fw-bold d-inline"> {fav.userName}</p>
                </div>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 50, hide: 300 }}
                  overlay={<Tooltip>Eliminar</Tooltip>}>
                  <svg xmlns="http://www.w3.org/2000/svg" width='16' height='16' viewBox="0 0 320 512" role='button' onClick={handleDelete}>
                    <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                  </svg>
                </OverlayTrigger>
              </div>
            ))
        }
      </div>
    </>
  ) : (<LoadingScreen message="Cargando tus favoritos" />)
}