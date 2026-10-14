import { ChannelMessagingMode, ChannelVisibility } from "@generated/prisma/enums.js";

export interface ChannelResponseDTO {
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

export interface CreateChannelDTO {
  name: string;
  description?: string | null;
  avatar?: string | null;
  visibility: "PUBLIC" | "PRIVATE";
}

export interface UpdateChannelSettingsDTO {
  name?: string;
  description?: string | null;
  avatar?: string | null;
  visibility?: ChannelVisibility;
  messagingMode?: ChannelMessagingMode;
}
