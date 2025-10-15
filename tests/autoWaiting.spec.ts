import { test, expect } from '@playwright/test'

test.beforeEach( async ({page}, testInfo) => {
	// Before when use 'goto' - call terminal: 
	// npm i dotenv --save-dev --force
	await page.goto(process.env.URL)
	await page.getByText('Button Triggering AJAX Request').click()
	testInfo.setTimeout(testInfo.timeout + 2000)
})

test('Auto waiting', async({page}) => {
	const successButton = page.locator('.bg-success')

	// await successButton.click()

	// const text = await successButton.textContent()
	// await successButton.waitFor({state: 'attached'})

	// const text = await successButton.allTextContents()
	// expect(text).toContain('Data loaded with AJAX get request.')

	await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test.skip('Alternative waits', async({page}) => {
	const successButton = page.locator('.bg-success')

	// ___ wait for element
	await page.waitForSelector('.bg-success') 

	// ___ wait for particular response - API ('RECOMMENDED') 
	// Ожидание AJAX-ответа:
	await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

	// ___ wait for network calls to be completed ('NOT RECOMMENDED')
	await page.waitForLoadState('networkidle')

	const text = await successButton.allTextContents()
	expect(text).toContain('Data loaded with AJAX get request.') // Правильное сравнение для массива
})

test.skip('timeouts', async ({page}) => {
	// test.setTimeout(10000)
	test.slow()
	const successButton = page.locator('.bg-success')
	await successButton.click({timeout: 16000})

	// await successButton.click({timeout: 16000}) // ожидает 16 сек, перед тем как нажать на кнопку
})

/*
Как выбирать правильный инструмент ожидания

Золотое правило:

Сначала всегда пробуй expect по локатору:
await expect(locator).toBeVisible()
await expect(locator).toHaveText('…')
await expect(locator).toHaveCount(3)

Они умно ждут и делают тесты стабильнее.

Для действий – просто делай действие (click, fill). У них уже есть авто-ожидания.

Для AJAX/навигаций – вяжи действие с конкретным событием:
Promise.all([ page.waitForResponse(...), кнопка.click() ])
Promise.all([ page.waitForNavigation(), ссылка.click() ])

Избегай «глухих» ожиданий вроде waitForLoadState('networkidle'), если можно дождаться конкретного ответа/селектора/текста.

// --------

Если падает expect из-за того, что не дождался?
→ используй await expect(locator)... с нужным матчером (они ждут).

Нужно больше времени только этому тесту?
→ test.setTimeout(ms) или test.slow().

Нужно больше времени только этому действию?
→ locator.click({ timeout: ms }) / goto({ timeout: ms }).

Нужно больше времени всем expect’ам?
→ expect: { timeout: ms } в конфиге (или локально: await expect(locator).toHaveText('…', { timeout: 5000 })).

Синхронизация с AJAX?
→ waitForResponse (лучше с условием res => res.url().includes(...) && res.ok()).

*/