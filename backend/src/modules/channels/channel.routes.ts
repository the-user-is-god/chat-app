import { validate } from "@common/middleware/validation.middleware.js";
import express from "express";
import { createChannelSchema } from "./channel.validation.js";
import { createChannel } from "./channel.controller.js";
import { protect } from "@common/middleware/auth.middleware.js";

export const channelRoutes = express.Router();

channelRoutes.post("/", protect, validate(createChannelSchema), createChannel);
