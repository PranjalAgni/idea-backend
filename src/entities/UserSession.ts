import {
	DeleteDateColumn,
	BaseEntity,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	OneToOne,
	JoinColumn,
	Column
} from "typeorm";
import { User } from "./User";

@Entity({ name: "user_session" })
export class UserSession extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	sessionId: string;

	@OneToOne(() => User)
	@JoinColumn({ name: "userId" })
	user: User;

	@Column("text", { name: "ip_address" })
	ipAddress: string;

	@CreateDateColumn({ type: "timestamp" })
	createdAt: Date;

	@CreateDateColumn({ type: "timestamp" })
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
}
