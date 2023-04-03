import { ConversationDateContainer } from "../../ChatWindow.styles";

interface ConversationDateProps {
  conversationDateString: string | undefined;
  showDate: boolean;
}

const ConversationDate: React.FC<ConversationDateProps> = ({
  conversationDateString,
  showDate,
}): JSX.Element => {
  const dateToday = new Date();

  const day = dateToday.getDate();
  const month = dateToday.getMonth();
  const year = dateToday.getFullYear();
  const formattedDate =
    ("0" + day).slice(-2) + "/" + ("0" + (month + 1)).slice(-2) + "/" + year;

  return (
    <ConversationDateContainer showDate={showDate}>
      {formattedDate === conversationDateString
        ? "Today"
        : conversationDateString}
    </ConversationDateContainer>
  );
};

export default ConversationDate;
