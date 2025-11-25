"use client";

import { useState, useRef, useEffect } from "react";
import { CheckCircle, Circle, GripVertical, Copy, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TaskRow({ task, setTasks, dragHandleProps }: any) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.title);
  const [showActions, setShowActions] = useState(false);
  const rowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function close(e: any) {
      if (rowRef.current && !rowRef.current.contains(e.target as Node)) {
        setShowActions(false);
        setEditing(false);
      }
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  function updateTask(updated: any) {
    setTasks((prev: any[]) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  }

  function deleteTask(id: string) {
    setTasks((prev: any[]) => prev.filter((t) => t.id !== id));
  }

  function copyTask(task: any) {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      title: task.title ,
    };
    setTasks((prev: any[]) => [newTask, ...prev]);
  }

  return (
    <div
      ref={rowRef}
      className="bg-dark p-4 rounded-[18px] border border-white/5 
      flex justify-between items-center shadow-md bg-transparent ml-1"
    >
      <div className="flex items-center gap-4 ">
        <button
          onClick={() =>
            updateTask({ ...task, completed: !task.completed })
          }
        >
          {task.completed ? (
            <CheckCircle size={22} className="text-white" />
          ) : (
            <Circle size={22} className="text-gray-500" />
          )}
        </button>

        {editing ? (
          <input
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateTask({ ...task, title: text });
                setEditing(false);
              }
            }}
            className="bg-transparent text-gray-200 text-sm border-b border-white/20 outline-none"
          />
        ) : (
          <span
            onClick={() => setEditing(true)}
            className={`text-sm cursor-text ${
              task.completed ? "line-through text-gray-400" : "text-gray-200"
            }`}
          >
            {task.title}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <AnimatePresence>
          {showActions && (
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="flex items-center gap-2"
            >
              <button
                onClick={() => {
                  copyTask(task);
                  setShowActions(false);
                }}
                className="p-1 opacity-80 hover:opacity-100"
              >
                <Copy size={18} className="text-gray-300" />
              </button>

              <button
                onClick={() => {
                  deleteTask(task.id);
                  setShowActions(false);
                }}
                className="p-1 opacity-80 hover:opacity-100"
              >
                <Trash2 size={18} className="text-gray-300" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          {...dragHandleProps}
          onClick={() => setShowActions((v) => !v)}
          className="p-1 opacity-80 hover:opacity-100"
        >
          <GripVertical size={18} className="text-gray-300" />
        </button>
      </div>
    </div>
  );
}
