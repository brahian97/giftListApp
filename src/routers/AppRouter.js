import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { login } from '../actions/auth'
import { startLoadingGiftLists } from '../actions/giftList'
import { GiftsScreen } from '../Components/giftList/GiftsScreen'
import { LoginScreen } from '../Components/login/LoginScreen'
import { Page404 } from '../Components/pageErrors/Page404'
import { RegisterScreen } from '../Components/register/RegisterScreen'
import { ResetPasswordScreen } from '../Components/resetPassword/ResetPasswordScreen'
import { LoadingScreen } from '../Components/ui/LoadingScreen'
import { firebase } from '../firebase/firebaseConfig'
import { PrivateRouter } from './PrivateRouter'
import { PublicRouter } from './PublicRouter'

export const AppRouter = () => {

  const dispatch = useDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName, user.email))
        setIsLoggedIn(true)
        dispatch(startLoadingGiftLists())
      } else {
        setIsLoggedIn(false)
      }
      setChecking(false)
    })
  }, [dispatch, setChecking, setIsLoggedIn])

  if (checking) {
    return <LoadingScreen />
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/home' isLoggedIn={isLoggedIn} element={<PrivateRouter isLoggedIn={ isLoggedIn } component={GiftsScreen}/>} />
          <Route path='/login' element={<PublicRouter isLoggedIn={ isLoggedIn } component={LoginScreen} />} />
          <Route path='/register' element={<PublicRouter isLoggedIn={ isLoggedIn } component={RegisterScreen} />} />
          <Route path='/resetPassword' element={<PublicRouter isLoggedIn={ isLoggedIn } component={ResetPasswordScreen} />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    )
  }
}