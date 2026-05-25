import { SecureStorageService } from '../SecureStorageService';
import * as SecureStore from 'expo-secure-store';

/**
 * IT-4: SecureStorageService wrapper tests.
 * Uses module mock for expo-secure-store (see jest.config.js moduleNameMapper).
 */
describe('SecureStorageService (IT-4)', () => {
  let service: SecureStorageService;
  const store: Record<string, string> = {};

  beforeEach(() => {
    service = new SecureStorageService();
    jest.clearAllMocks();

    // Simulate real keychain behaviour with an in-memory store
    (SecureStore.getItemAsync as jest.Mock).mockImplementation((key: string) =>
      Promise.resolve(store[key] ?? null)
    );
    (SecureStore.setItemAsync as jest.Mock).mockImplementation((key: string, value: string) => {
      store[key] = value;
      return Promise.resolve();
    });
    (SecureStore.deleteItemAsync as jest.Mock).mockImplementation((key: string) => {
      delete store[key];
      return Promise.resolve();
    });
  });

  it('IT-4a: set(key, value) followed by get(key) returns the stored value', async () => {
    await service.set('test-key', 'secret-value');
    const result = await service.get('test-key');
    expect(result).toBe('secret-value');
  });

  it('IT-4b: get(key) with non-existing key returns null', async () => {
    const result = await service.get('non-existing-key');
    expect(result).toBeNull();
  });

  it('IT-4c: delete(key) followed by get(key) returns null', async () => {
    await service.set('key-to-delete', 'value');
    await service.delete('key-to-delete');
    const result = await service.get('key-to-delete');
    expect(result).toBeNull();
  });
});
