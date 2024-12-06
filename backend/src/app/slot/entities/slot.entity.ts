import { User } from "src/app/user/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({
  schema: "slot",
  name: "slot",
})
export class Slot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start_time: Date;

  @Column({ type: "int", nullable: true })
  student_id?: number | null;

  @Column({ type: "int" })
  coach_id: number;

  @Column({ default: false })
  call: boolean;

  @Column({ type: "float", nullable: true })
  satisfaction?: number | null;

  @Column({ type: "text", nullable: true })
  notes?: string | null;

  @ManyToOne(() => User, (user) => user.slots)
  @JoinColumn({ name: "coach_id", referencedColumnName: "id" })
  coach?: User | null;

  @ManyToOne(() => User, (user) => user.slots, { nullable: true })
  @JoinColumn({ name: "student_id", referencedColumnName: "id" })
  student?: User | null;
}
