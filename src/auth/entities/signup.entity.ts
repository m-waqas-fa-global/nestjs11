import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sign-up-table")
export class SignUpEntity{
    
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        type:"varchar",
        length: 50,
        default: null
    })
    name:string

    @Column({type:"varchar",length:35,unique:true,default:null})
    email:string
}