# ⚡ Шпаргалка: Проблемы с сохранением данных

## Если кнопка "Сохранить" не работает:

### Шаг 1: Проверить консоль браузера (⌥⌘I)
```
Вкладка: Console
```

Ищи одну из этих ошибок:

#### ❌ "Mixed Content: The page at ... was loaded over HTTPS"
**Решение:** 
- Это ожидаемо на GitHub Pages
- В `.env` установи HTTPS URL для PocketBase
- Или используй прокси

#### ❌ "CORS policy: No 'Access-Control-Allow-Origin' header"
**Решение:**
- PocketBase сервер не настроен
- Открой http://89.169.189.230:8090 в админ-панели
- Settings → API Rules → добавь GitHub Pages домен
- Или запусти: `pocketbase serve --corsOrigin=*`

#### ❌ "Cannot GET /api/collections/articles/records"
**Решение:**
- PocketBase сервер не запущен
- Запусти: `pocketbase serve` (на сервере)
- Или проверь IP адрес в .env

#### ✅ Если нет ошибок, но кнопка всё равно не работает:
1. Посмотри вкладку Network (⌥⌘I → Network)
2. Найди запрос к /api/collections/articles
3. Посмотри Response статус (должен быть 200, 201 или 204)
4. Если 4xx или 5xx — скопируй ошибку

---

### Шаг 2: Проверить локально
```bash
# 1. Убедись, что PocketBase работает
curl http://89.169.189.230/api/health

# 2. Запусти локальный сервер
npm run dev

# 3. Открой http://localhost:3000/LinaLi/admin
# 4. Попробуй добавить статью
```

---

### Шаг 3: Проверить .env файл
```bash
# 1. Убедись, что .env существует
ls -la .env

# 2. Содержимое должно быть:
cat .env
# VITE_POCKETBASE_URL=http://89.169.189.230

# 3. Если нету - создай:
echo "VITE_POCKETBASE_URL=http://89.169.189.230" > .env
```

---

## Быстрая диагностика

```bash
# Проверить доступность PocketBase
curl -v http://89.169.189.230/api/health

# Показать все статьи
curl http://89.169.189.230/api/collections/articles/records

# Показать все фото
curl http://89.169.189.230/api/collections/photos/records

# Проверить, что npm run build работает
npm run build

# Проверить типы
npm run lint
```

---

## Решение для Production

### Если используешь GitHub Pages:

1. **Вариант A (Рекомендуемый):** HTTPS прокси
   - Используй CloudFlare (бесплатно)
   - Или nginx reverse proxy
   - Или другой HTTPS прокси

2. **Вариант B:** GitHub Secrets
   ```bash
   # Перейди в Settings → Secrets and variables → Actions
   # Создай: VITE_POCKETBASE_URL=https://api.yourdomain.com
   ```

3. **Вариант C:** SSL сертификат для PocketBase
   ```bash
   pocketbase serve --https=:8443 --cert=/path/to/cert.pem --key=/path/to/key.pem
   ```

---

## Если всё ещё не работает

Собери информацию:
1. Скопируй ошибку из консоли
2. Скопируй Request/Response из Network вкладки
3. Напиши, на каком шаге ошибка
4. Отправь для диагностики

