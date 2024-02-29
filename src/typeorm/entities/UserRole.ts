import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "user_roles" })
export class UserRole {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ unique: true })
  name: string;
}
