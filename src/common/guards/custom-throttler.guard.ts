import {
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
  } from '@nestjs/common';
  import { ThrottlerGuard } from '@nestjs/throttler';


@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard{
    protected async throwThrottlingException(
      context: ExecutionContext,
    ): Promise<void> {
      const request = context.switchToHttp().getRequest();
  
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          error: 'Too Many Requests',
          message:'You have exceeded the allowed request limit. Please try again later.',
          path: request.url,
          // timestamp: new Date().toISOString(),
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
  }