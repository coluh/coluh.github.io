import { useState, useCallback } from "react";
import { getDomain } from "../../utils/url";

type ServerStatus = "checking" | "online" | "offline";
type Props = {
  url?: string;
};

export default function ServerStatus({
  url = import.meta.env.VITE_SERVER_URL || "http://localhost:3300",
}: Props) {
  const [status, setStatus] = useState<ServerStatus>("checking");
  const [init, setInit] = useState(false);

  const check = useCallback(() => {
    setStatus("checking");
    fetch(`${url}/api/health`, {
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
      ? "bg-green-500 dark:bg-green-900"
      : status === "offline"
        ? "bg-amber-500 dark:bg-amber-900"
        : "bg-blue-500 dark:bg-blue-900";

  return (
    <div
      onClick={status !== "checking" ? check : undefined}
      className={`flex cursor-default flex-col items-center rounded-lg p-2 text-sm font-bold text-white dark:text-gray-200 ${style}`}
    >
      <span>
        <i className="text-xs font-medium">{domain}</i>
      </span>
      <span>{text}</span>
    </div>
  );
}
