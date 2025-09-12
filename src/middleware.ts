import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthServices";
const authRoute = ['/login', '/register']
export const  middleware = async(request: NextRequest) =>{
    const {pathname} = request.nextUrl;
    const userInfo = getCurrentUser();

    if(!userInfo){
        if(authRoute.includes(pathname)){
            return NextResponse.next();
        }else{
            return NextResponse.redirect(
                new URL(`http://localhost:3000/login?redirectPath=${pathname}`, request.url)
            )
        }
    }
};

export const config = {
    matcher : ["/login", "/create-shop"]
}