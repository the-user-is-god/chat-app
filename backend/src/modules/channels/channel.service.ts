import { Errors } from "@common/utils/errors.js";
import { CreateChannelDTO } from "./channel.dto.js";
import { ChannelEntity } from "./domain/channel.entity.js";
import { ChannelRepository } from "./repositories/channel.repository.js";
import { MemberRepository } from "@modules/channelMembers/repositories/channel-member.repository.js";

export class ChannelService {
  constructor(
    private channelRepository: ChannelRepository,
    private channelMemberRepository: MemberRepository,
  ) {}

  async createChannel(inputData: CreateChannelDTO, userId: string): Promise<ChannelEntity> {
    // here i need to set the channel Member role as the OWNER when creating a channel

    const channel = await this.channelRepository.create({
      ...inputData,
      createdBy: {
        connect: { id: userId },
      },
      channelMembers: {
        create: {
          user: { connect: { id: userId } },
          role: "OWNER",
          joinedAt: new Date(),
        },
      },
      createdAt: new Date(),
    });

    // await this.channelMemberRepository.create({
    //   channel: { connect: { id: channel.id } },
    //   user: {
    //     connect: { id: userId },
    //   },
    //   role: "OWNER",
    // });

    return channel;
  }

  async getChannels(): Promise<ChannelEntity[]> {
    const channels = await this.channelRepository.findPublicChannels();
    return channels ?? [];
  }

  async getChannelById(channelId: string): Promise<ChannelEntity> {
    const channel = await this.channelRepository.findById(channelId);

    if (!channel) {
      throw Errors.notFound("Channel not Found");
    }

    return channel;
  }
}
