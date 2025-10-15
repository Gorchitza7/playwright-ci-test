/**
 * Задание 1 : Использование Page Object для навигации
 *
 * 1) Подготовка:
 *    - Создать папку `page-objects`
 *    - В файле `navigationPage.ts` описать класс NavigationPage:
 *         • сохранить объект `page`
 *         • создать метод formLayoutsPage()
 *              - клик по пункту меню "Forms"
 *              - клик по подпункту "Form Layouts"
 *
 * 2) В папке `tests` создать тест `usePageObjects.spec.ts`:
 *    - Импортировать класс NavigationPage
 *    - В `beforeEach`:
 *         • открыть страницу http://localhost:4200/
 *    - В тесте `navigate to form page`:
 *         • создать объект navigateTo = new NavigationPage(page)
 *         • вызвать метод navigateTo.formLayoutsPage()
 *
 * 3) Проверка:
 *    - Убедиться, что переход выполнен в раздел "Form Layouts"
 *
 *  Итог: тест показывает, как использовать паттерн Page Object Model (POM):
 *          вынести логику навигации в отдельный класс и вызывать её в тестах.
 */

// -------------------

/**
 * Задание 2: Универсальная навигация через приватный метод
 *
 * 1) Подготовка:
 * - В `page-objects/navigationPage.ts`:
 *   • Создать приватный метод selectGroupMenuItem(groupItemTitle: string)
 *     - найти элемент меню по атрибуту title
 *     - проверить его состояние aria-expanded
 *     - если состояние "false" → выполнить клик для раскрытия
 *   • Обновить методы:
 *     - formLayoutsPage() → использовать selectGroupMenuItem('Forms')
 *     - datepickerPage() → использовать selectGroupMenuItem('Forms')
 *     - smartTablePage() → использовать selectGroupMenuItem('Tables & Data')
 *     - toastrPage() → использовать selectGroupMenuItem('Modal & Overlays')
 *     - tooltipPage() → использовать selectGroupMenuItem('Modal & Overlays')
 *
 * 2) В `tests/usePageObjects.spec.ts`:
 *    - В beforeEach:
 *         • открыть страницу http://localhost:4200/
 *    - В тесте `navigate to form page`:
 *         • создать объект navigateTo = new NavigationPage(page)
 *         • вызвать методы:
 *              - navigateTo.formLayoutsPage()
 *              - navigateTo.datepickerPage()
 *              - navigateTo.smartTablePage()
 *              - navigateTo.toastrPage()
 *              - navigateTo.tooltipPage()
 *
 * 3) Проверка:
 *    - Убедиться, что навигация корректно работает даже при свернутых группах меню
 *
 * Итог: реализован DRY-подход — общая логика навигации вынесена в приватный метод,
 *          что упрощает поддержку и масштабирование Page Object.
 */

// ------------

/**
 * Задание 3: Оптимизация Page Object с локаторами (спорный подход)
 *
 * 1) Подготовка:
 *    - В `page-objects/navigationPage.ts`:
 *      • Добавить readonly локаторы в конструктор:
 *        - formLayoutsMenuItem = page.getByText('Form Layouts')
 *        - formPickerMenuItem = page.getByText('Datepicker')
 *        - smartTableMenuItem = page.getByText('Smart Table')
 *        - toastrMenuItem = page.getByText('Toastr')
 *        - tooltipMenuItem = page.getByText('Tooltip')
 *      • В методах:
 *        - formLayoutsPage() → раскрыть группу "Forms" и кликнуть по formLayoutsMenuItem
 *        - datepickerPage() → раскрыть группу "Forms" и кликнуть по formPickerMenuItem
 *        - smartTablePage() → раскрыть группу "Tables & Data" и кликнуть по smartTableMenuItem
 *        - toastrPage() → раскрыть группу "Modal & Overlays" и кликнуть по toastrMenuItem
 *        - tooltipPage() → раскрыть группу "Modal & Overlays" и кликнуть по tooltipMenuItem
 *      • Вынести общую логику раскрытия групп в приватный метод selectGroupMenuItem(groupItemTitle: string)
 *
 * 2) В `tests/usePageObjects.spec.ts`:
 *    - В beforeEach:
 *         • открыть страницу http://localhost:4200/
 *    - В тесте `navigate to form page`:
 *         • создать объект navigateTo = new NavigationPage(page)
 *         • вызвать методы:
 *              - navigateTo.formLayoutsPage()
 *              - navigateTo.datepickerPage()
 *              - navigateTo.smartTablePage()
 *              - navigateTo.toastrPage()
 *              - navigateTo.tooltipPage()
 *
 * 3) Проверка:
 *    - Убедиться, что навигация выполняется корректно через созданные локаторы
 *    - Структура кода соответствует принципу Page Object (удобство и читаемость)
 *
 *  Итог: Локаторы вынесены в свойства класса → код стал чище и легче поддерживать.
 */

