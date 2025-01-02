"use server";

import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
  try {
    const self = await getSelf();

    let blockedUser;

    const roomService = new RoomServiceClient(
      process.env.LIVEKIT_API_URL as string,
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
    );

    try {
      blockedUser = await blockUser(id);
    } catch {
      // user is a guest
    }

    try {
      await roomService.removeParticipant(self.id, id);
    } catch {
      // This user is not in the room
    }

    revalidatePath(`/u/${self.username}/community`);

    return blockedUser;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};

export const onUnblock = async (id: string) => {
  try {
    const self = await getSelf();
    const unblockedUser = await unblockUser(id);

    revalidatePath(`/u/${self.username}/community`);

    return unblockedUser;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};
