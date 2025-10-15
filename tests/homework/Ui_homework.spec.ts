/**
 /**
 * Задание: Автотест для работы с таблицей (Smart Table)
 *
 * 1) Подготовка:
 *    - Перейти в раздел "Tables & Data"
 *    - Открыть страницу "Smart Table"
 *
 * 2) Сценарий 1 — редактирование строки по значению в ряду:
 *    - Найти строку, где содержится e-mail "twitter@outlook.com"
 *    - Нажать кнопку редактирования (иконка карандаша)
 *    - В поле "Age":
 *         • очистить текущее значение
 *         • ввести "35"
 *    - Подтвердить изменения (иконка галочки)
 *
 * 3) Сценарий 2 — редактирование строки по ID в конкретной колонке:
 *    - Перейти на вторую страницу таблицы (пагинация)
 *    - Найти строку с ID = "11":
 *         • сначала получить все строки с name: "11"
 *         • отфильтровать по колонке ID (td.nth(1))
 *         • убедиться, что это именно строка с ID 11
 *    - Нажать кнопку редактирования для этой строки
 *    - В поле "E-mail":
 *         • очистить текущее значение
 *         • ввести "test@test.com"
 *    - Подтвердить изменения (иконка галочки)
 *    - Проверить, что в колонке e-mail теперь "test@test.com"
 *
 * 4) Сценарий 3 — фильтрация таблицы по возрасту:
 *    - Подготовить массив значений: ['20', '30', '40', '200']
 *    - Для каждого значения:
 *         • очистить поле фильтра Age
 *         • ввести текущее значение
 *         • дождаться обновления таблицы (небольшая пауза)
 *         • проверить все строки:
 *              - если значение ≠ "200" → каждая строка должна содержать этот возраст
 *              - если значение = "200" → таблица должна показать "No data found"
 *
 * Итог: тест проверяет три сценария работы с таблицей —
 *          редактирование строки по e-mail,
 *          редактирование строки по ID,
 *          и фильтрацию данных по возрасту.
 */

// ----- 

import {test, expect} from '@playwright/test'

test.skip('smart tsble', async ({page}) => {
	await page.goto('/')
	await page.getByText('Tables & Data').click()
	await page.getByText('Smart Table').click()

	// Scenario 1
	const targeRow = page.getByRole('row', {name: 'twitter@outlook.com'})
	await targeRow.locator('.nb-edit').click()
	await page.locator('input-editor').getByPlaceholder('Age').clear()
	await page.locator('input-editor').getByPlaceholder('Age').fill('35')
	await page.locator('.nb-checkmark').click()

	await expect(targeRow.locator('td').last()).toHaveText('35')

	// Scenario 2
	await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
	const rowById = page.getByRole('row', {name: '11'}).filter({has: page.locator('td').nth(1).getByText('11')})

	await rowById.locator('.nb-edit').click()
	await page.locator('input-editor').getByPlaceholder('E-mail').clear()
	await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com')
	await page.locator('.nb-checkmark').click()

	await expect(rowById.locator('td').nth(5)).toHaveText('test@test.com')

	// Scenario 3
	const ages = ['20', '30', '40', '200']

	for(let age of ages) {
		await page.locator('input-filter').getByPlaceholder('Age').clear()
		await page.locator('input-filter').getByPlaceholder('Age').fill(age)
		await page.waitForTimeout(500)

		const ageRows = page.locator('tbody tr')

		for(let row of await ageRows.all()) {
			const cellValue = await row.locator('td').last().textContent()

			if(age == '200') {
				expect(await page.getByRole('table').textContent()).toContain('No data found')
			} else {
				expect(cellValue).toEqual(age)
			}
		}
	}
})

/**
 * Задание: Автотест выбора даты в календаре (Form Picker) на 200 дней вперёд
 *
 * 1) Подготовка:
 *    - Перейти в раздел "Forms"
 *    - Открыть страницу "Datepicker"
 *
 * 2) Действия:
 *    - Найти и кликнуть по полю с плейсхолдером "Form Picker"
 *    - Вычислить дату через 200 дней от текущей даты:
 *         • число (строкой)
 *         • короткое название месяца (Jul, Aug …)
 *         • полное название месяца (July, August …)
 *         • год
 *    - Сформировать строку для проверки, например: "Jul 24, 2025"
 *
 * 3) Навигация по календарю:
 *    - Получить заголовок календаря (например, "July 2025")
 *    - Пока заголовок не содержит нужный месяц и год — нажимать кнопку перехода вперёд ">"
 *
 * 4) Выбор даты:
 *    - Найти ячейку с нужным числом (использовать { exact: true })
 *    - Кликнуть по ней
 *
 * 5) Проверка:
 *    - Убедиться, что поле "Form Picker" теперь содержит ожидаемую дату
 *
 * Итог: тест открывает Datepicker, выбирает дату через 200 дней и проверяет,
 *          что выбранная дата корректно отобразилась в поле ввода.
 */

// -----

/**
 * Задание: Автотест работы со слайдером "Temperature"
 *
 * 1) Подготовка:
 *    - Найти элемент слайдера (круг внутри компонента ngx-temperature-dragger)
 *    - Принудительно обновить атрибуты `cx` и `cy`, чтобы задать стартовую позицию
 *    - Кликнуть по слайдеру для активации
 *
 * 2) Движение мышью:
 *    - Найти контейнер слайдера и проскроллить его в видимую область
 *    - Получить координаты контейнера (boundingBox)
 *    - Рассчитать центр по `x` и `y`
 *    - Навести курсор мыши в центр слайдера
 *    - Нажать и удерживать левую кнопку мыши
 *    - Переместить мышь:
 *         • вправо на 100 пикселей
 *         • затем вниз на 100 пикселей
 *    - Отпустить кнопку мыши
 *
 * 3) Проверка:
 *    - Убедиться, что компонент слайдера теперь содержит значение "30"
 *
 * Итог: тест должен симулировать перетаскивание ползунка температуры
 *          и проверить, что значение обновилось корректно.
 */

// -----

/**
 * Задание: Автотест Drag & Drop внутри iframe (Photo Manager)
 *
 * 1) Подготовка:
 *    - Перейти на страницу https://www.globalsqa.com/demo-site/draganddrop/
 *    - Найти iframe с заголовком "Photo Manager"
 *    - Работать с элементами внутри этого iframe
 *
 * 2) Сценарий 1 — перетаскивание методом dragTo:
 *    - В списке фотографий найти элемент "High Tatras 2"
 *    - Перетащить его в область корзины (#trash)
 *
 * 3) Сценарий 2 — более точный контроль через mouse events:
 *    - Навести курсор на элемент "High Tatras 4"
 *    - Нажать кнопку мыши (mouse.down)
 *    - Навести курсор на область корзины (#trash)
 *    - Отпустить кнопку мыши (mouse.up)
 *
 * 4) Проверка:
 *    - Убедиться, что в корзине отображаются оба элемента:
 *         • "High Tatras 2"
 *         • "High Tatras 4"
 *
 * Итог: тест должен выполнить drag & drop двумя способами —
 *          через встроенный метод dragTo и через эмуляцию действий мыши,
 *          а затем проверить, что оба элемента оказались в корзине.
 */

