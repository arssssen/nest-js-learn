import{IsString, IsInt, IsEmail, IsEnum, IsNotEmpty, isNotEmpty} from 'class-validator';
export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsEnum(['INTERN', 'ENGINEER',  "ADMIN"],{
        message: "Valid role required"
    })
    role: "INTERN" | "ENGINEER" | "ADMIN";
}