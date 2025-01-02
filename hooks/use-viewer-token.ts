import { useEffect, useState } from "react";
import { useToast } from "./use-toast";
import { createViewerToken } from "@/actions/token";
import { jwtDecode, JwtPayload } from "jwt-decode";

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [identity, setIdentity] = useState<string | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        setToken(viewerToken);

        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name: string;
        };

        const name = decodedToken.name;
        const identity = decodedToken.jti;

        if (identity) {
          setIdentity(identity);
        }

        if (name) {
          setName(name);
        }
      } catch {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    };

    createToken();
  }, [toast, hostIdentity]);

  return {
    token,
    name,
    identity,
  };
};
