import { Invitation, Prisma } from "@generated/prisma/client.js";
import { BaseRepository } from "@infrastructure/repositories/base.repository.js";
import { InvitationEntity } from "../domain/invitation.entity.js";
import { prisma } from "@infrastructure/db.js";
import { InvitationMapper } from "../mappers/invitation.mapper.js";

export class InvitationRepository extends BaseRepository<
  Invitation,
  Prisma.InvitationCreateInput,
  Prisma.InvitationUpdateInput,
  InvitationEntity
> {
  constructor() {
    super(prisma.invitation, InvitationMapper.toDomainEntity);
  }

  async findByCode(code: string): Promise<InvitationEntity | null> {
    const invite = await prisma.invitation.findUnique({ where: { code } });

    return invite ? InvitationMapper.toDomainEntity(invite) : null;
  }

  async incrementUses(id: string): Promise<InvitationEntity> {
    const updated = await prisma.invitation.update({
      where: { id },
      data: { uses: { increment: 1 } },
    });
    return InvitationMapper.toDomainEntity(updated);
  }

  async revoke(id: string): Promise<InvitationEntity> {
    const updated = await prisma.invitation.update({
      where: { id },
      data: { isRevoked: true },
    });
    return InvitationMapper.toDomainEntity(updated);
  }
}
