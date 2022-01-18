import { BelongsToMany, Column, DataType, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Kitchen } from '../../kitchens/models/kitchens.model';
import { KitchenUserKitchensAssociations } from '../../kitchens/models/kitchen-user-kitchens-associations.model';


// kitchens users creation attributes
interface KitchenUserFields {
  first_name: string;
  last_name: string;
  email: string;
  password: string
  kitchen_id: number;
}

// kitchen_users model
@Table({ tableName: 'kitchen_users' })
export class KitchenUser extends Model<KitchenUser, KitchenUserFields>{
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({ example: 'John', description: 'first name' })
  @Column({ type: DataType.STRING, allowNull: false })
  first_name: string;

  @ApiProperty({ example: 'Mathew', description: 'last name' })
  @Column({ type: DataType.STRING, allowNull: false })
  last_name: string;

  @ApiProperty({ example: 'jackandjones@gmail.com', description: 'email address' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({
    example: '$2a$10$.DLLyE6GOFk2reMZml751eutkcrNawX2lCgqz0bXda55WYDZrLOcC',
    description: 'password'
  })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({
    example: {
      "id": 2,
      "text": "Delaware, St. Riston 1A-22",
      "lat": 12.345678,
      "lon": 23.456798,
      "road": "Avenue, 1C",
      "houseNumber": "42a BBC",
      "neighbourhood": "smth",
      "zipcode": 12345,
      "active": true,
      "createdAt": "2021-11-12T06:15:55.612Z",
      "updatedAt": "2021-11-12T06:15:55.612Z",
      "CustomerAddresses": {
        "id": 2,
        "addressID": 2,
        "customerID": 7,
        "createdAt": "2021-11-12T06:20:56.582Z",
        "updatedAt": "2021-11-12T06:20:56.582Z"
      }
    },
    type: 'object'
  })
  @BelongsToMany(() => Kitchen, () => KitchenUserKitchensAssociations)
  kitchen: number;

  @ForeignKey(() => Kitchen)
  kitchen_id: number;

  @ApiProperty({ example: true, description: 'is kitchens user is active' })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  active: boolean;
}