import { Request } from 'express';

export class AuditHelper {
    // Get client IP Address
    private static getIpAddress(req: Request): string {
        return (
            (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
            req.socket.remoteAddress ||
            req.ip ||
            'Unknown'
        );
    }
    //    Get Browser/User-Agent
    private static getBrowser(req: Request): string {
        return req.headers['user-agent'] || 'Unknown';
    }
    // Get Audit Information
    static getAuditInfo(req: any) {
        return {
            ipAddress: this.getIpAddress(req),
            browser: this.getBrowser(req),
            requestedAt: new Date(),
        };
    }
}