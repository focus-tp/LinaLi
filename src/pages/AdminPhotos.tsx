import { useState, useEffect } from "react";
import { pb, OperationType, handlePBError } from "../lib/firebase";
import { Photo } from "../types";
import { Plus, Trash2, Edit2, X } from "lucide-react";

export default function AdminPhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  
  const [form, setForm] = useState({ imageUrl: "", caption: "" });

  const fetchPhotos = async () => {
    try {
      const records = await pb.collection('photos').getFullList({ sort: '-created' });
      setPhotos(records as unknown as Photo[]);
      setLoading(false);
    } catch (err) {
      handlePBError(err, OperationType.GET, "photos");
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentId) {
        await pb.collection('photos').update(currentId, {
          imageUrl: form.imageUrl,
          caption: form.caption,
        });
      } else {
        await pb.collection('photos').create({
          imageUrl: form.imageUrl,
          caption: form.caption,
        });
      }
      setIsEditing(false);
      setForm({ imageUrl: "", caption: "" });
      setCurrentId(null);
      fetchPhotos();
    } catch (err) {
      handlePBError(err, currentId ? OperationType.UPDATE : OperationType.CREATE, "photos");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Вы уверены, что хотите удалить эту фотографию?")) {
      try {
        await pb.collection('photos').delete(id);
        fetchPhotos();
      } catch (err) {
        handlePBError(err, OperationType.DELETE, `photos/${id}`);
      }
    }
  };

  const editPhoto = (photo: Photo) => {
    setForm({ imageUrl: photo.imageUrl, caption: photo.caption || "" });
    setCurrentId(photo.id);
    setIsEditing(true);
  };

  const openNew = () => {
    setForm({ imageUrl: "", caption: "" });
    setCurrentId(null);
    setIsEditing(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-semibold">Фотогалерея</h1>
        {!isEditing && (
          <button onClick={openNew} className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Plus size={20} />
            <span>Добавить фото</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium">{currentId ? 'Редактировать' : 'Новое фото'}</h2>
            <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">URL Изображения</label>
              <input required value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent-teal outline-none" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Подпись (Необязательно)</label>
              <input value={form.caption} onChange={e => setForm({...form, caption: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent-teal outline-none" placeholder="Описание фото..." />
            </div>
            <div className="flex justify-end pt-4">
              <button type="submit" className="bg-accent-teal text-white px-6 py-2 rounded-lg font-medium hover:bg-accent-blue transition-colors">
                Сохранить
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p>Загрузка...</p>
          ) : photos.length === 0 ? (
            <p className="text-slate-500">Нет добавленных фотографий.</p>
          ) : (
            photos.map(photo => (
              <div key={photo.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group">
                <div className="aspect-[4/3] bg-slate-100 relative">
                  <img src={photo.imageUrl} alt={photo.caption || "Фото"} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 space-x-4">
                    <button onClick={() => editPhoto(photo)} className="p-2 bg-white text-slate-900 rounded-full hover:bg-slate-100">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(photo.id)} className="p-2 bg-white text-red-600 rounded-full hover:bg-slate-100">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                {photo.caption && (
                  <div className="p-4">
                    <p className="text-sm text-slate-700 truncate">{photo.caption}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
