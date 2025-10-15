## Подготовка и старт проекта для автотестов на Playwright 

### Шаги перед запуском:

### Шаг 1 - Установка проекта

```bash
npm install --force
```

### Шаг 2 - Инициализация проекта

```bash
npm init playwright@latest --force
```

Эта команда запускает **официальный установщик Playwright**, который создаёт локальную структуру проекта, добавляет зависимости и конфигурационные файлы для начала автоматизированного тестирования.

---

### ⚙️ В процессе установки выберите следующие параметры:

- **Where to put your end-to-end tests?** → `tests`  
  *(Папка, где будут храниться тесты)*

- **Add a GitHub Actions workflow? (y/N)** → `false`  
  *(Можно добавить позже вручную)*

- **Install Playwright browsers? (Y/n)** → `true`  
  *(Сразу устанавливаем все необходимые браузеры: Chromium, Firefox, WebKit)*

---

После завершения установки ты получишь готовую структуру проекта, с которой можно работать в **VS Code** или любом другом редакторе.

---

### Шаг 3 - Развернуть проект локально:

```bash
npm start
```

---

## Остальные темы (модуль Advenced):

### 1 - NPM-скрипты 

Запусти только один конкретный тестовый файл 'NavigationPageObject.spec.ts' и сделай это только в браузере Chromium:

```bash
npx playwright test NavigationPageObject.
spec.ts --project=chromium 
```

Но чтобы сократить команды, можно использовать скрипты в файле package.json - в разделе "scripts" можно добавить любое количество команд: 

```bash
"scripts": {
    "pageObjects-chrome": "npx playwright test NavigationPageObject.spec.ts --project=chromium",
  },
```

И далее вызвать тестовый файл в терминале при помощи следующей команды:

```bash
npm run pageObjects-chrome 
```

---

### 2 - Faker js (для изменения тестовых данных)

Устанавливаем библиотеку в package.json (после инсталяции faker-js отобразится в файле - раздел "devDependencies")

```bash
npm i @faker-js/faker --save-dev --force
```

Далее импортируем faker-js в наш тестовый файл:

```bash
import { faker } from '@faker-js/faker'
```

И после создаем переменную в которую передаем faker данные (пример):

```bash
const randomFullName = faker.person.fullName()
const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
```

---


### 3 - @smoke (теги для вызова оопределенных наборов тестов)

Добавляем к названию теста тег: @smoke

```bash
test('navigate to form page @smoke', async ({page}) => {
	const pm = new PageManager(page)
	await pm.navigateTo().formLayoutsPage()
})
```

и после запускаем его в терминале при помощи команды:

```bash
npx playwright test --project=chromium --grep @smoke
```

также можно запустить сразу несколько тестов с разными тегами при помощи одной команды:

```bash
npx playwright test --project=chromium --grep "@smoke|@regression"
```
--- 

### 4 - Установка и использование allure-playwright reporter

шаг 1:
```bash
npm install -D allure-playwright
```

шаг 2:
после установки добавить 'allure-playwright'в файл playwright.config.ts

```bash
  reporter: [
    ['allure-playwright']
  ],
```

промежуточный шаг (столкнулся со след. проблемой)
!!! Важно - иногда, после установки новых пакетов (@playwright/test и allure-playwright), npm может частично перезаписать папку Playwright, где хранятся бинарники браузеров (chromium, firefox, webkit).

Решение:
```bash
npx playwright install
```

шаг 3:
запускаем тест (команда в моем случае - script из package.json)

```bash
npm run pageObjects-chrome
```

шаг 4:
генерируем отчет

```bash
npx allure generate allure-results -o allure-report --clean
```

шаг 5:
открыть Allure-отчет в браузере 

```bash
npx allure open allure-report
```
---

### 5 - Визуальные тесты и снепшоты (Snapshot Testing)

Playwright позволяет проверять элементы или страницы на визуальные изменения с помощью эталонных изображений (snapshots). Это помогает автоматически находить визуальные изменения в интерфейсе.

Пример теста:

```bash
await expect(usingTheGridForm).toHaveScreenshot({maxDiffPixels: 250});
```
первый запуск теста: Playwright создаёт эталонный снимок (snapshot) и сохраняет его в папке рядом с тестом.

следующие запуски: Playwright делает новый снимок и сравнивает его с эталоном.

maxDiffPixels — максимальное количество пикселей, которые могут отличаться между эталонным и текущим снимком, прежде чем тест упадёт.

Настройка 'Update snapshots' в VS Code (панель Playwright)

Режим	Описание:
All	- Обновлять все снепшоты (создавать и заменять старые)
Missing	- Создавать только отсутствующие снепшоты
Different	- Обновлять только отличающиеся
None	- Не обновлять и не создавать новые

Просмотр результатов в отчёте и проверка скриншотов:

```bash
npx playwright test --project=chromium
```

Обновление всех снепшотов через терминал

```bash
npx playwright test --update-snapshots
```

---

### Ngx-Admin Angular 14 application from akveo.com

This is modified and more lightweight version of original application to practice UI Automation with Playwright.

The original repo is here: https://github.com/akveo/ngx-admin