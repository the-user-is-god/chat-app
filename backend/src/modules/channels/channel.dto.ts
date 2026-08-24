export interface ChannelResponseDTO {
  id: string;
  name: string;
  description?: string | null;
  avatar?: string | null;
  visibility: "PUBLIC" | "PRIVATE";
  createdById: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface CreateChannelDTO {
  name: string;
  description?: string | null;
  avatar?: string | null;
  visibility: "PUBLIC" | "PRIVATE";
}
