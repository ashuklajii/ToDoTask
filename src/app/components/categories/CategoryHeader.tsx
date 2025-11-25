"use client";

import { useState } from "react";
import {
  GripVertical,
  Copy,
  Trash2,
  Image as DefaultIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import IconPicker from "../common/IconPicker"; // <– YOUR PICKER

/* Resolve Icon */
function resolveIcon(icon: any) {
  if (!icon) return DefaultIcon;
  if (typeof icon === "function") return icon;
  if (typeof icon === "string" && (LucideIcons as any)[icon])
    return (LucideIcons as any)[icon];
  return DefaultIcon;
}

export default function CategoryHeader({
  category,
  tasks,
  onCopy,
  onDelete,
  onUpdate,
  setActiveCategory,
}: any) {
  const [editing, setEditing] = useState(false);
  const [showHeaderActions, setShowHeaderActions] = useState(false);
  const [iconPickerOpen, setIconPickerOpen] = useState(false);
  const [title, setTitle] = useState(category.title);

  const Icon = resolveIcon(category.icon);
  const color = category.color || "#acacac";

  const saveTitle = () => {
    onUpdate({ ...category, title });
  };

  return (
    <div
      className="
        group
        bg-dark
        rounded-3xl 
        px-3 py-4
        shadow-[0_4px_20px_rgba(0,0,0,0.25)]
        hover:bg-[#3d3c3c] 
        transition
        m-3 p-2
        flex justify-between items-center
        relative
      "
      onClick={() => {
        if (!editing && !iconPickerOpen) {
          setActiveCategory(category.id); 
        }
      }}
    >
   
      <button
        onClick={(e) => {
          e.stopPropagation(); 
          setIconPickerOpen((v) => !v);
        }}
        className="
          w-12 h-12 rounded-2xl
          bg-[#1f1f1f] border border-white/10
          flex items-center justify-center
          shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]
        "
      >
        <Icon size={22} style={{ color }} />
      </button>

      {/* ICON PICKER */}
      {iconPickerOpen && (
        <div
          className="absolute left-0 mt-16 z-[60]"
          onClick={(e) => e.stopPropagation()} 
        >
          <IconPicker
            selectedIcon={category.icon}
            color={category.color}
            onSelectIcon={(ic: any) => {
              onUpdate({ ...category, icon: ic });
              setIconPickerOpen(false);
            }}
            onSelectColor={(col: string) => {
              onUpdate({ ...category, color: col });
              setIconPickerOpen(false);
            }}
          />
        </div>
      )}

      {/* TITLE */}
      <div className="flex-1 ml-4">
        {editing ? (
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onBlur={() => {
              saveTitle();
              setEditing(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveTitle();
                setEditing(false);
              }
              e.stopPropagation();
            }}
            className="
              text-white bg-transparent
              border-b border-white/20 outline-none w-full
              text-[15px] font-[Rubik]
            "
          />
        ) : (
          <span
            className="text-[15px] text-[#acacac] font-[Rubik] cursor-text"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setEditing(true);
            }}
          >
            {title}
          </span>
        )}
      </div>

     
      <div
        className="relative w-6 h-6 flex items-center justify-end"
        onClick={(e) => e.stopPropagation()} 
      >
        {!showHeaderActions && (
          <span className="absolute right-0 text-white/60 text-[15px] group-hover:opacity-0 transition-opacity">
            {tasks.length}
          </span>
        )}

        {!showHeaderActions && (
          <button
            onClick={() => setShowHeaderActions(true)}
            className="absolute right-0 opacity-0 group-hover:opacity-100 transition"
          >
            <GripVertical size={18} className="text-white/60" />
          </button>
        )}

        {showHeaderActions && (
          <motion.div
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 6 }}
            className="absolute right-0 flex items-center gap-3"
          >
            {/* COPY */}
            <button
              onClick={() => {
                onCopy(category);
                setShowHeaderActions(false);
              }}
              className="text-textcolor hover:text-white transition"
            >
              <Copy size={16} />
            </button>

            {/* DELETE */}
            <button
              onClick={() => {
                onDelete(category.id);
                setShowHeaderActions(false);
              }}
              className="text-red-400 hover:text-red-300 transition"
            >
              <Trash2 size={16} />
            </button>

            {/* CLOSE */}
            <button onClick={() => setShowHeaderActions(false)}>
              <GripVertical size={18} className="text-white/60" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
