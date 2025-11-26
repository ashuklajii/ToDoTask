"use client";

import { useState } from "react";
import CategoryCard from "./components/categories/CategoryCard";
import SearchBar from "./components/SearchBar";

export default function Page() {
  
  const themes: any = {
    dark: "/themes/dark.jpg",
    neon: "/themes/neon.jpg",
    soft: "/themes/soft.jpg",
    gradient: "/themes/gradient.jpg",
  };

  const [theme, setTheme] = useState("dark");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const [categories, setCategories] = useState([
    {
      id: "1",
      title: "Design Tasks",
      icon: null,
      color: "#ffffff",
      tasks: [
        { id: "a", title: "Update Figma components", completed: false },
        { id: "b", title: "Create new icons", completed: true },
        { id: "c", title: "Review design feedback", completed: false },
      ],
    },
    {
      id: "2",
      title: "Development Tasks",
      icon: "Square",
      color: "#ffffff",
      tasks: [
        { id: "d", title: "Fix UI bug in navbar", completed: false },
        { id: "e", title: "API integration for login", completed: true },
        { id: "f", title: "Code cleanup & refactor", completed: false },
        { id: "g", title: "Add dark mode", completed: false },
      ],
    },
    {
      id: "3",
      title: "Meeting Prep",
      icon: "CheckCircle",
      color: "#ffffff",
      tasks: [
        { id: "h", title: "Team sync-up meeting", completed: false },
        { id: "i", title: "Prepare demo slides", completed: true },
        { id: "j", title: "Feedback discussion", completed: false },
        { id: "k", title: "Schedule client call", completed: true },
      ],
    },
    {
      id: "4",
      title: "Learning Goals",
      icon: "Calendar",
      color: "#ffffff",
      tasks: [
        { id: "l", title: "Learn TypeScript deeply", completed: true },
        { id: "m", title: "Master React Hooks", completed: false },
        { id: "n", title: "Practice DSA daily", completed: false },
      ],
    },
    {
      id: "5",
      title: "Team Collaboration",
      icon: "User",
      color: "#ffffff",
      tasks: [
        { id: "o", title: "Discuss project roadmap", completed: false },
        { id: "p", title: "Share weekly progress", completed: true },
        { id: "q", title: "Review PR requests", completed: false },
      ],
    },
    {
      id: "6",
      title: "Personal Development",
      icon: "Zap",
      color: "#ffffff",
      tasks: [
        { id: "r", title: "Read 30 mins daily", completed: false },
        { id: "s", title: "Morning workout", completed: true },
        { id: "t", title: "Mindfulness meditation", completed: false },
        { id: "u", title: "Weekly goal planning", completed: false },
      ],
    },
  ]);

  const [search, setSearch] = useState("");

  function update(c: any) {
    setCategories(prev => prev.map(x => (x.id === c.id ? c : x)));
  }

  function deleteCat(id: string) {
    setCategories(prev => prev.filter(x => x.id !== id));
  }

  function copyCat(c: any) {
    setCategories(prev => [
      ...prev,
      { ...c, id: Date.now().toString(), title: c.title }
    ]);
  }

  function handleAddCategory() {
    const iconList = [
      "Image", "Square", "CheckCircle", "Calendar", "User", "Zap",
      "Heart", "BookOpen", "MessageSquare", "Home", "Sparkles"
    ];
    const randomIcon = iconList[Math.floor(Math.random() * iconList.length)];

    const newCategory = {
      id: Date.now().toString(),
      title: "New List",
      icon: randomIcon,
      color: "#ffffff",
      tasks: [],
    };

    setCategories((prev: any) => [...prev, newCategory]);
  }

  return (
    <main
      className="min-h-screen p-4 flex justify-center items-start fade-bg"
      style={{
        backgroundImage: `url(${themes[theme]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      
      <div className="fixed bottom-6 left-6 flex gap-4 z-50 ">
        <button onClick={() => setTheme("dark")} className="w-12 h-12 rounded-full border-2 border-white/40 bg-dark backdrop-blur-sm shadow-xl transition-all hover:scale-110" />
        <button onClick={() => setTheme("neon")} className="w-12 h-12 rounded-full border-2 border-white/40 bg-gradient-to-br from-pink-500 to-purple-600 shadow-xl transition-all hover:scale-110" />
        <button onClick={() => setTheme("soft")} className="w-12 h-12 rounded-full border-2 border-white/40 bg-[url('/themes/soft.jpg')] bg-cover bg-center shadow-xl transition-all hover:scale-110" />
        <button onClick={() => setTheme("gradient")} className="w-12 h-12 rounded-full border-2 border-white/40 bg-gradient-to-br from-blue-400 to-purple-400 shadow-xl transition-all hover:scale-110" />
      </div>

      <div className="w-full h-[630px] sm:w-[414px] sm:h-[630px] border-4 border-dark border-opacity-85 rounded-3xl bg-dark relative overflow-hidden flex flex-col bg-opacity-85">


        {!activeCategory && (
          <div className="pt-3 px-2">
            <SearchBar onSearch={(text: any) => setSearch(text)} onAddCategory={handleAddCategory} />
          </div>
        )}

        <div
  className={`
    flex-1 overflow-y-auto hide-scrollbar mt-3 px-1 pb-10 space-y-3 
    transition-all duration-300
    ${activeCategory ? "opacity-0 pointer-events-none" : "opacity-100"}
  `}
>

          {categories
            .filter(cat => cat.title.toLowerCase().includes(search.toLowerCase()))
            .map(cat => (
              <CategoryCard
                key={cat.id}
                category={cat}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                onUpdate={update}
                onDelete={deleteCat}
                onCopy={copyCat}
              />
            ))}
        </div>

        {/* Fullscreen Category Scroll */}
        {activeCategory &&
          <div className="flex-1 overflow-y-auto px-1 pb-10">
            {categories
              .filter(cat => cat.id === activeCategory)
              .map(cat => (
                <CategoryCard
                  key={cat.id}
                  category={cat}
                  fullscreen
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  onUpdate={update}
                  onDelete={deleteCat}
                  onCopy={copyCat}
                />
              ))}
          </div>
        }

      </div>
    </main>
  );
}
