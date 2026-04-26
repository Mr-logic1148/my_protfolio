    import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

    const redis = Redis.fromEnv()

    export const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '60 s'), // ✅ 5 requests per 60 seconds per IP
    analytics: true,
    prefix: 'portfolio-contact',
    })