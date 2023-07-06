![alt text](https://ssocial.top/uploads/users/1/insta.png)
#RU:
# Тестовое задание: Система для работы с изображениями

## Описание проекта

Этот проект представляет собой систему из двух приложений (фронтенд и бэкенд), которая позволяет загружать, просматривать, редактировать и удалять изображения и описания к ним. Информация сохраняется между перезагрузками страницы. Сущность изображения включает в себя:

- изображение
- описание
- идентификатор

## Стек технологий

- Typescript (и фронтенд, и бэкенд)
- NestJS
- React (функциональные компоненты)

## Установка и запуск

Для запуска проекта необходимо иметь установленные Node.js и npm.

1. Клонируйте репозиторий : `git clone https://github.com/StarkSocial/insta.git`
2. Перейдите в папку с проектом
3. Установите зависимости для фронтенда и бэкенда с помощью команд `npm install` в папках `psinst` и `psfront` + может потребоваться создание папки `uploads` в `psinst`
4. Настройте БД:
		type: 'mysql',
		host: 'localhost',
		port: 3306,
		username: 'root',
		password: 'root',
		database: 'insta',
		(можно сменить после всей настройки)
4. Запустите фронтенд и бэкенд с помощью команд `npm start` для `psinst` и `set PORT=4000& npm start` для `psfront`
5. Откройте браузер и перейдите по адресу `http://localhost:3000` для фронтенда и `http://localhost:4000` для бэкенда

## Использование

На главной странице вы увидите изображение 404 (если нет изображений) и кнопки для добавления нового изображения. При нажатии на кнопку `Upload a photo` откроется диалог выбора файла, при нажатии на кнопку `Publish` - окно добавления описания. После этого на главной странице появится карточка с новым изображением, которую можно редактировать или удалить.

Каждая карточка сущности содержит:

- Фотографию
- Описание к ней
- Кнопку `Delete`, которая удаляет сущность
- Кнопку `Edit`, которая переводит в режим редактирования карточки

При переходе по `<frontend_url>/:id` выводится только карточка с соответствующим ID.

## Backend API

Бэкенд предоставляет следующие эндпоинты для работы с данными:

- GET `<backend_url>/` -- полный список всех сущностей
- GET `<backend_url>/:id` -- одна выбранная сущность
- POST `<backend_url>/` -- добавление сущности
- PATCH `<backend_url>/:id` -- редактирование выбранной сущности
- DELETE `<backend_url>/:id` -- удаление выбранной сущности

Данные хранятся в БД MySQL и на сервере `backend`.

## Вместо послесловия

Это тестовое задание было выполнено за ограниченное время, поэтому есть много места для улучшения. Вот что я бы предложил сделать, если бы развивал этот проект:

- Добавил бы систему аккаунтов и роли пользователей
- Добавил бы валидацию данных на фронтенде и бэкенде при помощи системы аккаунтов
- Добавил бы появление ошибок пользователю
- Добавил бы тесты для фронтенда и бэкенда
- Добавил бы возможность загружать несколько файлов за раз
- Добавил бы пагинацию или для списка сущностей
- Добавил бы документацию для кода
- Добавил бы возможность комментировать и оценивать изображения
- Добавил бы фильтры и поиск по изображениям
- Добавил бы оптимизацию и сжатие изображений
- Добавил бы интеграцию с облачными сервисами для хранения изображений
  

#EN:
# Test task: A system for working with images

## Project Description

This project is a system of two applications (frontend and backend) that allows you to upload, view, edit and delete images and descriptions to them. The information is saved between page reloads. The essence of the image includes:

- image
- description
- id

## Technology stack

- Typescript (both frontend and backend)
- NestJS
- React (functional components)

## Installation and launch

To run the project, you need to have installed Node.js and npm.

1. Clone the repository: `git clone https://github.com/StarkSocial/insta.git`
2. Go to the project folder
3. Install the dependencies for the frontend and backend using the `npm install` commands in the `psinst` and `psfront` folders + you may need to create the `uploads` folder in `psinst`
4. Configure the database:
type: 'mysql',
host: 'localhost',
port: 3306,
username: 'root',
password: 'root',
database: 'insta',
(can be changed after all the setup)
4. Start the frontend and backend using the commands `npm start` for `psinst` and `set PORT=4000& npm start` for `psfront`
5. Open the browser and go to `http://localhost:3000` for frontend and `http://localhost:4000` for the backend

## Usage

On the main page you will see a 404 image (if there are no images) and buttons for adding a new image. Clicking on the `Upload a photo` button opens a file selection dialog, clicking on the `Publish` button opens a window for adding a description. After that, a card with a new image will appear on the main page, which can be edited or deleted.

Each entity card contains:

- Photo
- Description of it
- The `Delete` button that deletes the entity
- The `Edit` button, which switches to the card editing mode

When clicking on `<frontend_url>/:id`, only the card with the corresponding ID is displayed.

## Backend API

The backend provides the following endpoints for working with data:

- GET `<backend_url>/` -- full list of all entities
- GET `<backend_url>/:id` -- one selected entity
- POST `<backend_url>/` -- adding an entity
- PATCH `<backend_url>/:id` -- editing the selected entity
- DELETE `<backend_url>/:id` -- deleting the selected entity

The data is stored in the MySQL database and on the `backend` server.

## Instead of an afterword

This test task was completed in a limited time, so there is a lot of room for improvement. Here's what I would suggest doing if I were developing this project:

- I would add a system of accounts and user roles
- I would add data validation on the frontend and backend using the account system
- I would add the appearance of errors to the user
- I would add tests for the frontend and backend
- I would add the ability to upload multiple files at a time
- I would add pagination or for a list of entities
- I would add documentation for the code
- I would add the ability to comment and rate images
- I would add filters and image search
- I would add optimization and image compression
- I would add integration with cloud services for storing images
