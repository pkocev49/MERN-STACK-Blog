import { useContext } from "react";
import { FeedbackContext } from "../Context/FeedbackContext";

export const useFeedbackContext = () => {
  const context = useContext(FeedbackContext);

  if (!context) {
    throw Error(
      "useFeedbackContext must be used inside an FeedbackContextProvider"
    );
  }

  return context;
};
