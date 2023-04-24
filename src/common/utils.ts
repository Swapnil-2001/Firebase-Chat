import { ConversationMessage, UserConversation } from "./types";

export const convertStringToNameFormat = (lowercasedName: string): string => {
  const words: string[] = lowercasedName.split(/\s+/);
  const capitalizedWords: string[] = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  const formattedName = capitalizedWords.join(" ");
  return formattedName;
};

export const downloadImage = (imageUrl: string): void => {
  const xhr: XMLHttpRequest = new XMLHttpRequest();
  xhr.responseType = "blob";
  xhr.onload = () => {
    const url: string = window.URL.createObjectURL(xhr.response);
    const a: HTMLAnchorElement = document.createElement("a");
    a.href = url;
    a.download = "Image.png";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };
  xhr.open("GET", imageUrl);
  xhr.send();
};

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
