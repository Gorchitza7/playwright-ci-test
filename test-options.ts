import {test as base} from '@playwright/test'
import { PageManager } from '../Playwright_Advanced_2025/page-objects/pageManager'


export type TestOptions = {
	globalsQaURL: string
	formLayoutsPage: string
	pageManager: PageManager
}

export const test = base.extend<TestOptions>({
	globalsQaURL: ['', {option: true}],

	// Фикстура:
	formLayoutsPage: async({page}, use) => {
		await page.goto('/')
		await page.getByText('Forms').click()
		await page.getByText('Form Layouts').click()
		await use('')
	},

	pageManager: async({page, formLayoutsPage}, use) => {
		const pm = new PageManager(page)
		await use(pm)
	}
})