import PDFDocument from 'pdfkit';
import { Response } from 'express';

export class PdfService {
  generateStatsReport(stats: any, res: any) {
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=book-stats-report.pdf',
    );

    doc.pipe(res);

    doc
      .fontSize(22)
      .text('Book Statistics Report', {
        align: 'center',
      });

    doc.moveDown();

    doc.fontSize(14);

    doc.text(`Total Books : ${stats.total_books}`);
    doc.text(`Average Price : ${stats.avg_price.toFixed(2)}`);
    doc.text(`Total Price : ${stats.total_price}`);
    doc.text(`Minimum Price : ${stats.min_price}`);
    doc.text(`Maximum Price : ${stats.max_price}`);

    doc.moveDown();

    doc.text(`Generated At : ${new Date().toLocaleString()}`);

    doc.end();
  }
}