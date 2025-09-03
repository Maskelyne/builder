# 🚀 Gulp + Pug + SCSS + Swiper + ESLint

Готовая сборка для верстки с поддержкой Pug, SCSS, оптимизацией изображений (WebP + AVIF), ESLint и слайдера Swiper.

---

## 📦 Установка

```bash
# Удалить старые зависимости (если есть)
rm -rf node_modules package-lock.json

# Установить зависимости
npm install
```

---

## 🛠 Команды

- `npm run dev` — запуск режима разработки (BrowserSync, Pug, SCSS, JS, картинки, слежение за изменениями).
- `npm run build` — сборка проекта в продакшен (`dist/`), минификация и оптимизация.
- `npm run lint` — проверка кода ESLint (Standard Style) + автофикс.

---

## 📂 Структура проекта

```
src/
├── pug/
│   ├── layout.pug      # базовый шаблон
│   └── index.pug       # пример страницы
├── scss/
│   └── style.scss      # главный SCSS файл
├── js/
│   └── main.js         # подключение Swiper
└── images/             # изображения
```