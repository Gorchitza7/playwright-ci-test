import { test } from '../test-options' // используем test-options.ts
import { faker } from '@faker-js/faker'

test('paramertized methods', async({pageManager}) => {
	const randomFullName = faker.person.fullName()
	const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

	await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2')
	await pageManager.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
})