import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
    constructor() {}

   async hashPassword(password:string){
      const saltOrRounds = 10;
      return await bcrypt.hash(password, saltOrRounds);
    }

    async genPassSalt(){
      return await bcrypt.genSalt();
    }

    /**
    @author 
      M Waqas
    @argument   
      current_password: string,
      hash_password:string
     */

    async isCompare(password:string,hash:string | any){ 
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    }
}
