import { useState } from "react";

const useForm = (initialState = {} ) => {

    const [ values, setValues ] = useState(initialState)

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [ target.name ]: target.value
        })
    }

    const setFormValues = (newValues) => {
      setValues({
        ...values,
        ...newValues
      })
    }

    const reset = (newFormState = initialState) => {
        setValues(newFormState)
    }

    return [values, handleInputChange, reset, setFormValues]
}
 
export default useForm;