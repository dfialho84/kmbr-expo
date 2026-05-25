import { smokeItemDtoSchema } from '../SmokeItemDto';

describe('smokeItemDtoSchema (UT-8)', () => {
  it('UT-8a: rejects label as number (type error)', () => {
    const result = smokeItemDtoSchema.safeParse({ label: 123, value: 'x' });
    expect(result.success).toBe(false);
  });

  it('UT-8b: rejects null value', () => {
    const result = smokeItemDtoSchema.safeParse({ label: 'ok', value: null });
    expect(result.success).toBe(false);
  });

  it('UT-8c: accepts valid input with label="ok" and value="x"', () => {
    const result = smokeItemDtoSchema.safeParse({ label: 'ok', value: 'x' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.label).toBe('ok');
      expect(result.data.value).toBe('x');
    }
  });
});
