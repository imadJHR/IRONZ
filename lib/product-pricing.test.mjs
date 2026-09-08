import assert from "node:assert/strict";
import { test } from "node:test";
import { getDiscount } from "./product-pricing.ts";

test("Dynamix promotion is calculated even when the API discount is zero", () => {
  assert.equal(getDiscount({ price: 649, oldPrice: 999, discount: 0 }), 35);
});

test("prices override stale or missing discount values", () => {
  assert.equal(getDiscount({ price: 949, oldPrice: 1100, discount: 40 }), 14);
  assert.equal(getDiscount({ price: 649, oldPrice: 999 }), 35);
  assert.equal(getDiscount({ price: "649", oldPrice: "999", discount: 0 }), 35);
});

test("equal or increased prices do not display an outdated promotion", () => {
  assert.equal(getDiscount({ price: 999, oldPrice: 999, discount: 35 }), 0);
  assert.equal(getDiscount({ price: 1100, oldPrice: 999, discount: 35 }), 0);
});

test("legacy discounts remain supported without a comparison price", () => {
  assert.equal(getDiscount({ price: 100, discount: 10 }), 10);
  assert.equal(getDiscount({ price: 100, oldPrice: null, discount: 10 }), 10);
  assert.equal(getDiscount({ price: 100, oldPrice: 0, discount: 10 }), 10);
});

test("invalid discounts and prices cannot produce invalid badges", () => {
  assert.equal(getDiscount({ price: 100 }), 0);
  assert.equal(getDiscount({ price: 100, discount: -10 }), 0);
  assert.equal(getDiscount({ price: 100, discount: Infinity }), 0);
  assert.equal(getDiscount({ price: 100, discount: 101 }), 0);
  assert.equal(getDiscount({ price: "invalid", oldPrice: 999 }), 0);
});
