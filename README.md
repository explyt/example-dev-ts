# NocoDB

NocoDB - это самый быстрый и простой способ создавать базы данных онлайн. Это открытая альтернатива Airtable.

## Быстрый старт

### Необходимые инструменты

- [Node.js](https://nodejs.org/) (рекомендуется LTS версия)
- [pnpm](https://pnpm.io/installation) - Менеджер пакетов для Node.js

### Установка

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/nocodb/nocodb.git
   cd nocodb
   ```

2. Установите зависимости:
   ```bash
   pnpm install
   ```

### Запуск приложения

1. Запустите фронтенд:
   ```bash
   pnpm run start:frontend
   ```

2. Запустите бэкенд:
   ```bash
   pnpm run start:backend
   ```

### После запуска

Приложение будет доступно по адресу: **http://localhost:8080/dashboard**

## Тестирование

Проект покрыт тестами. Чтобы их запустить, выполните в директории проекта:
```bash
pnpm run test
```
