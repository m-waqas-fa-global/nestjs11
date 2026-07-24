import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpException, HttpStatus, Res, Req } from '@nestjs/common';
import { BookStoreService } from './services/book_store.service';
import { CreateBookDTO } from './dto/create-book.dto';
import { UpdateBookStoreDto } from './dto/update-book.dto';
import { IsNull, Not } from 'typeorm';
import { PdfService } from './services/pdf.service';
import { AuditHelper } from '../common/helpers/audit.helper';

@Controller('books')
export class BookStoreController {
  constructor(
    private readonly bookStoreService: BookStoreService,
    private readonly PdfService: PdfService
  ) { }
  // ========================  Static API Methods  =========================
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
        author: false,
        is_available: true
      }
    };
    return this.bookStoreService.findAll(query);
  }

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



  // ========================  Dynamic API Methods  =========================
  @Get('get_by_id/:id')
  findOne(@Param('id', ParseIntPipe) id: string, @Req() req: Request) {
    //const audit = AuditHelper.getAuditInfo(req)

    return this.bookStoreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookStoreDto: UpdateBookStoreDto) {
    return this.bookStoreService.update(+id, updateBookStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookStoreService.remove(+id);
  }

  @Get('update_status/:id')
  updateStatus(@Param('id', ParseIntPipe) id: number) {
    return this.bookStoreService.changeBookStatus(id)
  }

}