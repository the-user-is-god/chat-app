import { Invitation } from "@generated/prisma/client.js";
import { InvitationEntity } from "../domain/invitation.entity.js";
import { InvitationResponseDTO } from "../invitation.dto.js";

export class InvitationMapper {
  static toDomainEntity(invitation: Invitation): InvitationEntity {
    return {
      id: invitation.id,
      code: invitation.code,
      channelId: invitation.channelId,
      createdById: invitation.createdById,
      maxUses: invitation.maxUses,
      uses: invitation.uses,
      expiresAt: invitation.expiresAt,
      isRevoked: invitation.isRevoked,
      createdAt: invitation.createdAt,
    };
  }

  static toResponse(invitation: InvitationEntity): InvitationResponseDTO {
    return {
      id: invitation.id,
      code: invitation.code,
      channelId: invitation.channelId,
      createdById: invitation.createdById,
      maxUses: invitation.maxUses,
      uses: invitation.uses,
      expiresAt: invitation.expiresAt,
      isRevoked: invitation.isRevoked,
      createdAt: invitation.createdAt,
    };
  }
}
