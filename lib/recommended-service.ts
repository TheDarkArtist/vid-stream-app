"use server";

import { getSelf } from "./auth-service";
import { db } from "./db";

export const getRecommended = async () => {
  let userId;

  try {
    const user = await getSelf();
    userId = user.id;
  } catch {
    userId = null;
  }

  let users = [];

  if (userId) {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
          {
            NOT: {
              blocking: {
                some: {
                  blockedId: userId,
                },
              },
            },
          },
        ],
      },
      include: {
        stream: { select: { isLive: true } },
      },
    });
  } else {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        stream: { select: { isLive: true } },
      },
    });
  }

  return users;
};
