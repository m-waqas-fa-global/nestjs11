const SOCIALMEDIA = [
    'www.instagram.com',
    'www.tiktok.com',
    'www.facebook.com',
];

const SOCIALSITES = [
    'www.wisden.com',
    'arena.ai',
    'angularspace.com'
]

export const BLOCKED_DOMAINS = [
    ...SOCIALMEDIA,
    ...SOCIALSITES
];
    
export const PROXY_PORT = parseInt(process.env.PROXY_PORT || '3128', 10);   