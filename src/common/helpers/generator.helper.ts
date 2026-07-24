export class GeneratorHelper {
    //   REF-20260722-000001
    static generateReferenceNumber(sequence: number): string {
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');

        return `REF-${date}-${sequence.toString().padStart(6, '0')}`;
    }
    // INV-20260722-000001
    static generateInvoiceNumber(sequence: number): string {
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');

        return `INV-${date}-${sequence.toString().padStart(6, '0')}`;
    }
    // BOOK-000001
    static generateBookCode(id: number): string {
        return `BOOK-${id.toString().padStart(6, '0')}`;
    }
    // REQ-4837
    static generateRequestId(): string {
        return `REQ-${Math.floor(1000 + Math.random() * 9000)}`;
    }
     
}