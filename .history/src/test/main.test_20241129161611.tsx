import { it, expect, describe } from 'vitest';

describe('group', () => {
    it('should', async() => {
        const response = await fetch('/cat')
        expect(1).toBeTruthy();
    })
});