"use client";

import { createIngress } from "@/actions/ingress";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Spinner from "@/utils/spinner";
import { IngressInput } from "livekit-server-sdk";
import { AlertTriangle } from "lucide-react";
import {
  ComponentRef,
  useRef,
  useState,
  useTransition,
} from "react";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

const ConnectModal = () => {
  const { toast } = useToast();

  const closeRef = useRef<ComponentRef<"button">>(null);

  const [ingressType, setIngressType] =
    useState<IngressType>(RTMP);

  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    startTransition(() => {
      createIngress(parseInt(ingressType))
        .then(() => {
          toast({
            title: "Success",
            description: "Connection created",
          });
          closeRef.current?.click();
        })
        .catch(() => {
          toast({
            title: "Error",
            description:
              "Failed to create connection, please try again later.",
            variant: "destructive",
          });
        });
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">
          Generate connection{" "}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate connection</DialogTitle>
        </DialogHeader>
        <Select
          disabled={isPending}
          value={ingressType}
          onValueChange={(value) => setIngressType(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a server" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>
            This action will generate a new connection,
            which will reset all active streams using the
            current connection
          </AlertDescription>
        </Alert>
        <div className="flex justify-between">
          <DialogClose
            ref={closeRef}
            asChild
          >
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button
            variant="primary"
            onClick={onSubmit}
            disabled={isPending}
          >
            Generate
            {isPending && <Spinner />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectModal;
