import useSwordsLogic from "../../hooks/useSwordsLogic";

export default function SwordsPage() {
  const { containerRef } = useSwordsLogic();

  return <div ref={containerRef} className="size-full"></div>;
}
