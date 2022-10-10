import { BrowserRouter, Route, Navigate } from "react-router-dom";
import { LoginScreen } from "../Components/login/LoginScreen";
import { RegisterScreen } from "../Components/register/RegisterScreen";
import { ResetPasswordScreen } from "../Components/resetPassword/ResetPasswordScreen";

export const AuthRouter = () => {
  return ( 
    
        <BrowserRouter>
          <Route path='/auth/login' component={LoginScreen} />
          <Route path='/auth/register' component={RegisterScreen} />
          <Route path='/auth/resetPassword' component={ResetPasswordScreen} />
          
          <Navigate to='/auth/login' />
        </BrowserRouter>
  );
}