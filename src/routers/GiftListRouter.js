import { Route, Routes } from "react-router-dom";
import { GiftList } from "../components/giftList/GiftList";
import { GiftsScreen } from "../components/giftList/GiftsScreen";
import { Page404 } from "../components/pageErrors/Page404";
import { PageHeader } from "../components/PageHeader/PageHeader";

export const GiftListRouter = () => {
    return (
      <>
        <PageHeader />
        <Routes>
            <Route path='giftList/:giftListId' element={<GiftList />} />
            <Route path='/' element={<GiftsScreen />} />
            <Route path="*" element={<Page404 />} />
        </Routes>
      </>
    );
}