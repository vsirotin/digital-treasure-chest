import { HTTPKeyValueRepositoryReader } from './http-key-value-repository-reader';

describe('HTTPKeyValueRepositoryReader', () => {
    let reader: HTTPKeyValueRepositoryReader;

    beforeEach(() => {
        reader = new HTTPKeyValueRepositoryReader('testURLPrefix');
    });

    it('should read data for a given key', async () => {
        const key = 'testKey';
        const data = { value: 'testValue' };
        const response = new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-type': 'application/json' }
        });

        spyOn(window, 'fetch').and.returnValue(Promise.resolve(response));

        const result = await reader.readAsync(key);
        expect(result).toEqual(data);
    });

    it('should not throw an error if the server returns an error, but return undefined', async () => {
        const key = 'errorKey';
        const response = new Response(null, { status: 500 });

        spyOn(window, 'fetch').and.returnValue(Promise.resolve(response));

        try {
            const result = await reader.readAsync(key);
            expect(result).toBeUndefined();
        } catch (error) {
            fail('Error should not be thrown');
        }
    });
});