import { Entity, ManyToOne, OneToMany } from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { ProductMaster } from "../product";
import { MenuMaster } from "../menu";
import { BaseMaster } from "../baseClasses";

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
}
