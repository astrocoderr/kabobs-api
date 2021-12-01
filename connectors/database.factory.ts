import { User } from '../src/users/models/user.model';
import { Role } from '../src/roles/models/roles.model';
import { UserRoles } from '../src/roles/models/user-roles.model';
import { Customer } from '../src/customers/models/customer.model';
import { Addresses } from '../src/addresses/models/addresses.model';
import { CustomerAddresses } from '../src/addresses/models/customer-addresses.model';


export const databaseFactory = (configService) => ({
  dialect: configService.get('DB.DIALECT'),
  host: configService.get('DB.HOST'),
  database: configService.get('DB.NAME'),
  port: configService.get('DB.PORT'),
  username: configService.get('DB.USER'),
  password: configService.get('DB.PASS'),
  models: [ User, Role, UserRoles, Customer, Addresses, CustomerAddresses ],
  autoLoadModels: configService.get('DB.AUTOLOADMODELS')
})