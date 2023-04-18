export interface ConversationMessage {
  id: string;
  senderId: string;
  messageText: string;
  imageUrl: string;
  isLiked: boolean;
  conversationDateString: string;
  date: any;
  showDate: boolean;
}

export interface MessageOnWindow {
  handleHoverOnMessage: (messageId: string) => void;
  handleImageLoaded: () => void;
  idOfMessageHoveredOver?: string;
  isLiked: boolean;
  message: ConversationMessage;
}

export interface MessageRecipient {
  uid: string;
  displayName: string;
  photoURL: string;
}

export interface UserConversation {
  userInfo: MessageRecipient;
  lastMessage: {
    messageText: string;
    idOfSender: string;
  };
  date: any;
  isRead: boolean;
}
