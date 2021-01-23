import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { User } from "../../user";

import { ProductMaster } from "../product";
import { MenuMaster } from "../menu";

@ObjectType()
@Entity()
export class ModuleMaster extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ type: "varchar", length: 10, unique: true })
  code!: string;

  @Field()
  @Column({ type: "varchar", length: 50 })
  name!: string;

  @Field()
  @Column({ type: "boolean", default: false })
  deprecated!: boolean;

  @Field(() => ProductMaster)
  @ManyToOne(() => ProductMaster, (product) => product.modules, {
    onDelete: "CASCADE",
  })
  product!: ProductMaster;

  @Field(() => [MenuMaster], { nullable: true })
  @OneToMany(() => MenuMaster, (menu) => menu.module)
  menus!: MenuMaster[];

  // DEFAULT COLUMNS

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.id)
  createdBy!: User;

  @Field(() => String, { nullable: true })
  @UpdateDateColumn()
  updatedAt!: Date;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  updatedBy!: User;
}
