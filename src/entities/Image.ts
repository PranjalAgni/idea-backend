import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class Image extends BaseEntity {
	@PrimaryGeneratedColumn()
	imageId: number;

	@Column("varchar", { nullable: false })
	url: string;

	@CreateDateColumn({ type: "timestamp" })
	createdAt: Date;

	@CreateDateColumn({ type: "timestamp" })
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
}
