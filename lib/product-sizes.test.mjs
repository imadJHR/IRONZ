import assert from 'node:assert/strict';
import { test } from 'node:test';
import { productSizes } from './product-sizes.ts';

test('preserves the boxing glove sizes saved by the admin', () => {
  assert.deepEqual(productSizes(['8 oz', '10 oz', '12 oz']), ['8 oz', '10 oz', '12 oz']);
});

test('handles missing sizes without creating a required variant', () => {
  for (const value of [undefined, null, [], '', [null, 12, {}]]) {
    assert.deepEqual(productSizes(value), []);
  }
});

test('trims and deduplicates size variants while preserving their labels', () => {
  assert.deepEqual(productSizes([' S ', 's', 'M, L', '']), ['S', 'M', 'L']);
  assert.deepEqual(productSizes('8 oz, 10 oz'), ['8 oz', '10 oz']);
});
