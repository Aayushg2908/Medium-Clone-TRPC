"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { trpc } from "@/app/_trpc/client";

const ProModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data, isLoading } = trpc.isPro.useQuery();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isLoading) return null;

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (data) {
    return (
      <div className="w-full h-full flex flex-col gap-1 justify-center items-center">
        <Button
          variant={!data ? "default" : "premium"}
          disabled={loading}
          onClick={onSubscribe}
        >
          {data ? "Manage Subscription" : "Upgrade"}
          {!data && <Zap className="w-4 h-4 ml-2 fill-white" />}
        </Button>
        <Button onClick={() => router.push("/home")}>Go to home</Button>
      </div>
    );
  }

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold text-xl">
              Upgrade to Genius
              <Badge variant="premium" className="uppercase text-sm py-1">
                pro
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={onSubscribe}
            size="lg"
            variant="premium"
            className="w-full"
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
          <Link href="/home">
            <Button>Cancel</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
