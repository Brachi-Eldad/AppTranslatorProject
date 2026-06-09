import { describe, it, before } from 'node:test';
import assert from 'node:assert';

const BASE_URL = `http://localhost:3001`;

// ── Helper ──────────────────────────────────────────────────
async function fetchJSON(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, options);
  const data = await res.json();
  return { status: res.status, body: data };
}

// ── Wait for server to be ready ─────────────────────────────
before(async () => {
  let retries = 10;
  while (retries > 0) {
    try {
      await fetch(`${BASE_URL}/health`);
      break;
    } catch {
      retries--;
      await new Promise(r => setTimeout(r, 2000));
    }
  }
});

// ── Health Check ────────────────────────────────────────────
describe('Health Check', () => {

  it('GET /health should return status ok', async () => {
    const { status, body } = await fetchJSON('/health');
    assert.strictEqual(status, 200);
    assert.strictEqual(body.status, 'ok');
    assert.ok(body.timestamp);
  });

});

// ── Translate Endpoint ──────────────────────────────────────
describe('POST /translate', () => {

  it('should translate text successfully', async () => {
    const { status, body } = await fetchJSON('/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'Hello', target: 'es' })
    });
    assert.strictEqual(status, 200);
    assert.ok(body.translatedText);
    assert.strictEqual(typeof body.translatedText, 'string');
  });

  it('should return 400 when text is missing', async () => {
    const { status, body } = await fetchJSON('/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target: 'es' })
    });
    assert.strictEqual(status, 400);
    assert.ok(body.error);
  });

  it('should return 400 when target is missing', async () => {
    const { status, body } = await fetchJSON('/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'Hello' })
    });
    assert.strictEqual(status, 400);
    assert.ok(body.error);
  });

  it('should return 400 when body is empty', async () => {
    const { status, body } = await fetchJSON('/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    assert.strictEqual(status, 400);
    assert.ok(body.error);
  });

});

// ── History Endpoint ────────────────────────────────────────
describe('GET /history', () => {

  it('should return an array', async () => {
    const { status, body } = await fetchJSON('/history');
    assert.strictEqual(status, 200);
    assert.ok(Array.isArray(body));
  });

  it('should return max 10 results', async () => {
    const { body } = await fetchJSON('/history');
    assert.ok(body.length <= 10);
  });

  it('history items should have source_text and translated_text fields', async () => {
    // First add a translation so history is not empty
    await fetchJSON('/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'Hello', target: 'fr' })
    });

    const { body } = await fetchJSON('/history');
    if (body.length > 0) {
      assert.ok('source_text' in body[0]);
      assert.ok('translated_text' in body[0]);
    }
  });

});