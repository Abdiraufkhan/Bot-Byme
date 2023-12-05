import { UUIDV4 } from "sequelize";
import {
    Table,
    Column,
    Model,
    PrimaryKey,
    IsUUID,
    HasMany,
    Default,
} from "sequelize-typescript";

@Table({
    timestamps: true,
    schema: "User",
    tableName: "Users"

})
class User extends Model {
    @IsUUID(4)
    @Default(UUIDV4)
    @PrimaryKey
    @Column
    id: string;

    @Column
    firstName: string;

    @Column
    lastName: string;

    @Column
    username: string;

    @Column
    password: string;
}

export default User;
