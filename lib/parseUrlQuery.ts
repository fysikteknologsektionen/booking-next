import type { ParsedUrlQuery } from 'querystring';

/**
 * Parses ParsedUrlQuery object and returns requested keys.
 * @param query The query object.
 * @param keys The strings to check for.
 * @returns Parsed query object.
 */
export default function parseUrlQuery(query: ParsedUrlQuery, keys: string[]) {
  const queryObject: Record<string, string | undefined> = {};
  keys.forEach((key) => {
    const val = query[key];
    queryObject[key] = Array.isArray(val) ? val[0] : val;
  });
  return queryObject;
}
