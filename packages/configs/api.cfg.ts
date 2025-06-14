/**
 * ============================================================
 * @name Orbiplex
 * @copyright Copyright (C) 2025 ByteBrush Studios.
 * @license AGPL-3.0
 * ============================================================
 */

type Environment = 'development' | 'production' | 'test'

interface ApiConfig {
    port?: number; // The services port (not required)
    base: string; // The services base url (eg. https://api.infinitybots.gg)
    docs: string; // The services docs url (eg. https://api.infinitybots.gg/docs)
}

type EnvironmentConfig = {
    [key in Environment]: ApiConfig
}

export const apiConfig: EnvironmentConfig = {
    production: {
        base: 'https://spider.infinitybots.gg',
        docs: 'https://spider.infinitybots.gg/docs'
    },
    development: {
        base: 'https://spider-staging.infinitybots.gg',
        docs: 'https://spider-staging.infinitybots.gg/docs'
    }
}