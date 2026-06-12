import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Останавливаем перезагрузку страницы при отправке формы
    setError("");
    
    try {
      // Пытаемся войти с помощью почты и пароля
      await signInWithEmailAndPassword(auth, email, password);
      // Если успешно — пускаем в админку
      navigate("/admin/panel");
    } catch (err: any) {
      console.error(err);
      setError("Неверный логин или пароль. Проверьте данные.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center">
        <h1 className="font-serif text-3xl font-semibold mb-2">Админ-панель</h1>
        <p className="text-slate-500 mb-8">Управление контентом сайта портфолио</p>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4 text-left">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-500"
              placeholder="client@yandex.ru"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm text-slate-600 mb-1">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-500"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-slate-900 text-white font-medium py-3 rounded-lg hover:bg-slate-800 transition-colors mt-2"
          >
            Войти в панель
          </button>
        </form>
      </div>
    </div>
  );
}