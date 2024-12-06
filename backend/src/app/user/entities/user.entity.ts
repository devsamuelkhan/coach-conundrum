import { Slot } from "src/app/slot/entities/slot.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
  STUDENT = 'student',
  COACH = 'coach',
}

@Entity({
  schema:'user',
  name:'user'
})
export class User  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @Column()
  phone_number: string;

  @OneToMany(() => Slot, (slot) => slot.coach)
  slots: Slot[];
}
