import { Controller, Post } from "@nestjs/common";

@Controller()
export class UploadsController {
    constructor() {}

  @Post('uploads_cover_photo')
  cover_photo(){
    return {msg:"Uploads Books Cover Photo"};
  }
}