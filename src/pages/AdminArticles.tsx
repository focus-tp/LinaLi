import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";
import { Article } from "../types";
import { Plus, Trash2, Edit2, X } from "lucide-react";

export default function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  
  const [form, setForm] = useState({ title: "", content: "", imageUrl: "" });

  useEffect(() => {
    const q = query(collection(db, "articles"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));
      setArticles(docs);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, "articles");
    });
    return unsub;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentId) {
        await updateDoc(doc(db, "articles", currentId), {
          title: form.title,
          content: form.content,
          imageUrl: form.imageUrl,
          updatedAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, "articles"), {
          title: form.title,
          content: form.content,
          imageUrl: form.imageUrl,
          createdAt: serverTimestamp(),
        });
      }
      setIsEditing(false);
      setForm({ title: "", content: "", imageUrl: "" });
      setCurrentId(null);
    } catch (err) {
      handleFirestoreError(err, currentId ? OperationType.UPDATE : OperationType.CREATE, "articles");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Вы уверены, что хотите удалить эту статью?")) {
      try {
        await deleteDoc(doc(db, "articles", id));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `articles/${id}`);
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

      {isEditing ? (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium">{currentId ? 'Редактировать' : 'Новая статья'}</h2>
            <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Заголовок</label>
              <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent-teal outline-none" placeholder="Введите заголовок" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">URL Изображения</label>
              <input value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent-teal outline-none" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Текст статьи</label>
              <textarea required value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={8} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent-teal outline-none" placeholder="Текст..." />
            </div>
            <div className="flex justify-end pt-4">
              <button type="submit" className="bg-accent-teal text-white px-6 py-2 rounded-lg font-medium hover:bg-accent-blue transition-colors">
                Сохранить
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid gap-4">
          {loading ? (
            <p>Загрузка...</p>
          ) : articles.length === 0 ? (
            <p className="text-slate-500">Нет добавленных статей.</p>
          ) : (
            articles.map(article => (
              <div key={article.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-lg text-slate-900">{article.title}</h3>
                  <p className="text-sm text-slate-500">{new Date(article.createdAt).toLocaleString('ru-RU')}</p>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => editArticle(article)} className="p-2 text-slate-400 hover:text-accent-blue bg-slate-50 rounded-lg">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(article.id)} className="p-2 text-slate-400 hover:text-red-500 bg-slate-50 rounded-lg">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
