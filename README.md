# Coffee House

Лендинг для RS School — [Landing Page, часть 1](https://github.com/rolling-scopes-school/tasks/blob/master/fullstack-engineering/tasks/landing-page/README-part-1.md).

**Деплой:** _(ссылка появится после публикации)_

## Стек

Чистые HTML, SCSS и JavaScript без фреймворков. Сборка — Vite, нормализация стилей — modern-normalize.

## Запуск

```bash
pnpm install
pnpm dev      # дев-сервер
pnpm build    # сборка в dist/
pnpm preview  # просмотр собранной версии
```

## Структура

```
index.html            главная страница
menu.html             страница каталога
src/js/main.js        точка входа главной
src/js/menu.js        точка входа каталога
src/js/theme.js       переключение темы + localStorage
src/scss/main.scss    сборка стилей главной
src/scss/menu.scss    сборка стилей каталога
src/scss/abstracts/   переменные и миксины
src/scss/base/        сброс, базовые стили, утилиты
src/scss/layout/      header и footer, общие для обеих страниц
src/scss/sections/    секции страниц
src/assets/images/    изображения и иконки
```
