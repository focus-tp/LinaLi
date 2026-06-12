import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../../lib/firebase";
import { Article } from "../../types";
import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";

export default function Blog() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "articles"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));
      setArticles(docs);
      setLoading(false);
    }, (error) => {
      console.warn("Firestore access offline or error:", error);
      setLoading(false);
    });
    return unsub;
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
              {article.imageUrl && (
                <div className="w-full h-48 bg-slate-100 flex-shrink-0">
                  <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-8 flex flex-col flex-1">
                <span className="text-xs text-slate-400 mb-3 block">{new Date(article.createdAt).toLocaleDateString('ru-RU')}</span>
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
