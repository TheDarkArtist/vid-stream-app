"use server";

//TODO: Refactor for the latest version

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import {
  IngressClient,
  RoomServiceClient,
  IngressInput,
  CreateIngressOptions,
  IngressVideoEncodingPreset,
  IngressAudioEncodingPreset,
} from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL as string,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_API_SECRET,
);

const ingressClient = new IngressClient(
  process.env.LIVEKIT_API_URL as string,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_API_SECRET,
);

export const resetIngress = async (hostIdentity: string) => {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });

  const rooms = await roomService.listRooms([hostIdentity]);

  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }

  for (const ingress of ingresses) {
    await ingressClient.deleteIngress(ingress.ingressId as string);
  }
};

export const createIngress = async (ingressType: IngressInput) => {
  const self = await getSelf();

  await resetIngress(self.id);

  const options: CreateIngressOptions = {
    name: self.username,
    roomName: self.id,
    participantName: self.username,
    participantIdentity: self.id,
  };

  if (ingressType === IngressInput.WHIP_INPUT) {
    options.bypassTranscoding = true;
  } else {
    options.video = {
      source: TrackSource.CAMERA,
      preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
    };
    options.audio = {
      source: TrackSource.MICROPHONE,
      preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
    };
  }

  const ingress = await ingressClient.createIngress(ingressType, options);

  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw new Error("Failed to create ingress");
  }

  await db.stream.update({
    where: {
      userId: self.id,
    },
    data: {
      ingressId: ingress.ingressId,
      streamKey: ingress.streamKey,
      serverUrl: ingress.url,
    },
  });

  revalidatePath(`/u/${self.username}/keys`);

  return ingress;
};
