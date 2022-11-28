import { describe, it, expect, beforeEach, test } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { UserDataStore } from '../stores/UserDataStore'

describe("Data Store", () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    test('counter start zero', () => {

        const store = UserDataStore();
        expect(store.counter).toBe(1);

    })
    test('data length zero', () => {

        const store = UserDataStore();
        store.data.push({'username':'Thamil','Role':'Dev'})
        expect(store.data.length == 1)

    })
})