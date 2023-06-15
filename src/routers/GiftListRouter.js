import { Route, Routes } from "react-router-dom";
import { FavoritesScreen } from "../components/favorites/FavoritesScreen";
import { GiftsScreen } from "../components/giftList/GiftsScreen";
import { Page404 } from "../components/pageErrors/Page404";
import { GiftListShareScreen } from "../components/share/GiftListShareScreen";

export const GiftListRouter = () => {
  return (
    <>
      <Routes>
        <Route path='/share/:userId/:giftListId/' element={<GiftListShareScreen />} />
        <Route path='/favorites' element={<FavoritesScreen />} />
        <Route path='/' element={<GiftsScreen />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}