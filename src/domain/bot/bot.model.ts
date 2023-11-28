import { Table, Column, Model, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
    timestamps: true,
    schema: 'botUser',
    tableName: 'botUsers'
})
class botUser extends Model {
    @Column
    chat_id: string;

    @Column
    first_name : string;
    
    @Column
    username: string;

    @Column
    phone_number: string;

    @Column
    user_id: number;

    @CreatedAt
    @Column
    createdAt: Date;

    @UpdatedAt
    @Column
    updatedAt: Date;
}

export default botUser;