const JSON_LD_UNSAFE_CHARS = /[<>&\u2028\u2029]/g
const JSON_LD_ESCAPES: Record<string, string> = {
  '<': '\\u003c',
  '>': '\\u003e',
  '&': '\\u0026',
  '\u2028': '\\u2028',
  '\u2029': '\\u2029',
}

const CONTROL_CHARS = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g
const BIDI_CONTROL_CHARS = /[\u202a-\u202e\u2066-\u2069]/g

/**
 * Serializes JSON for embedding inside a <script type="application/ld+json"> block.
 * Escaping '<' prevents attacker-controlled strings from terminating the script tag.
 */
export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(JSON_LD_UNSAFE_CHARS, (char) => JSON_LD_ESCAPES[char] ?? char)
}

/**
 * Normalizes untrusted text while keeping ordinary punctuation and markup-looking text literal.
 * React still renders this as a text node; this function mainly removes hidden control characters
 * and enforces a server-side length boundary.
 */
export function sanitizePlainText(value: unknown, maxLength: number) {
  if (typeof value !== 'string' || maxLength <= 0) return ''

  return value
    .replace(CONTROL_CHARS, '')
    .replace(BIDI_CONTROL_CHARS, '')
    .normalize('NFC')
    .trim()
    .slice(0, maxLength)
}
