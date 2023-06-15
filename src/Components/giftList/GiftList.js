import { Field, FieldArray, Form, Formik } from "formik";
import { constants } from '../../constants/constants';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveGiftList } from '../../actions/giftList';
import { GiftCard } from './GiftCard';
import Swal from "sweetalert2";
import { generateURL } from "../../helpers/giftListHelpers";

export const GiftList = ({ giftList }) => {

  const dispatch = useDispatch()
  const { uid } = useSelector(state => state.auth)
  const { active } = useSelector(state => state.giftLists)

  /* useEffect(() => {
    console.log('Active has changed ', active)
  }, [active]) */

  const handleShare = () => {
    navigator.clipboard.writeText(generateURL(uid, giftList.id))
    .then(() => {
      Swal.fire({
        showConfirmButton: false,
        timer: 800,
        timerProgressBar: true,
        title: 'Enlace copiado al portapapeles',
        customClass: {
          title: 'modal-title'
        }
      })
    })
    .catch(err => {
      Swal.fire({
        showConfirmButton: false,
        timer: 800,
        timerProgressBar: true,
        title: `Ha ocurrido un error al copiar el enlace. ${err}`
      })
    });
  }

  return (
    <Formik
      enableReinitialize 
      initialValues={{ ...active }}
      onSubmit={values => {
        console.log('GiftList to save: ', values)
        dispatch(saveGiftList(values));
      }}
    >
      {({ values }) => (
        <Form className='container my-5 rounded border border-dark py-4 px-5'>
          <div className='row' style={{ height: '50px' }}>
            <Field
              type="text"
              name="title"
              className='text-center input-title'
              maxLength={100}
            />
          </div>

          <FieldArray
            name="gifts"
            render={gifts => (
              <>
                <div className='row'>
                  <div className='col-auto d-flex justify-content-denter align-items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width='16' height='16' viewBox="0 0 512 512" onClick={handleShare} role='button'>
                      <path d="M512 208L320 384H288V288H208c-61.9 0-112 50.1-112 112c0 48 32 80 32 80s-128-48-128-176c0-97.2 78.8-176 176-176H288V32h32L512 208z" />
                    </svg>
                  </div>
                  <h4 className='col text-center my-4'>Regalos</h4>
                  <div className='col-auto d-flex justify-content-denter align-items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width='16' height='16' viewBox="0 0 448 512" onClick={() => gifts.unshift({ ...constants.NEW_GIFT })} role='button'>
                      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                    </svg>
                  </div>
                </div>
                <div className='row row-cols-1 row-cols-md-4 g-4 card-deck'>
                  {
                    values.gifts.map((gift, index) => (
                      <GiftCard gift={gift} key={index} handleDelete={() => { gifts.remove(index) }} handleUpdate={(newValues) => { console.log('values unmodified: ', values.gifts); values.gifts[index] = newValues; console.log('values modified: ', values.gifts); dispatch(saveGiftList(values)) }} />
                    ))
                  }
                </div>
                <div className='row mt-5'>
                  <button className='btn btn-primary' type="submit">Guardar</button>
                </div>
              </>
            )}
          />

        </Form>
      )}
    </Formik>
  )
}