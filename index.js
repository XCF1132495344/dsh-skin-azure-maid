/**
 * Azure Maid skin — host half.
 *
 * The package contributes browser presentation only: the theme definition and
 * the stylesheet both ship through `./client`, so this row exists solely to
 * give the Loader a host-side entry to mount.
 *
 * @module index.js
 */

/** Host plugin body — no host-side behavior. */
export function apply() {}

/** Display name used by the plugin inventory. */
export const name = 'Azure Maid skin'
