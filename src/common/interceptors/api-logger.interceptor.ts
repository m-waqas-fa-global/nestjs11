import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';

import { Observable, tap } from 'rxjs';
import { LoggerHelper } from '../helpers/logger.helper';
import { GeneratorHelper}  from '../helpers/generator.helper'
import { BrowserHelper}  from '../helpers/browserInfo.helper'
import { ConfigService } from '@nestjs/config';

const ignoredRoutes = [
    "/monitoring"
];
 
@Injectable()
export class ApiLoggerInterceptor implements NestInterceptor {
    isEnabled:boolean | undefined = false;
    constructor(private configService:ConfigService){
       const value = this.configService.get('ENABLE_API_LOGS');
        this.isEnabled = value === 'true';
    }

    intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<any> {
    // Overide Logs written if they diabled from env file:
        // eslint-disable-next-line no-extra-boolean-cast
        if (!this.isEnabled) {
         return next.handle();
        }

        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const start = Date.now();
        // Don't write logs in url added in ignoredRoutes
        if (ignoredRoutes.includes(request.originalUrl)) {
            return next.handle();
        }
        return next.handle().pipe(
            tap((body) => {
                const end = Date.now();
                const log = {
                    requestId: GeneratorHelper.generateRequestId(),
                    ...BrowserHelper.getBrowserInfo(request.headers['user-agent']),
                    timestamp: new Date().toISOString(),
                    method: request.method,
                    url: request.originalUrl,
                    statusCode: response.statusCode,
                    responseTime: `${end - start} ms`,
                    ip: request.headers['x-forwarded-for'] || request.ip,
                    query: request.query || null,
                    params: request.params || null,
                    reqBody: request.body || null,
                    error: request.error || response.error || null,
                    // response: body,
                }
                LoggerHelper.write(log);
            }),
        );

    }
}