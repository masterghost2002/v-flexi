import { createParamDecorator, ExecutionContext } from "@nestjs/common";
const helper = (key:string | undefined, ctx:ExecutionContext)=>{
    const request = ctx.switchToHttp().getRequest();
    if(key)
        return request.user[key];
    return request.user;
}
export const GetUser = createParamDecorator(helper);