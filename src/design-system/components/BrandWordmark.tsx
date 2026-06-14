import { LogoMark } from "./LogoMark";

export function BrandWordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark />
      <span className="text-lg font-semibold tracking-tight text-foreground">Smovioo</span>
    </div>
  );
}
