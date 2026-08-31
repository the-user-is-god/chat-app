import { asyncHandler } from "@common/utils/asyncHandler.js";
import { Request, Response } from "express";
import { memberService } from "./channel-member.factory.js";
import { Errors } from "@common/utils/errors.js";
import { MemberMapper } from "./mappers/channel-member.mapper.js";
import { ApiResponse } from "@common/utils/apiResponse.js";

export const listMembers = asyncHandler(async (req: Request, res: Response) => {
  const { channelId } = req.params;

  if (typeof channelId !== "string") {
    throw Errors.badRequest("Invalid or missing channel ID");
  }

  const members = await memberService.listMembers(channelId, req.user.id);

  const responseData = MemberMapper.toManyResponse(members);

  return ApiResponse.success(
    res,
    { members: responseData },
    "Successfully retrieved channel members",
  );
});

export const getMyMembership = asyncHandler(async (req: Request, res: Response) => {
  const { channelId } = req.params;
  if (typeof channelId !== "string") {
    throw Errors.badRequest("Invalid or missing channel ID");
  }

  const member = await memberService.getMyMembership(channelId, req.user.id);
  const responseData = MemberMapper.toResponse(member);

  return ApiResponse.success(
    res,
    { member: responseData },
    "Successfully retrieved membership details",
  );
});

export const joinPublicChannel = asyncHandler(async (req: Request, res: Response) => {
  const { channelId } = req.params;
  if (typeof channelId !== "string") {
    throw Errors.badRequest("Invalid or missing channel ID");
  }

  const member = await memberService.joinPublicChannel(channelId, req.user.id);
  const responseData = MemberMapper.toResponse(member);

  return ApiResponse.success(res, { member: responseData }, "Successfully joined the channel");
});

export const leaveChannel = asyncHandler(async (req: Request, res: Response) => {
  const { channelId } = req.params;
  if (typeof channelId !== "string") {
    throw Errors.badRequest("Invalid or missing channel ID");
  }

  await memberService.leaveChannel(channelId, req.user.id);

  return ApiResponse.success(res, null, "Successfully left the channel");
});
