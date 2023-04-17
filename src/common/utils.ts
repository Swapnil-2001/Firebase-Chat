import { ConversationMessage, UserConversation } from "./types";

export const generateFormattedMessages = (
  conversationMessages: any[]
): ConversationMessage[] => {
  const formattedMessages: ConversationMessage[] = [];
  // Decide whether or not to show the date of the conversation
  conversationMessages.forEach((message) => {
    const conversationDate = message.date.toDate() as Date;
    const conversationDateString = conversationDate.toLocaleDateString();
    const numMessagesLoaded = formattedMessages.length;
    if (
      numMessagesLoaded === 0 ||
      formattedMessages[numMessagesLoaded - 1].conversationDateString !==
        conversationDateString
    )
      formattedMessages.push({
        ...message,
        conversationDateString,
        showDate: true,
      });
    else if (
      formattedMessages[numMessagesLoaded - 1].conversationDateString ===
      conversationDateString
    )
      formattedMessages.push({
        ...message,
        conversationDateString,
        showDate: false,
      });
  });
  return formattedMessages;
};

export const getUnreadConversations = (
  arrayWithUserConversations: UserConversation[]
): Set<string> => {
  const unreadConversations: Set<string> = new Set();
  arrayWithUserConversations.forEach(({ isRead, userInfo }) => {
    if (!isRead) unreadConversations.add(userInfo.uid);
  });
  return unreadConversations;
};
