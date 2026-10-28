import assert from 'node:assert/strict';
import { test } from 'node:test';
import { appendProductGallery } from './product-gallery.ts';

test('deleting one saved image sends only the retained image URLs', () => {
  const body = new FormData();
  appendProductGallery(body, [
    { preview: 'https://images.test/first.webp' },
    { preview: 'https://images.test/third.webp' },
  ]);
  assert.deepEqual(JSON.parse(body.get('existingGallery')), [
    'https://images.test/first.webp',
    'https://images.test/third.webp',
  ]);
  assert.equal(body.getAll('gallery').length, 0);
});

test('adding images sends retained URLs and the selected files separately', () => {
  const body = new FormData();
  const file = new File(['new image'], 'new.webp', { type: 'image/webp' });
  appendProductGallery(body, [
    { preview: 'https://images.test/saved.webp' },
    { preview: 'blob:new-image', file },
  ]);
  assert.deepEqual(JSON.parse(body.get('existingGallery')), ['https://images.test/saved.webp']);
  assert.equal(body.getAll('gallery').length, 1);
  assert.equal(body.get('gallery').name, 'new.webp');
});

test('deleting every gallery image explicitly sends an empty retained list', () => {
  const body = new FormData();
  appendProductGallery(body, []);
  assert.equal(body.get('existingGallery'), '[]');
  assert.equal(body.getAll('gallery').length, 0);
});

test('a newly selected image removed before saving is never uploaded', () => {
  const file = new File(['removed image'], 'removed.webp', { type: 'image/webp' });
  const images = [
    { preview: 'https://images.test/saved.webp' },
    { preview: 'blob:removed', file },
  ];
  const body = new FormData();
  appendProductGallery(body, images.filter((_, index) => index !== 1));
  assert.equal(body.getAll('gallery').length, 0);
  assert.equal(body.get('existingGallery'), '["https://images.test/saved.webp"]');
});
