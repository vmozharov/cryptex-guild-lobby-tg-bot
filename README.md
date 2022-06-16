# Запуск в Production
### Установка зависимостей
`npm install --production`
### Миграция базы данных
`prisma migrate deploy`
### Запуск приложения
`npm run start`

# Установка для разработки
### Установка зависимостей
`npm install`
### Установка ts-node глобально для работы nodemon
`npm install -g ts-node`
### Создание миграционных файлов при изменении схемы базы данных Prisma
`prisma migrate dev`
### Просмотр и редактирвоание базы данных
`prisma studio`
### Обновление структуры базы данных без миграции
`prisma db push`

# Переменные Environment
`APP_DATABASE_URL` - адрес базы данных

`APP_TG_BOT_TOKEN` - API токен Telegram бота
