import {
  AfterInsert,
  AfterUpdate,
  Entity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { ProductMaster } from "../product";
import { MenuMaster } from "../menu";
import { BaseMaster, BaseMasterHistory } from "../baseClasses";

@ObjectType()
@Entity()
export class ModuleMaster extends BaseMaster {
  @Field(() => ProductMaster)
  @ManyToOne(() => ProductMaster, (product) => product.modules, {
    onDelete: "CASCADE",
  })
  product!: ProductMaster;

  @Field(() => [MenuMaster], { nullable: true })
  @OneToMany(() => MenuMaster, (menu) => menu.module)
  menus!: MenuMaster[];

  @AfterInsert()
  async InsertIntoHistory(): Promise<void> {
    await ModuleMasterHistory.create({
      pid: this.id,
      code: this.code,
      name: this.name,
      deprecated: this.deprecated,
      createdAt: this.createdAt,
      createdBy: this.createdBy,
    }).save();
  }

  @AfterUpdate()
  async UpdateIntoHistory(): Promise<void> {
    await ModuleMasterHistory.create({
      pid: this.id,
      code: this.code,
      name: this.name,
      deprecated: this.deprecated,
      updatedAt: this.updatedAt,
      updatedBy: this.updatedBy,
    }).save();
  }
}

@ObjectType()
@Entity()
export class ModuleMasterHistory extends BaseMasterHistory {
  @Field(() => ProductMaster)
  @ManyToOne(() => ProductMaster, (product) => product.modules, {
    onDelete: "CASCADE",
  })
  product!: ProductMaster;

  @Field(() => [MenuMaster], { nullable: true })
  @OneToMany(() => MenuMaster, (menu) => menu.module)
  menus!: MenuMaster[];
}
