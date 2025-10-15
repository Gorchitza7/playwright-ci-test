import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config();

export default defineConfig<TestOptions>({
  timeout: 40000, // таймаут ОДНОГО теста (включая все шаги)
  // globalTimeout: 60000, // общий бюджет на ВЕСЬ прогон (все тесты суммарно)

  expect: {
    timeout: 2000, // сколько ждать, пока сбудется expect(locator…) 
    toMatchSnapshot: {maxDiffPixels: 50}
  },

  retries: 1,
  reporter: [
    ['json', {outputFile: 'test-results/jsonReport.json'}],
    ['junit', {outputFile: 'test-results/junitReport.xml'}],
    // ['allure-playwright'],
    ['html'],
  ],

  use: {
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: process.env.DEV === '1' ? 'http://localhost:4201/'
       : process.env.STAGING === '1' ? 'http://localhost:4202/'
       : 'http://localhost:4200/',

    trace: 'on-first-retry',
    actionTimeout: 20000, // клик/тайп/чек и т.п. максимум 20с (auto-wait)
    navigationTimeout: 25000, // переходы/загрузка страницы максимум 25с
    video: 'off', // запускается только при помощи командной строки
  },

  projects: [
    {
      // Playwright может вызвать разный базовый URL-адрес, на основовании названия проекта (например: dev, stage, prod)
      name: 'dev',
      use: {
         ...devices['Desktop Chrome'], 
         baseURL: 'http://localhost:4200/',
        },
    },
    {
      name: 'chromium',
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
    },
   },
   {
    name: 'pageObjectFullScreen',
    testMatch: 'usePageObjects.spec.ts',
    use: {
      viewport: {width: 1920, height: 1080}
    }
   },
   {
    name: 'mobile',
    testMatch: 'testMobile.spec.ts',
    use: {
      ...devices['iPhone 13 Pro'],
    }
   }
  ],
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200/',
    timeout: 300000,
    reuseExistingServer: false,
  }
});