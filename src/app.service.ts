import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppService {
private homePage: string = `
<!DOCTYPE html>
<html>
<head>
  <title>NestJS Server</title>
  <style>
    body{
      margin:0;
      font-family:Arial, sans-serif;
      background:linear-gradient(135deg,#0f172a,#1e293b);
      color:white;
    }
    header{
      text-align:center;
      padding:60px 20px;
    }
    header h1{
      font-size:40px;
      color:#e0234e;
    }
    section{
      text-align:center;
    }
    .status{
      font-size:18px;
      margin-bottom:10px;
      color:#22c55e;
      font-weight:bold;
    }
    .cards{
      display:flex;
      justify-content:center;
      gap:20px;
      flex-wrap:wrap;
    }
    .card{
      background:#334155;
      padding:20px;
      width:250px;
      border-radius:12px;
      box-shadow:0 5px 15px rgba(0,0,0,0.3);
    }
    footer{
      text-align:center;
      padding:20px;
      background:#0f172a;
      margin-top:40px;
    }
    #timer{
      font-size:18px;
      color:#38bdf8;
      margin-top:10px;
    }
    a {
      
    color: deepskyblue;
    text-decoration: none;
    font-weight: 600;

    }
  </style>
</head>
<body>

<header>
  <h1>🚀 NestJS Server Running</h1>
  <p>Backend API is successfully connected.</p>
  <div id="timer">Server Uptime: 0s</div>
</header>

<section>
  <div class="status">Status: 🟢 Online</div>
  <h2>✨ Features</h2>

  <div class="cards">
    <div class="card">
      <h3>Fast Performance</h3>
      <p>High speed Node.js framework.</p>
    </div>
    <div class="card">
      <h3>Scalable</h3>
      <p>Built with modular architecture.</p>
    </div>
    <div class="card">
      <h3>Secure</h3>
      <p>Supports guards & middleware.</p>
    </div>
    <div class="card">
      <h3>Swagger API Docs</h3>
      <p>Interactive API documentation. <a href="/api-docs-swagger" target="_blank">View Docs</a></p>
    </div>
  </div>
</section>
<script>
  let seconds = 0;
  setInterval(() => {
    seconds++;
    document.getElementById("timer").innerText =
      "Server Uptime: " + seconds + "s";
  }, 1000);
</script>
</body>
</html>`

  constructor(readonly configService: ConfigService) {
    // console.log("Current working directory:",path.join(process.cwd(),'invoices','logic.js'));  
    // console.log(path.join('nest-api-logs','invoices','logic.js'));
    // console.log("directory:", __dirname);
    // console.log("directory:",__filename);  
    // this.monitorMemoryUsage()
  }
  // Node Process Manager Monitoring:
  monitorMemoryUsage() {
    const memory = process.memoryUsage();

    console.table({
      RSS_MB: (memory.rss / 1024 / 1024).toFixed(2),
      HeapUsed_MB: (memory.heapUsed / 1024 / 1024).toFixed(2),
      HeapTotal_MB: (memory.heapTotal / 1024 / 1024).toFixed(2),
      External_MB: (memory.external / 1024 / 1024).toFixed(2),

    });
  }
  // Getting ENV Var using the COnfig Service:
  getingEnvVar(){
   const envVar = {
      typeorm: this.configService.get("TYPEORM_CONNECTION"),
      password: this.configService.get("TYPEORM_PASSWORD"),
      port: this.configService.get("TYPEORM_PORT"),
      token: this.configService.get("TOKEN_SECRET"),
      scriptUrl: this.configService.get("SMTP_PASSWORD")
    }
    return envVar;
  }


  getHello(): any {
    return this.homePage
  }

  creatingFilesOnServer(fileName: string, fileContent: string) {
    // const fileName = 'data.js';   // `${'readme'}.${'.md'}`
    const filePath = path.join(process.cwd(), 'invoices', fileName);
    console.log(filePath);
    fs.writeFileSync(filePath, fileContent);
  }

  writeFileData(fileN: string, fileContent: string) {
    //  const filePath = path.join(process.cwd(),'invoices',fileN);
    fs.appendFileSync(fileN, fileContent);
  }

  getFilesData() {
    const files = fs.readdirSync(process.cwd());
    return files;
  }
}