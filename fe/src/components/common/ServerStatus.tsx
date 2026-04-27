import { useState, useCallback } from "react";
import { getDomain } from "../../utils/url";

type ServerStatus = "checking" | "online" | "offline";
type Props = {
  url?: string;
};

export function ServerStatus({
  url = import.meta.env.VITE_SERVER_URL || "http://localhost:3300",
}: Props) {
  const [status, setStatus] = useState<ServerStatus>("checking");
  const [init, setInit] = useState(false);

  const check = useCallback(() => {
    setStatus("checking");
    fetch(`${url}/api/health`, {
      method: "HEAD",
      cache: "no-cache",
    })
      .then((res) => {
        setStatus(res.ok ? "online" : "offline");
      })
      .catch(() => {
        console.error("Failed to check server status");
        setStatus("offline");
      });
  }, [url]);

  if (!init) {
    check();
    setInit(true);
  }

  const domain = getDomain(url);
  const text =
    status === "online"
      ? "服务在线"
      : status === "offline"
        ? "- 离线 -"
        : "检测中...";
  const style =
    status === "online"
      ? "bg-green-500"
      : status === "offline"
        ? "bg-amber-500"
        : "bg-blue-500";

  return (
    <button
      onClick={check}
      disabled={status === "checking"}
      className={`flex cursor-default flex-col items-center rounded-lg p-2 text-sm font-bold text-white ${style}`}
    >
      <span>
        <i>{domain}</i>
      </span>
      <span>{text}</span>
    </button>
  );
}
