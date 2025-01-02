import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserAvatar from "@/components/user-avatar";
import { getBlockedUser } from "@/lib/block-service";
import { format } from "date-fns";
import UnblockButton from "./_components/unblock-button";

const CommunityPage = async () => {
  const data = await getBlockedUser();

  return (
    <div className="p-6">
      <div className="mb-4 ">
        <h1 className="text-2xl font-bold">Community settings</h1>
      </div>
      <Table className="border rounded-md">
        <TableCaption>A list of your blocked users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Date Blocked</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="flex items-center gap-x-4">
                <UserAvatar
                  username={row.blocked.username}
                  imageUrl={row.blocked.imageUrl}
                />
                <span className="font-semibold">{row.blocked.username}</span>
              </TableCell>
              <TableCell>
                {format(new Date(row.blocked.createdAt), "dd/MM/yyyy")}
              </TableCell>
              <TableCell>
                <UnblockButton userId={row.blocked.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CommunityPage;
