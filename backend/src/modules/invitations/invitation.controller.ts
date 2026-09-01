import { Request, Response } from "express";
import { asyncHandler } from "@common/utils/asyncHandler.js";
import { ApiResponse } from "@common/utils/apiResponse.js";
import { Errors } from "@common/utils/errors.js";
import { MemberMapper } from "@modules/channelMembers/mappers/channel-member.mapper.js";
import { invitationService } from "./invitation.factory.js";
import { InvitationMapper } from "./mappers/invitation.mapper.js";

export const createInvite = asyncHandler(async (req: Request, res: Response) => {
  const { channelId } = req.params;
  if (typeof channelId !== "string") {
    throw Errors.badRequest("Invalid or missing channel ID");
  }

  const invite = await invitationService.createInvite(channelId, req.user.id, req.body ?? {});
  const responseData = InvitationMapper.toResponse(invite);

  return ApiResponse.success(
    res,
    { invitation: responseData },
    "Successfully created invitation link",
  );
});

export const joinWithInvite = asyncHandler(async (req: Request, res: Response) => {
  const { code } = req.body;
  if (!code || typeof code !== "string") {
    throw Errors.badRequest("Invitation code is required");
  }

  const newMember = await invitationService.joinWithInvite(code, req.user.id);
  const responseData = MemberMapper.toResponse(newMember);

  return ApiResponse.success(
    res,
    { member: responseData },
    "Successfully joined channel via invite code",
  );
});

export const revokeInvite = asyncHandler(async (req: Request, res: Response) => {
  const { inviteId } = req.params;
  if (typeof inviteId !== "string") {
    throw Errors.badRequest("Invalid or missing invitation ID");
  }

  const invite = await invitationService.revokeInvite(inviteId, req.user.id);
  const responseData = InvitationMapper.toResponse(invite);

  return ApiResponse.success(
    res,
    { invitation: responseData },
    "Successfully revoked invitation link",
  );
});
