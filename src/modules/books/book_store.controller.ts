import {
  Controller,
  Get, Post,
  Body, 
  Param, Delete,
  ParseIntPipe,
  Res, Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ValidationPipe,
  BadRequestException
} from '@nestjs/common';
import { BookStoreService } from './services/book_store.service';
import { CreateBookValidationDto } from './dto/create-book.dto';
import { PdfService } from './services/pdf.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger'
import { CreateBookSwagger } from './swagger/create.book.swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

// console.log(`https://mylinkforall.com/products/little-babies-suits`);
@Controller()
export class BookStoreController {
  constructor(
    private readonly bookStoreService: BookStoreService,
    private readonly PdfService: PdfService
  ) { }

  // ========================  Static API Methods  =========================
  // @UseGuards(JwtAuthGuard)    // this is protected API End Point
  // @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('cover_photo', {
    storage: diskStorage({
      // File Location for saving Images:
      destination: './storage/books',
      // Create File Name for uplaoded Cover
      filename: (req, file, cb) => {
        // ✅ Generate 6-digit random number
        const randomNumber = Math.floor(100000 + Math.random() * 900000);
        const ext = extname(file.originalname);
        cb(null, `cover-${randomNumber}${ext}`);
      },
    }),
    // Validation Image Extension like png , jpg
    fileFilter: (req, file, cb) => {
      const allowedMimes = ['image/jpg', 'image/jpeg', 'image/png'];     //
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new BadRequestException('Only JPG and PNG images are allowed'), false);
      }
    },
    // Images Size Validation
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
  }))
  @ApiBody({ type: CreateBookSwagger })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors()
  @Post("create")
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body(new ValidationPipe({ transform: true })) createBookDto: CreateBookValidationDto,
  ) {
    // check if image is not exist
    if (!file) {
      throw new BadRequestException('Book cover photo is required');
    }
    // return {res:"Responded: End Point Work In Progress" , data: createBookDto ,iMAGES:file}
    return this.bookStoreService.createBookWithCover(
      createBookDto,
      file.path
    );
  }

  @Get("get_all")
  async findAll() {
    return await this.bookStoreService.findAll();
  }

  @Get("downloard_stats_pdf")
  async downloadStats(@Res() res: Response) {
    const result = await this.bookStoreService.checkTableStats();
    return this.PdfService.generateStatsReport(
      result,
      res,
    );
  }

  @Get('get_auther_publishers')
  getAuther() {
    return this.bookStoreService.getAutherPublisher();
  }

  // ========================  Dynamic API Methods  =========================
  @UseGuards(JwtAuthGuard)    // this is protected API End Point
  @ApiBearerAuth()
  @Get('get_by_id/:id')
  findOne(@Param('id', ParseIntPipe) id: string, @Req() req: any) {
    return this.bookStoreService.getBookSingleDetail(+id, req.user.user_id);
  }

  // @UseGuards(JwtAuthGuard)    // this is protected API End Point
  // @ApiBearerAuth()
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBookStoreDto: UpdateBookStoreDto) {
  //   return this.bookStoreService.update(+id, updateBookStoreDto);
  // }

  @UseGuards(JwtAuthGuard)    // this is protected API End Point
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookStoreService.remove(+id);
  }
  @UseGuards(JwtAuthGuard)    // this is protected API End Point
  @ApiBearerAuth()
  updateStatus(@Param('id', ParseIntPipe) id: number) {
    return this.bookStoreService.changeBookStatus(id)
  }

}

// ======================== Place this end point before the dynamic routes: =================================

// @UseGuards(JwtAuthGuard)    // this is protected API End Point
// @ApiBearerAuth()
// @Get("get_deleted_books")
// deletedItem() {
//   const query = {
//     withDeleted: true,
//     where: {
//       deleted_at: Not(IsNull()),
//     },
//   }
//   return this.bookStoreService.findAll(query);
// }

// @UseGuards(JwtAuthGuard)    // this is protected API End Point
// @ApiBearerAuth()
// @Throttle({ default: { limit: 3, ttl: 60000 } })
// @Get("execute_raw_query")
// async get() {
//   return await this.bookStoreService.ExecuteRawQuery()
// }