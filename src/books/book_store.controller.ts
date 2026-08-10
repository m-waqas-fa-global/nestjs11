import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpException, HttpStatus, Res, Req, UseGuards } from '@nestjs/common';
import { BookStoreService } from './services/book_store.service';
import { CreateBookDTO } from './dto/create-book.dto';
import { UpdateBookStoreDto } from './dto/update-book.dto';
import { IsNull, Not } from 'typeorm';
import { PdfService } from './services/pdf.service';
import { AuditHelper } from '../common/helpers/audit.helper';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {ApiBearerAuth,ApiBody} from '@nestjs/swagger'
import { CreateBookSwagger } from './swagger/create.book.swagger';


@Controller()
export class BookStoreController {
  constructor(
    private readonly bookStoreService: BookStoreService,
    private readonly PdfService: PdfService
  ) { }
  // ========================  Static API Methods  =========================
  @UseGuards(JwtAuthGuard)    // this is protected API End Point
  @ApiBearerAuth()
  @ApiBody({ type: CreateBookSwagger })
  @Post("create")
  create(@Body() createBookBody: CreateBookDTO) {
    return this.bookStoreService.create(createBookBody);
  }

  @Get("get_all")
  findAll() {
    // Query and for getting Data From Database:
    const query = {
      withDeleted: false,
      select: {
        bk_id: true,
        title: true,
        price: true,
        author_id: true,
        is_available: true,
        cover_photo:true,
        subtitle:true,
        created_at: false
      }
    };
    return this.bookStoreService.findAll(query);
  }
  @UseGuards(JwtAuthGuard)    // this is protected API End Point
  @ApiBearerAuth()
  @Get("get_deleted_books")
  deletedItem() {
    const query = {
      withDeleted: true,
      where: {
        deleted_at: Not(IsNull()),
      },
    }
    return this.bookStoreService.findAll(query);
  }

  @Get("downloard_stats_pdf")
  async downloadStats(@Res() res: Response) {
    const result = await this.bookStoreService.checkTableStats();

    return this.PdfService.generateStatsReport(
      result,
      res,
    );
  }
  @UseGuards(JwtAuthGuard)    // this is protected API End Point
  @ApiBearerAuth()
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Get("execute_raw_query")
  async get() {
    return await this.bookStoreService.ExecuteRawQuery()
  }



  // ========================  Dynamic API Methods  =========================
  @Get('get_by_id/:id')
  findOne(@Param('id', ParseIntPipe) id: string, @Req() req: Request) {
    //const audit = AuditHelper.getAuditInfo(req)
    return this.bookStoreService.findOne(+id);
  }
   
  @UseGuards(JwtAuthGuard)    // this is protected API End Point
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookStoreDto: UpdateBookStoreDto) {
    return this.bookStoreService.update(+id, updateBookStoreDto);
  }

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