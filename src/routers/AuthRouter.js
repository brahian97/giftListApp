import { BrowserRouter, Route, Navigate } from "react-router-dom";
import { LoginScreen } from "../components/login/LoginScreen";
import { RegisterScreen } from "../components/register/RegisterScreen";
import { ResetPasswordScreen } from "../components/resetPassword/ResetPasswordScreen";

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