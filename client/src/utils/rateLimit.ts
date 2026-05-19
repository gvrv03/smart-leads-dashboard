/**
 * Simple client-side rate limit tracker.
 * Prevents rapid-fire form submissions.
 */
const attempts: Map<string, { count: number; resetAt: number }> = new Map();

export function checkRateLimit(key: string, maxAttempts: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= maxAttempts) {
    return false;
  }

  entry.count++;
  return true;
}

export function getRateLimitRemaining(key: string, maxAttempts: number = 5): number {
  const entry = attempts.get(key);
  if (!entry || Date.now() > entry.resetAt) return maxAttempts;
  return Math.max(0, maxAttempts - entry.count);
}
