import { Injectable } from '@nestjs/common';
import { ApiResponse } from '../../common/helpers/api-response.helper';
import { SignUpData } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
    constructor() {}

    userSignUp(signUpData: SignUpData) {
        return ApiResponse.success("User registered successfully", signUpData)
    }
}
