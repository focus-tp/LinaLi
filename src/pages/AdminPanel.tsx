import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { pb } from "../lib/firebase";
import AdminArticles from "./AdminArticles";
import AdminPhotos from "./AdminPhotos";
import { LayoutDashboard, FileText, Image as ImageIcon, LogOut } from "lucide-react";
import { cn } from "../lib/utils";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем, авторизован ли пользователь
    const isAuthenticated = pb.authStore.isValid;
    
    if (!isAuthenticated) {
      navigate("/admin");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;
  }

  const handleLogout = () => {
    pb.authStore.clear();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col">
        <h2 className="font-serif text-2xl font-semibold mb-8">Кабинет</h2>
        <nav className="flex-1 space-y-2">
          <Link
            to="/admin/panel/articles"
            className="flex items-center space-x-3 text-slate-700 hover:bg-slate-100 p-3 rounded-lg transition-colors"
          >
            <FileText size={20} />
            <span>Статьи</span>
          </Link>
          <Link
            to="/admin/panel/photos"
            className="flex items-center space-x-3 text-slate-700 hover:bg-slate-100 p-3 rounded-lg transition-colors"
          >
            <ImageIcon size={20} />
            <span>Фотогалерея</span>
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 text-red-600 hover:bg-red-50 p-3 rounded-lg transition-colors mt-auto"
        >
          <LogOut size={20} />
          <span>Выйти</span>
        </button>
      </aside>
      
      <main className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route path="/" element={<AdminArticles />} />
          <Route path="articles" element={<AdminArticles />} />
          <Route path="photos" element={<AdminPhotos />} />
        </Routes>
      </main>
    </div>
  );
}
