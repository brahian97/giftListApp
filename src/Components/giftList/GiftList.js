import { Field, FieldArray, Form, Formik } from "formik";
import { constants } from '../../constants/constants';
import React from 'react';
import { useDispatch } from 'react-redux';
import { saveGiftList } from '../../actions/giftList';
import { GiftCard } from './GiftCard';

export const GiftList = ({ giftList }) => {

  const dispatch = useDispatch()

  return (
    <Formik
      initialValues={{ ...giftList }}
      onSubmit={values => {
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
                  <h4 className='col text-center my-4'>Regalos</h4>
                  <div className='col-auto d-flex justify-content-denter align-items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width='16' height='16' viewBox="0 0 448 512" onClick={() => gifts.push({ ...constants.NEW_GIFT })} role='button'>
                      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                    </svg>
                  </div>
                </div>
                <div className='row row-cols-1 row-cols-md-3 g-4 card-deck'>
                  {
                    values.gifts.map((gift, index) => (
                      <GiftCard gift={gift} key={index} handleDelete={() => {gifts.remove(index)}} handleUpdate={(newValues) => {values.gifts[index] = newValues}}/>
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