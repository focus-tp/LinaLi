import { useState, useEffect, useRef } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../../lib/firebase";
import { Photo } from "../../types";
import { motion, useScroll, useTransform } from "motion/react";

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  useEffect(() => {
    const q = query(collection(db, "photos"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Photo));
      setPhotos(docs);
      setLoading(false);
    }, (error) => {
      console.warn("Firestore access offline or error:", error);
      setLoading(false);
    });
    return unsub;
  }, []);

  return (
    <section ref={targetRef} className={`bg-slate-900 relative ${photos.length > 0 ? "h-[300vh]" : "h-0 overflow-hidden"}`}>
      {photos.length > 0 && !loading && (
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="absolute top-0 left-0 w-full p-12 z-10 pointer-events-none">
            <h2 className="text-3xl md:text-5xl font-serif font-semibold text-white drop-shadow-lg">
              Моменты и Воспоминания
            </h2>
            <p className="text-slate-300 mt-2 text-lg">Галерея событий и мероприятий</p>
          </div>

          <motion.div style={{ x }} className="flex gap-8 px-12 pt-24 pb-12 w-max">
            {photos.map((photo) => (
              <div 
                key={photo.id} 
                className="w-[80vw] sm:w-[50vw] md:w-[600px] h-[50vh] md:h-[60vh] shrink-0 relative rounded-3xl overflow-hidden group"
              >
                <img 
                  src={photo.imageUrl} 
                  alt={photo.caption || "Фото"} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {photo.caption && (
                  <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-lg font-medium">{photo.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
}
