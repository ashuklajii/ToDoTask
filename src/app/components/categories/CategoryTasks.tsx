"use client";

import React, { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DraggableProvided,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import TaskRow from "./TaskRow";
import { X, MoreHorizontal } from "lucide-react";

type Task = { id: string; title: string; completed: boolean };
type Category = { id: string; title?: string };

type Props = {
  tasks: Task[];
  setTasks: (updater: Task[] | ((prev: Task[]) => Task[])) => void;
  category: Category;
  onCopy?: (categoryId: string) => void;
  onDelete?: (categoryId: string) => void;
};

export default function CategoryTasks({ tasks, setTasks, category, onCopy, onDelete }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);

  const completed = useMemo(() => tasks.filter((t) => t.completed).length, [tasks]);
  const total = tasks.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const angle = Math.round((percent / 100) * 360);

  const visibleTasks = useMemo(() => {
    if (showCompleted) return tasks;
    return tasks.filter((t) => !t.completed);
  }, [tasks, showCompleted]);

  const onDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setTasks(items);
  }, [tasks, setTasks]);

 function addTask() {
    setTasks((prev: any[]) => [
      { id: Date.now().toString(), title: "New Task", completed: false },
      ...prev,
    ]);
  }

  function toggle(id: string) {
    setTasks((prev: Task[]) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteList() {
    if (onDelete) onDelete(category.id);
    else setTasks([]);
    setMenuOpen(false);
  }

  function duplicateList() {
    setTasks((prev: Task[]) => [
      ...prev,
      ...prev.map((t) => ({ ...t, id: `${Date.now()}-${Math.random()}` })),
    ]);
    setMenuOpen(false);
  }

  function clearAll() {
    setTasks((prev: Task[]) => prev.map((t) => ({ ...t, completed: false })));
    setMenuOpen(false);
  }

  function handleCopy() {
    if (onCopy) onCopy(category.id);
    setMenuOpen(false);
  }
 return (
  <div className="flex flex-col gap-3">

    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={`cat-${category.id}`}>
        {(provided: DroppableProvided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col gap-3"
          >
            <AnimatePresence initial={false}>
              {visibleTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(dragProvided: any, snapshot: DraggableStateSnapshot) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.12 }}
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      className={snapshot.isDragging ? "z-50" : ""}
                    >
                      <TaskRow
                        task={task}
                        setTasks={setTasks}
                        dragHandleProps={dragProvided.dragHandleProps}
                        onToggle={() => toggle(task.id)}
                      />
                    </motion.div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </AnimatePresence>
          </div>
        )}
      </Droppable>
    </DragDropContext>

  

    <div className="mt-5 flex items-center justify-between relative">
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: `conic-gradient(#fff ${angle}deg, rgba(255,255,255,0.06) ${angle}deg 360deg)`
          }}
        >
          <div className="w-5 h-5 rounded-full bg-[#1A1A1A] border border-white/10" />
        </div>

        <div >COMPLETED:</div>
        <div >
          {completed}/{total}
        </div>
      </div>
      <div className="relative">
        <button
          onClick={() => setMenuOpen((s) => !s)}
          aria-expanded={menuOpen}
          className="p-2   hover:bg-white/10 rounded-xl transition border border-white/10"
        >
          <MoreHorizontal size={18}  />
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.12 }}
              className="
                absolute bottom-12 right-0 
                w-64 
                bg-[#1E1E1E]/95 
                rounded-2xl 
                border border-white/10 
                shadow-[0_0_40px_rgba(0,0,0,0.6)]
                backdrop-blur-xl
                p-5 z-[60]
              "
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-[#1F1F1F]
                           border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              >
                <X size={18} className="text-gray-300" />
              </button>

              <div className="flex flex-col gap-4 text-gray-200 text-sm">
                <button onClick={deleteList} className="text-left hover:text-white transition">
                  Delete list
                </button>

                <button onClick={duplicateList} className="text-left hover:text-white transition">
                  Duplicate
                </button>

                <div className="flex items-center justify-between">
                  <span>Show completed</span>
                  <button
                    onClick={() => setShowCompleted((s) => !s)}
                    className={`w-10 h-5 rounded-full flex items-center px-1 transition ${
                      showCompleted ? "bg-white/80" : "bg-gray-600"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition ${
                        showCompleted ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <button
                  onClick={clearAll}
                  className="text-left hover:text-white transition text-red-300"
                >
                  Clear all
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>

  </div>
);
  }