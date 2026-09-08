import type { IncomingMessage } from "node:http";
import type { UserEntity } from "@modules/users/domain/user.entity.js";

export interface SocketRequest extends IncomingMessage {
  cookies?: Record<string, string>;
  user?: UserEntity;
}

export interface SocketData {
  user: UserEntity;
}
