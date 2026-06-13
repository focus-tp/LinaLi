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

  // Функция для загрузки списка статей
  const fetchArticles = async () => {
    try {
      const records = await pb.collection('articles').getFullList({ sort: '-created' });
      setArticles(records as unknown as Article[]);
      setLoading(false);
    } catch (err) {
      handlePBError(err, OperationType.GET, "articles");
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      handlePBError(err, currentId ? OperationType.UPDATE : OperationType.CREATE, "articles");
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
           {/* Форма как была */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Заголовок</label>
              <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 outline-none" />
            </div>
            {/* ... остальные поля ... */}
            <div className="flex justify-end pt-4">
              <button type="submit" className="bg-accent-teal text-white px-6 py-2 rounded-lg">Сохранить</button>
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