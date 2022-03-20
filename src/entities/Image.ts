import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from "typeorm";
import { ImageType } from "./ImageType";

@Entity({ name: "lu_image" })
export class Image extends BaseEntity {
	@PrimaryGeneratedColumn()
	imageId: number;

	@Column("text")
	url: string;

	@ManyToOne(() => ImageType)
	@JoinColumn({ name: "fk_image_type_id" })
	imageType: ImageType;

	@CreateDateColumn({ type: "timestamp" })
	createdAt: Date;

	@CreateDateColumn({ type: "timestamp" })
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
}
