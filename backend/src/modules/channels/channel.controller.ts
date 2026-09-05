import { asyncHandler } from "@common/utils/asyncHandler.js";
import { Request, Response } from "express";
import { channelService } from "./channel.factory.js";
import { ChannelMapper } from "./mappers/channel.mapper.js";
import { ApiResponse } from "@common/utils/apiResponse.js";
import { Errors } from "@common/utils/errors.js";

export const createChannel = asyncHandler(async (req: Request, res: Response) => {
  const channel = await channelService.createChannel(req.body, req.user.id);

  const responseData = ChannelMapper.toResponse(channel);

  return ApiResponse.success(res, { channel: responseData }, "Successfully created a channel");
});

export const getPublicChannels = asyncHandler(async (req: Request, res: Response) => {
  const channels = await channelService.getChannels();

  const responseData = ChannelMapper.toManyResponse(channels);

  return ApiResponse.success(
    res,
    { channels: responseData },
    "Successfully retrieved public channels",
  );
});

export const getChannelById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (typeof id !== "string") {
    throw Errors.badRequest("Invalid or missing channel ID");
  }
  const channel = await channelService.getChannelById(id);

  const responseData = ChannelMapper.toResponse(channel);

  return ApiResponse.success(res, { channel: responseData }, "Success");
});

export const getJoinedChannels = asyncHandler(async (req: Request, res: Response) => {
  const channels = await channelService.getMyChannels(req.user.id);
  const responseData = ChannelMapper.toManyResponse(channels);

  return ApiResponse.success(
    res,
    { channels: responseData },
    "Successfully fetched your channels.",
  );
});
