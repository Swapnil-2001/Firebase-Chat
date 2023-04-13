export interface ConversationMessage {
  id: string;
  senderId: string;
  messageText: string;
  imageUrl: string;
  conversationDateString: string;
  date: any;
  showDate: boolean;
}

export interface MessageOnWindow {
  date: any;
  handleImageLoaded: () => void;
  imageUrl: string;
  messageText: string;
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
  };
  date: any;
  isRead: boolean;
}
