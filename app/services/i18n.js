import FR from 'gis/i18n/FR.json';

const DEFAULT_LOCALE = 'FR';

const locales = { FR };

function format(text, values = {}) {
  const keys = Object.keys(values);
  let res;
  if (!keys.length) return text;
  res = text;
  for (const v of keys) {
    const interpol = `$${v}`;
    res = res.replace(interpol, values[v] || '');
  }
  return res;
}

export function getLocaleString(locale, key, values) {
  if (!locale) {
    return 'UNKNOWN LOCALE';
  }
  let raw;
  if (locale in locales) {
    const data = locales[locale];
    if (key in data) {
      raw = data[key];
    } else if (key in locales[DEFAULT_LOCALE]) {
      raw = locales[DEFAULT_LOCALE][key];
    } else {
      return 'UNKNOWN KEY NAME';
    }
  } else {
    return 'UNKNOWN LANGUAGE';
  }
  return format(raw, values);
}
