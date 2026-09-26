export interface Invitation {
  id: string;
  code: string;
  maxUses: number | null;
  uses: number;
  expiresAt: string | null;
  isRevoked: boolean;
  createdAt: string;
}

export interface CreateInvitationInput {
  maxUses?: number;
  expiresAt?: string;
}

export interface JoinByInvitationInput {
  code: string;
}
