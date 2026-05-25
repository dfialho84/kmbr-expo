import { AsyncStorageService } from '../AsyncStorageService';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * IT-5: AsyncStorageService wrapper tests.
 * Uses module mock for @react-native-async-storage/async-storage (see jest.config.js moduleNameMapper).
 */
describe('AsyncStorageService (IT-5)', () => {
  let service: AsyncStorageService;
  const store: Record<string, string> = {};

  beforeEach(() => {
    service = new AsyncStorageService();
    jest.clearAllMocks();

    // Simulate real AsyncStorage behaviour with an in-memory store
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key: string) =>
      Promise.resolve(store[key] ?? null)
    );
    (AsyncStorage.setItem as jest.Mock).mockImplementation((key: string, value: string) => {
      store[key] = value;
      return Promise.resolve();
    });
    (AsyncStorage.removeItem as jest.Mock).mockImplementation((key: string) => {
      delete store[key];
      return Promise.resolve();
    });
    (AsyncStorage.clear as jest.Mock).mockImplementation(() => {
      Object.keys(store).forEach((k) => delete store[k]);
      return Promise.resolve();
    });
  });

  it('IT-5a: set(key, value) followed by get(key) returns the stored value', async () => {
    await service.set('async-key', 'async-value');
    const result = await service.get('async-key');
    expect(result).toBe('async-value');
  });

  it('IT-5b: get(key) with non-existing key returns null', async () => {
    const result = await service.get('non-existing-key');
    expect(result).toBeNull();
  });

  it('IT-5c: clear() removes all keys', async () => {
    await service.set('key1', 'value1');
    await service.set('key2', 'value2');
    await service.clear();
    const result1 = await service.get('key1');
    const result2 = await service.get('key2');
    expect(result1).toBeNull();
    expect(result2).toBeNull();
  });
});
