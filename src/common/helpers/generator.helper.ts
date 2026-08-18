export class GeneratorHelper {
    // ORD-48214
    static generateOrderNumber(): string {
        return `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
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