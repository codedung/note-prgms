import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ comment: "사용자 고유 번호" })
  id!: number;

  @Column({ type: "varchar", length: 256, comment: "사용자 이메일" })
  email!: string;

  @Column({ type: "varchar", length: 512, comment: "암호화 된 비밀번호" })
  password!: string;

  @Column({
    type: "varchar",
    nullable: true,
    length: 512,
    comment: "프로필 이미지",
  })
  profile?: string | null;

  @CreateDateColumn({ type: "timestamp", comment: "가입일" })
  createAt!: string;
}
