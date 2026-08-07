### The interview-level answer

If someone asks you:

"What happens if User 1 sends User 2's JWT?"

 A strong answer is:

"JWT is a bearer credential, so the server authenticates the identity represented by the verified token, not the physical person holding it. If User 1 steals User 2's valid JWT, the server will see User 2's sub and treat the request as User 2. Therefore, I never trust a client-provided user ID. I extract the authenticated user ID from the verified JWT, apply RBAC/permission checks and resource-ownership checks, use short-lived access tokens, and optionally maintain a session table with a unique jti so tokens can be revoked."

That is the fundamental security model you should use in your NestJS RBAC application.

``

The biggest principle: don't try to solve cross-role token problems by checking whether "User 1 is physically using User 1's token." A normal bearer JWT cannot prove that. Instead, make sure that possession of a token alone is not enough for unauthorized actions: validate the session, determine the current user/role server-side, enforce permissions, enforce resource ownership, and revoke sessions when roles/accounts change.

``