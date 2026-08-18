import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn} from 'typeorm';


@Entity("publishers")
export class PublishersEntity{

    // 🏢 Publishers → Publisher information

  @PrimaryGeneratedColumn()
  publisher_id: number;
  
  @Column({
    type: 'varchar',
    length: 150,
    unique:true
  })
  name: string;
  
  @Column({
      type: 'text',
      default: null,
  })
  desc: string;
  
    // @Column({
    //   type: 'varchar',
    //   length: 255,
    //   nullable: true,
    //   default: null,
    // })
    // website: string;

  @CreateDateColumn()
  created_at: Date;
     
}