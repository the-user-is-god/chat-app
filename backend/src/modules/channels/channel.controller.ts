import { asyncHandler } from "@common/utils/asyncHandler.js";
import { Request, Response } from "express";
import { channelService } from "./channel.factory.js";
import { ChannelMapper } from "./mappers/channel.mapper.js";
import { ApiResponse } from "@common/utils/apiResponse.js";

export const createChannel = asyncHandler(async (req: Request, res: Response) => {
  const channel = await channelService.createChannel(req.body, req.user.id);

  const responseData = ChannelMapper.toResponse(channel);

  return ApiResponse.success(res, { channel: responseData }, "Successfully created a channel");
});
