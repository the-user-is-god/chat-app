/*
  Warnings:

  - A unique constraint covering the columns `[channelId,clientMessageId]` on the table `Message` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ChannelMessagingMode" AS ENUM ('EVERYONE', 'MODERATORS_ONLY');

-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "messagingMode" "ChannelMessagingMode" NOT NULL DEFAULT 'EVERYONE';

-- CreateIndex
CREATE UNIQUE INDEX "Message_channelId_clientMessageId_key" ON "Message"("channelId", "clientMessageId");
