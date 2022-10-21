import { useSelector } from "react-redux";
import { PageHeader } from "../PageHeader/PageHeader";
import { GiftList } from "./GiftList";
import { GiftLists } from "./GiftLists";

export const GiftsScreen = () => {

  const { active } = useSelector(state => state.giftLists)
  
  return (
    <div>
      {
        active ? <GiftList giftList={active} /> : <GiftLists />
      }
    </div>
  )
}