import { db } from "@/lib/db";
import { WebhookReceiver } from "livekit-server-sdk";
import { headers } from "next/headers";

const reciever = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY as string,
  process.env.LIVEKIT_API_SECRET as string,
);

export async function POST(request: Request) {
  const body = await request.text();
  const headersPayload = await headers();
  const authorization = headersPayload.get("authorization");

  if (!authorization) {
    return new Response("Missing authorization header", {
      status: 401,
    });
  }

  const event = reciever.receive(body, authorization);

  if (event.event === "ingress_started") {
    await db.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
      data: {
        isLive: true,
      },
    });
  }

  if (event.event === "ingress_ended") {
    await db.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
      data: {
        isLive: false,
      },
    });
  }

  return new Response("", { status: 200 });
}
