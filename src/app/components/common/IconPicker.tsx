"use client";
import * as LucideIcons from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  selectedIcon: any;
  color?: string;
  onSelectIcon: (iconName: string) => void;
  onSelectColor: (color: string) => void;
};

export default function IconPicker({
  selectedIcon,
  color,
  onSelectIcon,
  onSelectColor,
}: Props) {
  const iconList = [
    "Home",
    "Sparkles",
    "Square",
    "Command",
    "User",
    "EyeOff",
    "CheckCircle",
    "Plus",
    "Zap",
    "Heart",
    "Image",
    "BookOpen",
    "MessageSquare",
  ];

  const colorList = [
    "#ffffff",
    "#ff7b7b",
    "#ff9a2a",
    "#fff16b",
    "#4de47a",
    "#caa8ff",
    "#b7b8ff",
  ];

  const isSelectedIcon = (name: string) => {
    if (!selectedIcon) return false;
    if (typeof selectedIcon === "string") return selectedIcon === name;
    if (typeof selectedIcon === "function")
      return (selectedIcon as any).name === name;
    return false;
  };

  return (
    <motion.div
      className="absolute z-30 p-4"
      initial={{ opacity: 0, scale: 0.92, y: -6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -6 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      style={{
        width: 332,
        height: 240,
        left: -2,
        top: -1,
        pointerEvents: "auto",
      }}
    >
      <div
        className="w-full h-full rounded-2xl p-4"
        style={{
          background: "rgba(20,20,20,0.9)",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.02)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.26)",
            marginBottom: 8,
          }}
        >
          Icon
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 10,
          }}
        >
          {iconList.map((name) => {
            const Icon = (LucideIcons as any)[name];
            const sel = isSelectedIcon(name);

            return (
              <button
                key={name}
                onClick={() => onSelectIcon(name)}
                className="flex items-center justify-center"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 10,
                  background: sel
                    ? "rgba(255,255,255,0.15)"
                    : "rgba(255,255,255,0.04)",
                  border: sel
                    ? "1.6px solid rgba(255,255,255,0.45)"
                    : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: sel
                    ? "0 0 8px rgba(255,255,255,0.25)"
                    : "none",
                  transform: sel ? "scale(1.15)" : "scale(1)",
                  transition: "all .15s ease",
                }}
              >
                <Icon
                  size={18}
                  color={sel ? "#fff" : "rgba(255,255,255,0.45)"}
                />
              </button>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 12,
            fontSize: 13,
            color: "rgba(255,255,255,0.26)",
          }}
        >
          Color
        </div>

        <div
          style={{
            marginTop: 8,
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          {colorList.map((c) => {
            const selected = c === color;

            return (
              <button
                key={c}
                onClick={() => onSelectColor(c)}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "100%",
                  background: c,
                  boxShadow: selected
                    ? "0 0 0 4px rgba(255,255,255,0.2), 0 0 8px rgba(255,255,255,0.4)"
                    : "0 0 0 2px rgba(255,255,255,0.10)",
                  border: selected
                    ? "2px solid rgba(255,255,255,0.7)"
                    : "1px solid rgba(255,255,255,0.15)",
                  transform: selected ? "scale(1.2)" : "scale(1)",
                  transition: "all .15s ease",
                }}
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
