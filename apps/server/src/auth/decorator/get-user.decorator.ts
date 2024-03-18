import { createParamDecorator, ExecutionContext } from "@nestjs/common";
const helper = (data:unknown, ctx:ExecutionContext)=>{
    const request = ctx.switchToHttp().getRequest();
    return request.users;
}
export const GetUser = createParamDecorator(helper);