/**
 * Node-only shutdown signal installer.
 *
 * Lives in its own file so Next.js 16 Turbopack never pulls `process.once`
 * into the Edge bundle. Edge runtime imports of this file are not possible
 * because the only caller (`instrumentation.ts`) wraps it in a dynamic
 * import guarded by `NEXT_RUNTIME === 'nodejs'`, and Edge cannot execute
 * dynamic imports of a sibling module that uses `process` Node APIs anyway.
 *
 * Keep this file free of any Edge-importable dependencies (pg, fs, etc.)
 * — only `process` and the shutdown closure passed in from the caller.
 */
export function installShutdownSignals(shutdown: () => Promise<void>): void {
  process.once('SIGTERM', () => void shutdown());
  process.once('SIGINT', () => void shutdown());
}