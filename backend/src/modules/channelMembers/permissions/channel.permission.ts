import { ChannelRole } from "@generated/prisma/enums.js";

export class ChannelPermissions {
  static canManageChannel(role: ChannelRole): boolean {
    return role === "OWNER";
  }

  static canManageMembers(actorRole: ChannelRole, targetRole?: ChannelRole): boolean {
    // Only OWNER and ADMIN can manage members
    if (actorRole !== "OWNER" && actorRole !== "ADMIN") {
      return false;
    }

    // Admins cannot manage the OWNER or other ADMINS
    if (actorRole === "ADMIN" && (targetRole === "OWNER" || targetRole === "ADMIN")) {
      return false;
    }

    return true;
  }

  /**
   * Can generate invitation codes/links for private channels
   */
  static canInvite(role: ChannelRole): boolean {
    return role === "OWNER" || role === "ADMIN" || role === "MODERATOR" || role === "MEMBER";
  }

  /**
   * Can send messages in the channel (Used inside Socket.IO and REST endpoints)
   */
  static canSendMessages(role: ChannelRole): boolean {
    // VIEWERS are read-only
    return role !== "VIEWER";
  }

  static canDeleteMessages(role: ChannelRole): boolean {
    return role === "OWNER" || role === "ADMIN" || role === "MODERATOR";
  }

  static canLeaveChannel(role: ChannelRole): boolean {
    return role !== "OWNER";
  }
}
