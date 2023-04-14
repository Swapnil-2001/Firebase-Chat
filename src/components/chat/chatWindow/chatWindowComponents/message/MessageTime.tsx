import { MessageSendTimeContainer } from "../../ChatWindow.styles";

interface MessageTimeProps {
  time: string;
  moveToLeft: boolean;
}

const MessageTime: React.FC<MessageTimeProps> = ({
  time,
  moveToLeft,
}): JSX.Element => {
  const lengthOfTimeString: number = time.length;
  return (
    <MessageSendTimeContainer moveToLeft={moveToLeft}>
      {time.substring(0, lengthOfTimeString - 3)}
    </MessageSendTimeContainer>
  );
};

export default MessageTime;
