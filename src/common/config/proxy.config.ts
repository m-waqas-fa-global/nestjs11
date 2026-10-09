const SOCIALMEDIA = [
    'instagram.com',
    'tiktok.com',
    'facebook.com',
    'api.instagram.com'
];

const SOCIALSITES = [
    'wisden.com',
    'arena.ai',
    'angularspace.com',
]

const CRICKETSITES = [
    'wisden.com',
    'arena.ai',
    'angularspace.com',
]

export const BLOCKED_DOMAINS = [
    ...SOCIALMEDIA,
    ...SOCIALSITES
];

export const PROXY_PORT = parseInt(process.env.PROXY_PORT || '3128', 10);   