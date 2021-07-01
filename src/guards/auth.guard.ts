import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from '@nestjs/common';
import {UserService} from '../user/user.service'
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(forwardRef(()=>UserService)) private readonly userService:UserService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>{
   let request=context.switchToHttp().getRequest()
 
   let token=request?.cookies['token']||null
   console.log(token)
   if(token){
      let status=await this.userService.validToken(token)
      return status
   }
   return false
  }
}