// ------------

/**
 * Задание 4: Параметризация методов для работы с формами
 *
 * 1) Подготовка:
 *    - В `page-objects/formLayoutsPage.ts`:
 *         • Создать класс `FormLayoutsPage` с конструктором, принимающим объект `Page`
 *         • Добавить методы:
 *              - submitUsingTheGridFormWithCredentialsAndSelectOption(email, password, optionText):
 *                   ▸ найти форму "Using the Grid"
 *                   ▸ заполнить поле Email значением email
 *                   ▸ заполнить поле Password значением password
 *                   ▸ выбрать radio по имени optionText
 *                   ▸ кликнуть кнопку Submit
 *              - submitInlineFormWithNameEmailAndCheckbox(name, email, rememberMe):
 *                   ▸ найти форму "Inline form"
 *                   ▸ заполнить поле Name значением name
 *                   ▸ заполнить поле Email значением email
 *                   ▸ если rememberMe = true → отметить чекбокс
 *                   ▸ кликнуть кнопку Submit
 *
 * 2) В `tests/usePageObjects.spec.ts`:
 *    - В beforeEach:
 *         • открыть страницу http://localhost:4200/
 *    - В тесте `parametrized methods`:
 *         • создать объекты:
 *              - navigateTo = new NavigationPage(page)
 *              - onFormLayoutsPage = new FormLayoutsPage(page)
 *         • вызвать методы:
 *              - navigateTo.formLayoutsPage()
 *              - onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 2')
 *              - onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckbox('John Smith', 'John@test.com', true)
 *
 * 3) Проверка:
 *    - Формы заполняются переданными параметрами
 *    - Чекбокс активируется только если rememberMe = true
 *
 * Итог: Методы стали универсальными и переиспользуемыми → повысилась гибкость тестов.
 */

// ---------

/**
 * Задание 5 (part 1): Оптимизация DatepickerPage с локаторами
 *
 * 1) Подготовка:
 *    - В `page-objects/datepickerPage.ts`:
 *         • Добавить readonly локаторы в конструктор:
 *              - calendarInputField = page.getByPlaceholder('Form Picker')
 *              - calendarMonthAndYear = page.locator('nb-calendar-view-mode')
 *              - nextMonthButton = page.locator('nb-calendar-pageable-navigation .next-month')
 *              - dayCell = page.locator('[class="day-cell ng-star-inserted"]')
 *         • Обновить методы:
 *              - selectCommonDatePickerDateFromToday(numberOfDaysFromToday):
 *                   ▸ кликнуть по calendarInputField
 *                   ▸ вызвать приватный метод selectDateInTheCalendar
 *                   ▸ проверить, что поле ввода содержит ожидаемую дату
 *              - selectDateInTheCalendar(numberOfDaysFromToday) (private):
 *                   ▸ вычислить дату относительно текущего дня
 *                   ▸ получить expectedDate, expectedMonthShort, expectedMonthLong, expectYear
 *                   ▸ сформировать строку dateToAssert (для проверки)
 *                   ▸ в цикле кликать nextMonthButton, пока calendarMonthAndYear не совпадает
 *                   ▸ выбрать день по тексту (dayCell.getByText(expectedDate, { exact: true }))
 *                   ▸ вернуть dateToAssert
 *
 * 2) В `tests/usePageObjects.spec.ts`:
 *    - В тесте `parametrized methods`:
 *         • вызвать:
 *              - navigateTo.datepickerPage()
 *              - onDatepickerPage.selectCommonDatePickerDateFromToday(5)
 *
 * 3) Проверка:
 *    - Поле ввода даты заполняется корректным значением
 *    - Переключение месяцев работает, пока не найден нужный
 *    - Структура кода чище за счёт вынесенных локаторов
 *
 * ✅ Итог: Класс стал легче поддерживать и переиспользовать, логика работы с локаторами теперь централизована.
 */

