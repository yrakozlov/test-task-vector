# Тестовое задание

## Описание проекта
Данный проект представляет собой страницу управления сервис логами.
Форма создания написана с использование библиотеки react-hook-form

При перезагрузки страницы все черновики и сервис логи сохраняются в localStorage.
Храняться черновики и сервис логи в редаксе. При удалении, изменении черновика данные перезаписываются сначало в редаксе , а потом уже в localStorage.

Если все требования к полям соблюдены после клика на create service log создается сервис лог. Данные о нем записываются сначало в редакс, а потом в localStorage.

Список сервис логов можно фильтровать по дате (есть ли она в диапозоне), типу. Также есть поиск. Все фильтры можно очистить с помощью кнопки Clear filters. 

Созданные сервис логи можно удалять с помощью кнопки Delete

## Технологии

- **React**
- **Redux Toolkit** 
- **TypeScript**
- **MUI**
- **react-hook-form**
- **yup**
- **dayjs**

## Установка и запуск
node version 20.15.0

npm install
npm run dev