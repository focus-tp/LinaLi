import { useState, useEffect } from "react";
import { pb, OperationType, handlePBError } from "../lib/firebase"; // импортируем твой новый клиент
import { Article } from "../types";
import { Plus, Trash2, Edit2, X } from "lucide-react";

export default function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", content: "", imageUrl: "" });
  const [error, setError] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  // Функция для загрузки списка статей
  const fetchArticles = async () => {
    try {
      const records = await pb.collection('articles').getFullList({ sort: '-created' });
      setArticles(records as unknown as Article[]);
      setLoading(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("Ошибка загрузки статей:", message);
      setError(`Ошибка загрузки: ${message}`);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    
    try {
      if (currentId) {
        await pb.collection('articles').update(currentId, form);
      } else {
        await pb.collection('articles').create(form);
      }
      setIsEditing(false);
      setForm({ title: "", content: "", imageUrl: "" });
      setCurrentId(null);
      fetchArticles(); // Обновляем список
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("Ошибка сохранения:", message);
      setError(`Ошибка сохранения: ${message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Вы уверены?")) {
      try {
        await pb.collection('articles').delete(id);
        fetchArticles();
      } catch (err) {
        handlePBError(err, OperationType.DELETE, `articles/${id}`);
      }
    }
  };

  const editArticle = (article: Article) => {
    setForm({ title: article.title, content: article.content, imageUrl: article.imageUrl || "" });
    setCurrentId(article.id);
    setIsEditing(true);
  };

  const openNew = () => {
    setForm({ title: "", content: "", imageUrl: "" });
    setCurrentId(null);
    setIsEditing(true);
  };

  return (
    // Вёрстка остаётся прежней, всё должно работать!
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-semibold">Статьи</h1>
        {!isEditing && (
          <button onClick={openNew} className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Plus size={20} />
            <span>Новая статья</span>
          </button>
        )}
      </div>
      
      {/* Остальная часть вёрстки без изменений... */}
      {isEditing ? (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium">{currentId ? 'Редактировать' : 'Новая статья'}</h2>
            <button onClick={() => { setIsEditing(false); setError(""); }} className="text-slate-400 hover:text-slate-600">
              <X size={24} />
            </button>
          </div>
           {/* Форма как была */}
          {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Заголовок</label>
              <input required disabled={submitting} value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 outline-none disabled:opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">URL Изображения</label>
              <input disabled={submitting} value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 outline-none disabled:opacity-50" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Текст статьи</label>
              <textarea required disabled={submitting} value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={8} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 outline-none disabled:opacity-50" placeholder="Текст..." />
            </div>
            <div className="flex justify-end pt-4 gap-2">
              <button type="button" onClick={() => { setIsEditing(false); setError(""); }} disabled={submitting} className="px-6 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50">
                Отмена
              </button>
              <button type="submit" disabled={submitting} className="bg-accent-teal text-white px-6 py-2 rounded-lg font-medium hover:bg-accent-blue transition-colors disabled:opacity-50">
                {submitting ? "Сохраняю..." : "Сохранить"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid gap-4">
          {loading ? <p>Загрузка...</p> : articles.map(article => (
            <div key={article.id} className="bg-white p-5 rounded-xl border flex justify-between">
              <h3 className="font-medium">{article.title}</h3>
              <div className="flex space-x-2">
                <button onClick={() => editArticle(article)} className="p-2"><Edit2 size={18}/></button>
                <button onClick={() => handleDelete(article.id)} className="p-2"><Trash2 size={18}/></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}