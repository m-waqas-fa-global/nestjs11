import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn} from 'typeorm';


@Entity("publishers")
export class AuthorsEntity{

    // 🏢 Publishers → Publisher information

    @PrimaryGeneratedColumn()
    publisher_id: number;
  
    @Column({
      type: 'varchar',
      length: 150,
      nullable: false,
    })
    name: string;
  
    @Column({
      type: 'text',
      nullable: true,
      default: null,
    })
    description: string;
  
    // @Column({
    //   type: 'varchar',
    //   length: 255,
    //   nullable: true,
    //   default: null,
    // })
    // website: string;

    @CreateDateColumn({
      type: 'timestamp',
    })
    created_at: Date;
     
}