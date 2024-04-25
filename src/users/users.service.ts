import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-usser.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {

    private users = [
        {
            "id": 1,
            "name" : "Ars",
            "email": "ars@gm.co",
            "role" : "ADMIN"
        },
        {
            "id": 2,
            "name" : "Bars",
            "email": "bars@gm.co",
            "role" : "INTERN"
        },
        {
            "id": 3,
            "name" : "Mars",
            "email": "mars@gm.co",
            "role" : "ENGINEER"
        },
        {
            "id": 4,
            "name" : "Cars",
            "email": "cars@gm.co",
            "role" : "INTERN"
        },
        {
            "id": 5,
            "name" : "Dars",
            "email": "dars@gm.co",
            "role" : "ADMIN"
        },
        {
            "id": 6,
            "name" : "Fars",
            "email": "fars@gm.co",
            "role" : "ENGINEER"
        },
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
        if (role){
            const rolesArray = this.users.filter(user => user.role === role)
            if(rolesArray.length === 0) throw new NotFoundException("User Role Not Found")
            return rolesArray
        }
        return this.users
    }

    findById(id: number){
        const user = this.users.find(user=> user.id === id)
        if(!user) throw new NotFoundException("User not Found")
        return user
    }

    create(user: CreateUserDto){
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)
        const newUser = {
            id: usersByHighestId[0].id +1, ...user
        }

        this.users.push(newUser)
        return newUser
    }

    update(id: number, updatedUser: UpdateUserDto){
        this.users = this.users.map(user => {
            if(user.id === id){
                return { ...user, ...updatedUser}
            }
            return user
        })
        return this.findById(id)
    }


    delete(id:number){
        const removedUser = this.findById(id)
        this.users = this.users.filter(user => user.id !== id)
        return removedUser

    }
}
