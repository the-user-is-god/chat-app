export interface ChannelEntity {
  id: string;
  name: string;
  description?: string | null;
  avatar?: string | null;
  visibility: "PUBLIC" | "PRIVATE";
  createdById: string;
  createdAt: Date;
  updatedAt?: Date;
  messagingMode: "EVERYONE" | "MODERATORS_ONLY";
}
