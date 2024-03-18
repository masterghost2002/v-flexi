import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {PassportStrategy} from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(config:ConfigService, private prisma:PrismaService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:config.get('JWT_SECRET'),
        })
    }
    async validate(payload:{
        userId:number,
        email:string
    }){
        const user = await this.prisma.user.findFirst({
            where:{
                email:payload.email
            }
        });
        // if this throw null, it will throw error
        return user;
    }
};