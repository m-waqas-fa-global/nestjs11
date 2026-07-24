import * as fs from 'fs';
import * as path from 'path';

export class LoggerHelper {
    private static readonly logDir = path.join(process.cwd(), 'src', 'common', 'logs');
    private static readonly logFile = path.join(
        LoggerHelper.logDir,
        'api-log.json',
    );

    static write(log: any) {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }

        let logs: any[] = [];

        if (fs.existsSync(this.logFile)) {
            const file = fs.readFileSync(this.logFile, 'utf8');

            if (file) {
                logs = JSON.parse(file);
            }
        }

        logs.push(log);

        fs.writeFileSync(
            this.logFile,
            JSON.stringify(logs, null, 2),
        );
    }
}