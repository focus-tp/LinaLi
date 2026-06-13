import { useState, useEffect } from "react";
import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";

// Оставляем ваш тип, но если TypeScript будет ругаться, 
// убедитесь, что в типе Article прописаны поля: id, title, content, created_at, image_url
import { Article } from "../../types"; 

export default function Blog() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      // Подключаемся к вашему новому бэкенду на Timeweb!
      const response = await fetch('https://cj945451.tw1.ru/api.php?login=LinaLi');
      const data = await response.json();
      
      if (data.status === 'success') {
        setArticles(data.data as Article[]);
      }
      setLoading(false);
    } catch (error) {
      console.warn("Ошибка при загрузке новостей с Timeweb:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading || articles.length === 0) return null;

  return (
    <section id="blog" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-semibold text-slate-900 mb-6">Блог и Статьи</h2>
          <p className="text-slate-600">Публикации, мысли и профессиональный опыт.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.div 
              key={article.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col"
            >
              {/* Поле картинки изменено на image_url (формат базы данных) */}
              {article.image_url && (
                <div className="w-full h-48 bg-slate-100 flex-shrink-0">
                  <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-8 flex flex-col flex-1">
                {/* Поле даты изменено на created_at */}
                <span className="text-xs text-slate-400 mb-3 block">
                  {new Date(article.created_at).toLocaleDateString('ru-RU')}
                </span>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">{article.title}</h3>
                <div className="prose prose-sm prose-slate line-clamp-4 flex-1">
                  <ReactMarkdown>{article.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}