import { types } from './../types/types'
import { firebase, googleAuthProvider } from './../firebase/firebaseConfig'
import { setError, startLoading, finishLoading } from './ui'
import Swal from 'sweetalert2'
import { db } from "../firebase/firebaseConfig"

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading())

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName, user.email))
      }).catch(err => {
        dispatch(setError(err.code))
      }).finally(() => {
        dispatch(finishLoading())
      })
  }
}

export const googleLogin = () => {
  return (dispatch) => {
    firebase.auth().signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(
          login(user.uid, user.displayName, user.email)
        )
      })
  }
}

export const login = (uid, displayName, email) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
    email
  }
})

export const registerWithEmail = (email, password, name) => {
  return (dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name })
        Swal.fire({
          title: 'Registro exitoso',
          text: 'Bienvenido a Gift List App',
          icon: 'success',
          showCancelButton: false,
          showConfirmButton: false
        })
        await db.doc(`${user.uid}/profile/`).update({name: name, email: email})
        dispatch(login(user.uid, user.displayName, user.email))
      }).catch(
        err => {
          console.error(err.code)
          dispatch(setError(err.code))
        }
      )
  }
}

export const logout = () => {
    return (dispatch) => {
        firebase.auth().signOut()
            .then(() => {
                dispatch(logoutUser())
            })
            .catch(err => {
                Swal.fire('Error', err.message, 'error')
            })
    }
}

const logoutUser = () => ({
    type: types.logout
})

/*const changePasswordFirebase = (password) => {
    return (dispatch) => {
        firebase.auth().currentUser.updatePassword(password)
            .then(() => {
                Swal.fire({
                    title: 'Successful',
                    text: 'Your password has been changed',
                    icon: 'success',
                })
            }
            ).catch(err => {
                Swal.fire('Error', err.message, 'error')
            })
    }
}

const changePassword = () => ({
    type: types.changePassword,
})

export const startEditProfile = () => {
    return () => {
        ReactSwal.fire({
            html: <Provider store={store}> <ModalProfile /> </Provider>,
            showCloseButton: true,
            showConfirmButton: false,
        })
    }
}

export const updateInfo = (name) => {
    return (dispatch) => {
        firebase.auth().currentUser.updateProfile({
            displayName: name,
        }).then(() => {
            Swal.fire({
                title: 'Successful',
                text: 'Your profile has been updated',
                icon: 'success',
            })

            const {displayName, email, uid} = firebase.auth().currentUser

            dispatch(login(uid, displayName, email))
        }).catch(err => {
            Swal.fire('Error', err.message, 'error')
        })
    }
}


export const resetPassword = (email) => {
    return () => {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                Swal.fire({
                    title: 'Successful',
                    text: 'We have sent you an email to reset your password',
                    icon: 'success',
                })
            }
            ).catch(err => {
                Swal.fire('Error', err.message, 'error')
            })
    }
}*/