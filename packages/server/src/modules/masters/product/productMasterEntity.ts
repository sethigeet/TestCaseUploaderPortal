import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { User } from "../../user";

import { ModuleMaster } from "../module";

@ObjectType()
@Entity()
export class ProductMaster extends BaseEntity {
  @Field()
  @PrimaryColumn({ type: "varchar", length: 10, unique: true })
  id!: string;

  @Field()
  @Column({ type: "varchar", length: 50, unique: true })
  name!: string;

  @Field()
  @Column({ type: "boolean", default: false })
  deprecated!: boolean;

  @Field(() => [ModuleMaster], { nullable: true })
  @OneToMany(() => ModuleMaster, (module) => module.product)
  modules!: ModuleMaster[];

  // DEFAULT COLUMNS

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.id)
  createdBy!: User;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  updatedBy!: User;
}
