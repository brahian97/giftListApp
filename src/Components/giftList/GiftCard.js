import PropTypes from 'prop-types';
import Image from '../../assets/img/gift.jpg'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { parseGiftListDate } from '../../utils/utils';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { Field, Form, Formik } from 'formik';

export const GiftCard = ({ gift, handleDelete, handleUpdate }) => {

  const { name, url, price, images, createdAt, updatedAt } = gift
  const isPrivate = false
  const giftSwal = withReactContent(Swal)
  let cop = Intl.NumberFormat("es-ES");

  const dispatch = useDispatch()

  const handleActivateGift = () => {
    giftSwal.fire({
      showConfirmButton: false,
      html: <Formik
        initialValues={gift}
        onSubmit={values => {
          console.log('newValues: ', values)
          handleUpdate(values)
          Swal.fire({
            timer: 1000,
            timerProgressBar: true,
            title: 'Regalo guardado',
            icon: 'success'
          })
        }} >
        {({ values }) => (
          <Form className='container my-3 rounded border border-dark py-4 px-5'>
            <div className='row' style={{ height: '50px' }}>
              <Field type="text" name="name" className='text-center input-title' placeholder='Regalo' maxLength={50} required />
            </div>
            <div className="row" style={{ marginTop: '10px' }}>
              <Field component='textarea' className='w-100 input py-1' name='description' placeholder='Descripción max. 200 caracteres' maxLength={200} />
            </div>
            <div className="row" >
              <div className='d-flex justify-content-end'>
                <span style={{ fontSize: '10px' }}>{values.description.length}/200</span>
              </div>
            </div>
            <div className="row" >
              <Field type='url' className='w-100 input py-1' name='url' placeholder='URL' maxLength={1024} />
            </div>
            <div className='row' style={{ marginTop: '10px' }}>
              <div className='d-flex px-0'>
                <span className='input-span px-2'>$</span>
                <Field className='input w-100' name='price' placeholder='Precio' type='number' pattern='^\d+(\.|\,)\d{2}$' />
              </div>
            </div>
            <div className='row mt-3'>
              <button className='btn btn-primary' type="submit">Guardar</button>
            </div>
          </Form>
        )}
      </Formik>
    })
  }

  return (
    <div className='col'>
      <div className='card h-100 shadow'>
        {handleDelete &&
          <div className="card-header d-flex justify-content-end">
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 50, hide: 300 }}
              overlay={<Tooltip>Eliminar</Tooltip>}>
              <svg xmlns="http://www.w3.org/2000/svg" width='16' height='16' viewBox="0 0 320 512" role='button' onClick={handleDelete}>
                <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
              </svg>
            </OverlayTrigger>
          </div>
        }
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
  handleDelete: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired
}