export interface InvitationEntity {
  id: string;
  code: string;
  channelId: string;
  createdById: string;
  maxUses: number | null;
  uses: number;
  expiresAt: Date | null;
  isRevoked: boolean;
  createdAt: Date;
}
