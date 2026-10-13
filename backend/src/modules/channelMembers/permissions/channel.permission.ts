import { ChannelRole } from "@generated/prisma/enums.js";

export class ChannelPermissions {
  static canUpdateSettings(role: ChannelRole): boolean {
    return role === "OWNER";
  }
  // static canManageChannel(role: ChannelRole): boolean {
  //   return role === "OWNER";
  // }

  static canChangeMemberRole(
    actorRole: ChannelRole,
    targetRole: ChannelRole,
    newRole: ChannelRole,
  ): boolean {
    // Nobody can assign ownership through this operation.
    if (newRole === "OWNER") {
      return false;
    }

    // The owner can manage every other member's role.
    if (actorRole === "OWNER") {
      return targetRole !== "OWNER";
    }

    // Admins can manage ordinary members and viewers,
    // but cannot promote them to privileged roles.
    if (actorRole === "ADMIN") {
      const manageableRoles: ChannelRole[] = ["MEMBER", "VIEWER"];

      return manageableRoles.includes(targetRole) && manageableRoles.includes(newRole);
    }

    return false;
  }

  static canTransferOwnership(role: ChannelRole): boolean {
    return role === "OWNER";
  }

  static canRemoveMember(actorRole: ChannelRole, targetRole: ChannelRole): boolean {
    if (actorRole === "OWNER") {
      return targetRole !== "OWNER";
    }

    if (actorRole === "ADMIN") {
      return targetRole === "MODERATOR" || targetRole === "MEMBER" || targetRole === "VIEWER";
    }

    return false;
  }

  // static canManageMembers(actorRole: ChannelRole, targetRole?: ChannelRole): boolean {
  //   // Only OWNER and ADMIN can manage members
  //   if (actorRole !== "OWNER" && actorRole !== "ADMIN") {
  //     return false;
  //   }

  //   // Admins cannot manage the OWNER or other ADMINS
  //   if (actorRole === "ADMIN" && (targetRole === "OWNER" || targetRole === "ADMIN")) {
  //     return false;
  //   }

  //   return true;
  // }

  /**
   * Can generate invitation codes/links for private channels
   */
  static canInvite(role: ChannelRole): boolean {
    return role === "OWNER" || role === "ADMIN" || role === "MODERATOR" || role === "MEMBER";
  }

  static canRevokeInvitation(role: ChannelRole): boolean {
    return role === "OWNER" || role === "ADMIN";
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
