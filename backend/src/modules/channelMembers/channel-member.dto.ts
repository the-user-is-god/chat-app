export interface MemberResponseDTO {
  id: string;
  channelId: string;
  userId: string;
  role: "OWNER" | "ADMIN" | "MODERATOR" | "MEMBER" | "VIEWER";
  joinedAt: Date;
  lastReadMessageId?: string | null;
  // user: {
  //   name: string;
  //   avatar?: string;
  // };
}
