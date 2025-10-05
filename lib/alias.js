// lib/alias.js
export function validateAlias(input) {
  const value = input.trim();

  // 2–24 chars; letters, numbers, underscore, hyphen; must start with letter/number
  const re = /^[A-Za-z0-9][A-Za-z0-9_-]{1,23}$/;
  if (!re.test(value)) {
    return { ok: false, error: 'Use 2–24 characters: letters, numbers, "-" or "_". Must start with a letter/number.' };
  }

  const reserved = new Set([
    'admin','moderator','mod','support','nineplans','official','staff','null','undefined','me','you','profile',
    'submit','top','search','community','faq','rules','policy','privacy','terms','trademark','login','logout','api'
  ]);
  if (reserved.has(value.toLowerCase())) {
    return { ok: false, error: 'That alias is reserved. Please choose another.' };
  }

  return { ok: true, value };
}
