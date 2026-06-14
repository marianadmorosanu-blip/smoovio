import { COLORS } from "@/design-system/types";

interface LogoMarkProps {
  small?: boolean;
}

export function LogoMark({ small = false }: LogoMarkProps) {
  const size = small ? "h-8 w-8" : "h-10 w-10";
  return (
    <div
      className={`relative overflow-hidden rounded-xl ${size}`}
      style={{ background: `linear-gradient(145deg, ${COLORS.leaf}, ${COLORS.leafDark})` }}
    >
      <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm tracking-tight">S</div>
    </div>
  );
}
