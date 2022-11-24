import PropTypes from 'prop-types';
import Image from '../../assets/img/gift.jpg'
import { useDispatch } from 'react-redux';
import { parseGiftListDate } from '../../utils/utils';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

export const GiftCard = ({ gift }) => {

  const { name, description, url, price, images, createdAt } = gift
  const giftSwal = withReactContent(Swal)
  let cop = Intl.NumberFormat("es-ES");

  const dispatch = useDispatch()

  const handleActivateGift = () => {
    giftSwal.fire({
      showConfirmButton: false,
      html:
        <div className='container my-3 rounded border border-dark py-4 px-5'>
          <div className='row' style={{ height: '50px' }}>
            {
              url ? (<a href={url}><h3 name="name" className='text-center'>{gift.name}</h3></a>) :
                (<h3 name="name" className='text-center'>{gift.name}</h3>)
            }
          </div>
          {
            description && (
              <div className="row" style={{ marginTop: '10px' }}>
                <p className='w-100 input py-1' name='description'>{gift.description}</p>
              </div>
            )
          }
          <div className='row' style={{ marginTop: '10px' }}>
            <div className='d-flex px-0'>
              <p className='w-100' name='price'>${!price ? '-' : price}</p>
            </div>
          </div>
        </div>
    })
  }

  return (
    <div className='col'>
      <div className='card h-100 shadow'>
        <img src={Image} className="card-img-top" alt="gift"></img>
        <div className='card-body w-100' onClick={handleActivateGift} role='button'>
          <h6 className='card-title'>{name ? name : '-'}</h6>
          <p><span>$</span>{price ? cop.format(price) : '0.00'}</p>
        </div>
        <div className='card-footer justify-content-center text-muted p-2'>
          <p style={{ marginBottom: '0' }}>Creado, <span>{parseGiftListDate(createdAt)}</span></p>
        </div>
      </div>
    </div>
  )
}

GiftCard.propTypes = {
  gift: PropTypes.object.isRequired,
}