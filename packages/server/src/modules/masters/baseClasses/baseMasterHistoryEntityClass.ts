import { BaseEntity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

import { User } from "../../user";

@ObjectType({ isAbstract: true })
export abstract class BaseMasterHistory extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  hid!: string;

  @Field()
  @Column("uuid")
  pid!: string;

  @Field()
  @Column({ type: "varchar", length: 15 })
  code!: string;

  @Field()
  @Column({ type: "varchar", length: 50 })
  name!: string;

  @Field()
  @Column({ type: "boolean", default: false })
  deprecated!: boolean;

  // DEFAULT COLUMNS

  @Field(() => String)
  @Column({ type: "timestamp without time zone", nullable: true })
  createdAt?: Date;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  createdBy?: User;

  @Field(() => String, { nullable: true })
  @Column({ type: "timestamp without time zone", nullable: true })
  updatedAt?: Date;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  updatedBy?: User;

  @Field(() => String, { nullable: true })
  @Column({ type: "timestamp without time zone", nullable: true })
  deletedAt?: Date;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  deletedBy?: User;
}
