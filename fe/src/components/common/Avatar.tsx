type Props = {
  className?: string;
};

export default function Avatar({ className = "" }: Props) {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="100" height="100" fill="currentColor" opacity={0.3} />
      <polyline
        points="10,40 20,70 40,30 60,60 80,40 90,60 70,70 90,10"
        fill="none"
        strokeWidth={5}
        stroke="currentColor"
      />
    </svg>
  );
}
