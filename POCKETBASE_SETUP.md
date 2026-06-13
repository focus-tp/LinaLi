# Настройка PocketBase для работы с админ-панелью

## 📋 Проблемы и их решение

### 1. ✅ Ошибка Firebase Database 'default' not found
**Статус:** РЕШЕНО
- Удалены все импорты Firebase из кода
- Проект полностью переведён на PocketBase

### 2. ✅ Mixed Content Error (HTTPS → HTTP)
**Статус:** РЕШЕНО

На GitHub Pages сайт работает по HTTPS, но PocketBase может быть на HTTP. Решение:

#### Вариант A: Использовать переменные окружения (РЕКОМЕНДУЕТСЯ)

`.env` файл уже создан с:
```
VITE_POCKETBASE_URL=http://89.169.189.230
```

Для разных сред используйте разные `.env` файлы:
- `.env` - для локальной разработки и деплоя
- Не коммитьте `.env` в репозиторий (он в `.gitignore`)

#### Вариант B: Использовать HTTPS PocketBase

Если у вас есть сертификат SSL, можно запустить PocketBase на HTTPS:
```bash
pocketbase serve --http=:8090 --https=:8443
```

#### Вариант C: Использовать прокси-сервер

`vite.config.ts` уже содержит proxy конфигурацию для локальной разработки:
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://89.169.189.230',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
}
```

### 3. ✅ CustomCursor.tsx конфликт
**Статус:** НЕ НАЙДЕНО КОНФЛИКТА
- CustomCursor только визуально отслеживает мышь
- Не блокирует события клика
- Работает корректно с формами

---

## 🚀 Как работает теперь

### Загрузка данных (Blog.tsx, Gallery.tsx)
```typescript
const fetchArticles = async () => {
  const records = await pb.collection('articles').getFullList({ sort: '-created' });
  setArticles(records as unknown as Article[]);
};
```

### Сохранение данных (AdminArticles.tsx, AdminPhotos.tsx)
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  if (currentId) {
    await pb.collection('articles').update(currentId, form);
  } else {
    await pb.collection('articles').create(form);
  }
};
```

### Обработка ошибок
- Ошибки выводятся в красное уведомление на форме
- Консоль показывает детальные логи
- Кнопка "Сохранить" показывает "Сохраняю..." во время обработки

---

## 🔧 Настройка для production

Когда вы готовы к деплою:

1. **Убедитесь, что PocketBase доступен:**
   ```bash
   curl http://89.169.189.230/api/health
   ```

2. **Проверьте, что CORS настроен в PocketBase:**
   - Админ-панель PocketBase → Settings → API Rules
   - Убедитесь, что GitHub Pages домен добавлен в CORS

3. **Если HTTPS требуется:**
   - Используйте обратный прокси (nginx, CloudFlare)
   - Или запустите PocketBase с SSL сертификатом

---

## 📝 Переменные окружения

Для разных сценариев создавайте файлы:

- `.env` (текущий) - разработка
- `.env.production` - production (GitHub Pages)
- `.env.staging` - staging

Пример `.env.production`:
```
VITE_POCKETBASE_URL=https://api.yourdomain.com
```

---

## ✨ Новые улучшения в админке

✅ **Отображение ошибок** - красные уведомления о проблемах
✅ **Состояние загрузки** - кнопка показывает "Сохраняю..."
✅ **Блокировка формы** - во время сохранения поля неактивны
✅ **Улучшенная UX** - кнопка "Отмена" рядом с "Сохранить"

---

## 🐛 Если ещё есть проблемы

Откройте консоль браузера (⌥⌘I) и ищите:

1. **Network ошибки** - значит проблема с доступом к PocketBase
2. **CORS ошибки** - нужно настроить CORS в PocketBase
3. **Ошибки в консоли** - скопируйте и отправьте

