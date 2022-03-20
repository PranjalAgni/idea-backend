import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn
} from "typeorm";

@Entity({ name: "lu_image_type" })
export class ImageType extends BaseEntity {
	@PrimaryGeneratedColumn()
	imageTypeId: number;

	@Column("text")
	type: string;

	@CreateDateColumn({ type: "timestamp" })
	createdAt: Date;

	@CreateDateColumn({ type: "timestamp" })
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
}
