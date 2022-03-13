/**
 * Gets all whitelisted entries of an object.
 * @param object The object.
 * @param whitelistedKeys Array of whitelisted keys.
 * @returns Whitelsited entries of an object
 */
function getWhitelistedEntries<T>(
  object: Record<string, any>,
  whitelistedKeys: string[],
) {
  return Object.fromEntries(
    Object.entries(object).filter(([k]) => whitelistedKeys.indexOf(k) !== -1),
  ) as T;
}

export default getWhitelistedEntries;
