import { asyncHandler } from "@common/utils/asyncHandler.js";
import { Request, Response } from "express";
import { messageService } from "./message.factory.js";
import { MessageMapper } from "./mappers/message.mapper.js";
import { ApiResponse } from "@common/utils/apiResponse.js";
import { Errors } from "@common/utils/errors.js";

export const sendMessage = asyncHandler(async (req: Request, res: Response) => {
  const { channelId } = req.params;
  if (typeof channelId !== "string") {
    throw Errors.badRequest("Invalid or missing channel ID");
  }
  const message = await messageService.sendMessage(channelId, req.user.id, req.body);

  const responseData = MessageMapper.toResponse(message);

  return ApiResponse.success(res, { message: responseData }, "Message sent successfully");
});

export const getMessages = asyncHandler(async (req: Request, res: Response) => {
  const { channelId } = req.params;
  if (typeof channelId !== "string") {
    throw Errors.badRequest("Invalid or missing channel ID");
  }

  const { cursor, limit } = req.query;
  const result = await messageService.getMessages(channelId, req.user.id, {
    cursor: typeof cursor === "string" ? cursor : undefined,
    limit: limit ? Number(limit) : undefined,
  });

  const responseData = MessageMapper.toManyResponse(result.messages);

  return ApiResponse.success(
    res,
    { messages: responseData, nextCursor: result.nextCursor },
    "Successfully retrieved messages",
  );
});

export const deleteMessage = asyncHandler(async (req: Request, res: Response) => {
  const { messageId } = req.params;
  if (typeof messageId !== "string") {
    throw Errors.badRequest("Invalid or missing message ID");
  }

  const message = await messageService.deleteMessage(messageId, req.user.id);
  const responseData = MessageMapper.toResponse(message);

  return ApiResponse.success(res, { message: responseData }, "Message deleted successfully");
});
