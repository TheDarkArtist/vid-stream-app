import React from "react";
import Wrapper from "./wrapper";
import Toggle, { ToggleSkeleton } from "./toggle";
import Recommended, { RecommendedSkeleton } from "./recommended";
import { getRecommended } from "@/lib/recommended-service";
import { getFollowdUsers } from "@/lib/follow-service";
import Following, { FollowingSkeleton } from "./following";

const Sidebar = async () => {
  const recommended = await getRecommended();
  const following = await getFollowdUsers();

  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={following} />
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-16 lg:w-64 h-full bg-slate-900 borrder-r border-slate-800 z-50">
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};

export default Sidebar;