/**
 * Задание 5 (part 2): Тестирование выбора диапазона дат в DatepickerPage
 *
 * 1) В `page-objects/datepickerPage.ts`:
 *    - Добавить метод selectDatepickerWithRangeFromToday(startDayFromToday, endDayFromToday):
 *         • найти calendarInputField по placeholder "Range Picker"
 *         • кликнуть по calendarInputField
 *         • вызвать приватный метод selectDateInTheCalendar для startDayFromToday
 *         • вызвать приватный метод selectDateInTheCalendar для endDayFromToday
 *         • сформировать строку dateToAssert = "start - end"
 *         • проверить через expect, что calendarInputField содержит dateToAssert
 *
 * 2) В `tests/usePageObjects.spec.ts`:
 *    - В тесте `paramertized methods`:
 *         • вызвать navigateTo.datepickerPage()
 *         • вызвать onDatepickerPage.selectCommonDatePickerDateFromToday(5)
 *         • вызвать onDatepickerPage.selectDatepickerWithRangeFromToday(6, 15)
 *
 * 3) Проверка:
 *    - Поле "Form Picker" заполняется корректной датой через selectCommonDatePickerDateFromToday
 *    - Поле "Range Picker" заполняется диапазоном дат от start до end
 *
 * ✅ Итог: Тест покрывает работу с одиночным выбором даты и с диапазоном дат в календаре.
 */

// ------------

/**
 * Задание 6: Использование PageManager для организации тестов
 *
 * 1) В `page-objects/pageManager.ts`:
 *    - Реализовать класс PageManager, который:
 *         • принимает `page` в конструкторе
 *         • создаёт объекты NavigationPage, FormLayoutsPage, DatepickerPage
 *         • предоставляет методы:
 *              - navigateTo() → возвращает NavigationPage
 *              - onFormLayoutsPage() → возвращает FormLayoutsPage
 *              - onDatepickerPage() → возвращает DatepickerPage
 *
 * 2) В `tests/usePageManager.spec.ts`:
 *    - beforeEach: открыть страницу http://localhost:4200/
 *
 *    - Тест `navigate to form page`:
 *         • создать объект pm = new PageManager(page)
 *         • вызвать:
 *              pm.navigateTo().formLayoutsPage()
 *              pm.navigateTo().datepickerPage()
 *              pm.navigateTo().smartTablePage()
 *              pm.navigateTo().toastrPage()
 *              pm.navigateTo().tooltipPage()
 *
 *    - Тест `paramertized methods`:
 *         • создать объект pm = new PageManager(page)
 *         • перейти на formLayoutsPage и заполнить формы:
 *              submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 2')
 *              submitInlineFormWithNameEmailAndCheckbox('John Smith', 'John@test.com', true)
 *         • перейти на datepickerPage и выбрать даты:
 *              selectCommonDatePickerDateFromToday(5)
 *              selectDatepickerWithRangeFromToday(6, 15)
 *
 * 3) Проверка:
 *    - Убедиться, что все страницы открываются через navigateTo()
 *    - Формы успешно отправляются через методы FormLayoutsPage
 *    - В календаре выбираются даты и диапазон дат через DatepickerPage
 *
 * ✅ Итог: Структура с PageManager уменьшает дублирование кода и упрощает вызов методов страниц в тестах.
 */
