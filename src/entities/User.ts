import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn
} from "typeorm";
import { Image } from "./Image";

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	userId: number;

	@Column({
		unique: true,
		nullable: false,
		type: "text"
	})
	username: string;

	@Column({
		nullable: true,
		select: false,
		type: "text"
	})
	password: string;

	@Column({
		nullable: true,
		type: "boolean",
		name: "is_verified"
	})
	isVerified: boolean;

	@Column({
		nullable: true,
		type: "text",
		name: "first_name"
	})
	firstName: string;

	@Column({
		nullable: true,
		type: "text",
		name: "last_name"
	})
	lastName: string;

	@Column({
		nullable: true,
		type: "date",
		name: "birth_date"
	})
	birthDate: Date;

	@Column({
		nullable: true,
		type: "char",
		length: 1
	})
	gender: string;

	@OneToOne(() => Image, { nullable: true, cascade: true })
	@JoinColumn({ name: "avatar" })
	@Column({ nullable: true })
	avatar: Image;

	@CreateDateColumn({ type: "timestamp" })
	createdAt: Date;

	@CreateDateColumn({ type: "timestamp" })
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
}
