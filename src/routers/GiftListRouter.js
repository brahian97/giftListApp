import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { GiftsScreen } from "../Components/gifts/GiftsScreen";

export const GiftListRouter = () => {
    return (
        <BrowserRouter>
            <Route path='/' component={GiftsScreen} />
            
            <Navigate to='/' replace/>
        </BrowserRouter>
    );
}