"use client";
import React, { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Edit,
  MoreVertical,
  GripVertical,
  Check,
  Search,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";

type Task = {
  id: string;
  title: string;
  tag?: string;
  completed: boolean;
  createdAt: number;
};

const STORAGE_KEY = "simplist.tasks";

export default function TaskCardDynamic() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setTasks(JSON.parse(raw));
      else {
        // optional: seed sample tasks
        const seed: Task[] = [
          { id: uuidv4(), title: "Design Tasks", completed: false, createdAt: Date.now() - 1000000 },
          { id: uuidv4(), title: "Development Tasks", completed: false, createdAt: Date.now() - 900000 },
          { id: uuidv4(), title: "Meeting Prep", completed: true, createdAt: Date.now() - 800000 },
        ];
        setTasks(seed);
      }
    } catch (e) {
      console.error("load tasks error", e);
    }
  }, []);

  // persist on tasks change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error("save tasks error", e);
    }
  }, [tasks]);

  function addOrUpdateTask() {
    const trimmed = input.trim();
    if (!trimmed) return;
    if (editingId) {
      setTasks((prev) => prev.map(t => t.id === editingId ? { ...t, title: trimmed } : t));
      setEditingId(null);
    } else {
      const newTask: Task = { id: uuidv4(), title: trimmed, completed: false, createdAt: Date.now() };
      setTasks((prev) => [newTask, ...prev]);
    }
    setInput("");
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter(t => t.id !== id));
  }

  function toggleComplete(id: string) {
    setTasks((prev) => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }

  function startEdit(id: string) {
    const t = tasks.find(x => x.id === id);
    if (!t) return;
    setInput(t.title);
    setEditingId(id);
  }

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  const visible = tasks.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="relative w-full max-w-[420px] px-4 md:px-0">
      <div className="card-frost relative rounded-bento p-5">
        {/* Search + add */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-3 text-gray-300" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search list..."
              className="w-full pl-10 pr-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-soft text-white placeholder-gray-400"
            />
          </div>

          <button
            onClick={() => {
              if (input.trim()) addOrUpdateTask();
            }}
            className="p-2 rounded-full bg-white/6 border border-white/10 hover:bg-white/10 transition"
            title={editingId ? "Update task" : "Add task"}
          >
            <Plus size={16} className="text-white" />
          </button>
        </div>

        {/* input for add/edit */}
        <div className="flex items-center gap-3 mb-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") addOrUpdateTask(); }}
            placeholder={editingId ? "Edit task..." : "Add new task..."}
            className="flex-1 px-3 py-2 rounded-soft bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] text-white placeholder-gray-400"
          />
          {editingId && (
            <button
              onClick={() => { setEditingId(null); setInput(""); }}
              className="text-sm text-gray-300 px-3 py-2"
            >
              Cancel
            </button>
          )}
          <button
            onClick={addOrUpdateTask}
            className="btn-ghost ml-1"
          >
            {editingId ? "Save" : "Add"}
          </button>
        </div>

        {/* list */}
        <div className="flex flex-col gap-3 max-h-[360px] overflow-auto pr-2">
          {visible.length === 0 ? (
            <div className="text-gray-400 text-sm py-6 text-center">No tasks found</div>
          ) : visible.map((task) => (
            <div
              key={task.id}
              className={`relative flex items-center justify-between bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)] px-3 py-3 rounded-xl
                ${task.completed ? "opacity-60 line-through" : "opacity-100"}`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleComplete(task.id)}
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${task.completed ? "bg-green-400 border-green-400" : "border-gray-400"}`}
                >
                  {task.completed && <Check size={12} className="text-white" />}
                </button>
                <div className="text-white text-sm">{task.title}</div>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => startEdit(task.id)} className="p-2 rounded-md hover:bg-white/5 transition" title="Edit">
                  <Edit size={16} className="text-gray-300" />
                </button>
                <button onClick={() => deleteTask(task.id)} className="p-2 rounded-md hover:bg-white/5 transition" title="Delete">
                  <Trash2 size={16} className="text-gray-300" />
                </button>
                <div className="p-2 opacity-70"><GripVertical size={16} className="text-gray-400" /></div>
              </div>
            </div>
          ))}
        </div>

        {/* footer */}
        <div className="flex items-center justify-between mt-4 text-gray-300 text-sm">
          <div className="flex items-center gap-2">
            <Check size={16} /> <span>COMPLETED</span> <span className="ml-2 font-semibold">{completedCount}/{totalCount}</span>
          </div>
          <MoreVertical size={18} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
}
