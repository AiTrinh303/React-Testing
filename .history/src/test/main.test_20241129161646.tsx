import { it, expect, describe } from 'vitest';

describe('group', () => {
    it('should', async() => {
        const response = await fetch('/categories');
        const data = await response.json();
        console.log(data);
        expect()
        expect(1).toBeTruthy();
    })
});
