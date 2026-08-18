import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { NotificationEngineController } from './notification_engine.controller';
import { EmailService } from './services/email.service';
import { InboxSmsService } from './services/inbox-sms.service';
import { emailTemplate } from './templates/email_temp';
import { smsTemplate } from './templates/sms_temp';
import { HttpException, HttpStatus } from '@nestjs/common';
import type { Request } from 'express';

describe('NotificationEngineController', () => {
  let controller: NotificationEngineController;

  const mockEmailService = {
    sendEmail: jest.fn(),
  };

  const mockInboxSmsService = {
    sendSms: jest.fn(),
    getData: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationEngineController],
      providers: [
        {
          provide: EmailService,
          useValue: mockEmailService,
        },
        {
          provide: InboxSmsService,
          useValue: mockInboxSmsService,
        },
      ],
    }).compile();

    controller = module.get<NotificationEngineController>(NotificationEngineController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getEmailTemplate', () => {
    it('should return email template HTML string', () => {
      const result = controller.getEmailTemplate();
      expect(result).toBe(emailTemplate('John Doe'));
    });
  });

  describe('getSmsTemplate', () => {
    it('should return SMS template HTML string', () => {
      const result = controller.getSmsTemplate();
      expect(result).toBe(smsTemplate());
    });
  });

  describe('create (send-email)', () => {
    it('should successfully send an email', async () => {
      const dto = {
        to: 'recipient@example.com',
        from: 'sender@example.com',
        subject: 'Test Subject',
        description: 'Test Description',
      };
      const expectedResult = { success: true, messageId: '123' };
      mockEmailService.sendEmail.mockResolvedValue(expectedResult);

      const result = await controller.create(dto);

      expect(mockEmailService.sendEmail).toHaveBeenCalledWith(
        dto.to,
        dto.from,
        dto.subject,
        dto.description,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll (send-sms)', () => {
    it('should successfully send an SMS', async () => {
      const dto = {
        to: '+1234567890',
        message: 'Hello World',
      };
      const expectedResult = { success: true, messageId: '456' };
      mockInboxSmsService.sendSms.mockResolvedValue(expectedResult);

      const result = await controller.findAll(dto);

      expect(mockInboxSmsService.sendSms).toHaveBeenCalledWith(dto.to, dto.message);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('createSession', () => {
    it('should create a session on the request object and return success', () => {
      const req = { session: {} } as any;
      const result = controller.createSession(req);

      expect(req.session).toEqual({
        user: 'John Doe',
        sid: '1234567890',
        email: 'john.doe@example.com',
        userId: '43265',
        isLoggedIn: true,
      });
      expect(result).toEqual({
        message: 'Session created successfully!',
        session: req.session,
      });
    });
  });

  describe('getSession', () => {
    it('should return session data after removing cookie info', () => {
      const req = {
        session: {
          user: 'John Doe',
          sid: '1234567890',
          email: 'john.doe@example.com',
          userId: '43265',
          isLoggedIn: true,
          session: 'cookie-data',
        },
      } as any;

      const result = controller.getSession(req);

      expect(req.session.session).toBeUndefined();
      expect(result).toEqual({
        sessionDt: {
          user: 'John Doe',
          sid: '1234567890',
          email: 'john.doe@example.com',
          userId: '43265',
          isLoggedIn: true,
        },
      });
    });
  });

  describe('destroySession', () => {
    it('should call destroy on the session and return success', () => {
      const destroyMock = jest.fn((cb) => cb(null));
      const req = {
        session: {
          destroy: destroyMock,
        },
      } as unknown as Request;

      const result = controller.destroySession(req);

      expect(destroyMock).toHaveBeenCalled();
      expect(result).toEqual({
        message: 'Session destroyed successfully!',
      });
    });

    it('should log error if destroy fails', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
      const error = new Error('Destroy failed');
      const destroyMock = jest.fn((cb) => cb(error));
      const req = {
        session: {
          destroy: destroyMock,
        },
      } as unknown as Request;

      controller.destroySession(req);

      expect(destroyMock).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(error);
      consoleSpy.mockRestore();
    });
  });

  describe('getAllCarts', () => {
    it('should return cart data when it exists', async () => {
      const mockData = { id: 1, items: [] };
      mockInboxSmsService.getData.mockResolvedValue(mockData);

      const result = await controller.getAllCarts(1);

      expect(mockInboxSmsService.getData).toHaveBeenCalledWith(1);
      expect(result).toEqual({
        success: true,
        message: 'Amazon cart data fetched successfully',
        data: mockData,
      });
    });

    it('should throw NOT_FOUND HttpException when no cart data is found', async () => {
      mockInboxSmsService.getData.mockResolvedValue(null);

      await expect(controller.getAllCarts(1)).rejects.toThrow(
        new HttpException(
          { success: false, message: 'No cart data found' },
          HttpStatus.NOT_FOUND,
        ),
      );
    });

    it('should catch generic errors and throw INTERNAL_SERVER_ERROR HttpException', async () => {
      const errMsg = 'Db connection error';
      mockInboxSmsService.getData.mockRejectedValue(new Error(errMsg));

      await expect(controller.getAllCarts(1)).rejects.toThrow(
        new HttpException(
          { success: false, message: 'Error during data fetch', error: errMsg },
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });

    it('should rethrow NestJS HttpExceptions directly', async () => {
      const httpException = new HttpException('Direct Error', HttpStatus.BAD_REQUEST);
      mockInboxSmsService.getData.mockRejectedValue(httpException);

      await expect(controller.getAllCarts(1)).rejects.toThrow(httpException);
    });
  });

  describe('Route Params APIs unit tests', () => {
    it('should return mock data object', () => {
      const result = controller.data();
      expect(result).toEqual({
        id: 5,
        uuid: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        user_id: 2,
        name: 'test',
        status: '1',
        created_at: '2026-07-07 04:46:04',
        updated_at: '2026-07-07 04:46:04',
      });
    });
  });
});
