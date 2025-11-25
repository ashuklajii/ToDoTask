
"use client";

import { useState, useEffect } from "react";
import CategoryHeader from "./CategoryHeader";
import CategoryTasks from "./CategoryTasks";
import { ArrowLeft, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CategoryCard({
  category,
  onUpdate,
  onDelete,
  onCopy,
  activeCategory,
  setActiveCategory,
  fullscreen,
}: any) {

  const [tasks, setTasks] = useState(category.tasks ?? []);
  const isOpen = fullscreen === true;

  useEffect(() => {
    setTasks(category.tasks ?? []);
  }, [category]);

  useEffect(() => {
    onUpdate({ ...category, tasks });
  }, [tasks]);


  if (!isOpen) {
    return (
      <motion.div layout>
        <div onClick={() => setActiveCategory(category.id)}>
          <CategoryHeader
            category={category}
            tasks={tasks}
            onCopy={onCopy}
            onDelete={onDelete}
            onUpdate={onUpdate}
            setActiveCategory={setActiveCategory}
            isOpen={false}
          />
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        key="full"
        layout
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="
          absolute inset-0 z-50 
          bg-dark
          rounded-3xl border-4 border-dark 
          p-4 overflow-y-auto
        "
      >

        {/* HEADER WITH BACK BUTTON */}
        <div className="flex items-center justify-between mb-4">
          
          {/* Back */}
          <button
            onClick={() => setActiveCategory(null)}
            className="
              w-10 h-10 rounded-full bg-[#1F1F1F] 
              border border-white/10 flex items-center justify-center
            "
          >
            <ArrowLeft size={20} className="text-gray-300" />
          </button>

          {/*  CLOSING TAG HERE */}
          <p className="text-white text-lg font-medium">
            {category.title}
          </p>

          {/* ADD TASK BUTTON */}
          <button
            onClick={() =>
              setTasks(prev => [
                {
                  id: Date.now().toString(),
                  title: "New Task",
                  completed: false
                },
                ...prev,
              ])
            }
            className="
              w-10 h-10 rounded-full bg-[#1F1F1F] 
              border border-white/10 flex items-center justify-center
            "
          >
            <Plus size={20} className="text-gray-300" />
          </button>

        </div>

        {/* TASK LIST */}
        <CategoryTasks
          tasks={tasks}
          setTasks={setTasks}
          category={category}
          onCopy={onCopy}
          onDelete={onDelete}
        />

      </motion.div>
    </AnimatePresence>
  );
}
