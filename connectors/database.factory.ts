import { User } from '../src/users/models/user.model';
import { Role } from '../src/roles/models/roles.model';
import { UserRoles } from '../src/roles/models/user-roles.model';
import { Customer } from '../src/customers/models/customers.model';
import { Addresses } from '../src/addresses/models/addresses.model';
import { CustomerAddresses } from '../src/addresses/models/customer-addresses.model';
import { Promocode } from '../src/promocodes/models/promocodes.model';
import { Order } from '../src/orders/models/orders.model';
import { Kitchen } from '../src/kitchens/models/kitchens.model';
import { KitchenUser } from '../src/kitchens/models/kitchen-users.model';
import { OrderDays } from '../src/order-days/models/order-days.model';
import { GroupIngredient } from '../src/group-ingredients/models/group-ingredients.model';
import { Ingredient } from '../src/ingredients/models/ingredients.model';
import { Techcard } from '../src/techcards/models/techcards.model';


export const databaseFactory = (configService) => ({
  dialect: configService.get('DB.DIALECT'),
  host: configService.get('DB.HOST'),
  database: configService.get('DB.NAME'),
  port: configService.get('DB.PORT'),
  username: configService.get('DB.USER'),
  password: configService.get('DB.PASS'),
  models: [
    User, Role, UserRoles, Customer, Addresses, CustomerAddresses,
    Promocode, Order, Kitchen, KitchenUser, OrderDays,
    GroupIngredient, Ingredient, Techcard
  ],
  autoLoadModels: configService.get('DB.AUTOLOADMODELS')
})