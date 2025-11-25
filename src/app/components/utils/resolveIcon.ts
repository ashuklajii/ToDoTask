import * as LucideIcons from "lucide-react";
import { Image as DefaultIcon } from "lucide-react";

export function resolveIcon(raw: any) {
  if (typeof raw === "function") return raw;

  if (typeof raw === "string") {
    const key = raw as keyof typeof LucideIcons;
    if (key in LucideIcons) {
      return LucideIcons[key];
    }
  }

  return DefaultIcon;
}
