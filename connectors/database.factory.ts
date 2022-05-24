import { User } from '../src/users/models/user.model';
import { Role } from '../src/roles/models/roles.model';
import {
  UserRolesAssociations
} from '../src/roles/models/user-roles-associations.model';
import { Customer } from '../src/customers/models/customers.model';
import { Addresses } from '../src/addresses/models/addresses.model';
import {
  CustomerAddressesAssociations,
} from '../src/addresses/models/customer-addresses-associations.model';
import { Promocode } from '../src/promocodes/models/promocodes.model';
import { Order } from '../src/orders/models/orders.model';
import { Kitchen } from '../src/kitchens/models/kitchens.model';
import { KitchenUser } from '../src/kitchen-users/models/kitchen-users.model';
import { OrderDays } from '../src/order-days/models/order-days.model';
import {
  GroupIngredient
} from '../src/group-ingredients/models/group-ingredients.model';
import { Ingredient } from '../src/ingredients/models/ingredients.model';
import { Techcard } from '../src/techcards/models/techcards.model';
import {
  OrderAddressesAssociations
} from '../src/addresses/models/order-addresses-associations.model';
import {
  KitchenAddressesAssociations,
} from '../src/addresses/models/kitchen-addresses-associations.model';
import {
  IngredientGroupAssociations,
} from '../src/group-ingredients/models/ingredient-group-associations.model';
import {
  IngredientTechcardsAssociations,
} from '../src/techcards/models/ingredient-techcards-associations.model';
import {
  KitchenUserKitchensAssociations
} from '../src/kitchens/models/kitchen-user-kitchens-associations.model';
import {
  CustomerOrdersAssociations
} from '../src/orders/models/customer-orders-associations';
import {
  ManagerOrdersAssociations
} from '../src/orders/models/manager-orders-associations.model';
import {
  CreatorOrdersAssociations
} from '../src/orders/models/creator-orders-associations.model';
import {
  CustomerPromocodesAssociations
} from '../src/promocodes/models/customer-promocodes-associations.model';
import {
  UserCustomersAssociations
} from '../src/customers/models/user-customers-associations.model';
import { Tag } from '../src/tags/models/tags.model';
import {
  TagsTechcardsAssociations
} from '../src/techcards/models/tags-techcards-associations.model';


export const databaseFactory = (configService) => ({
  dialect: configService.get('DB.DIALECT'),
  host: configService.get('DB.HOST'),
  database: configService.get('DB.NAME'),
  port: configService.get('DB.PORT'),
  username: configService.get('DB.USER'),
  password: configService.get('DB.PASS'),
  models: [
    User, Role, UserRolesAssociations, Customer, UserCustomersAssociations, Addresses,
    CustomerAddressesAssociations, Promocode, CustomerPromocodesAssociations,
    Order, CustomerOrdersAssociations,
    ManagerOrdersAssociations, CreatorOrdersAssociations, OrderAddressesAssociations,
    Kitchen, KitchenAddressesAssociations, KitchenUser, KitchenUserKitchensAssociations,
    OrderDays, GroupIngredient, Ingredient, IngredientGroupAssociations, Techcard,
    IngredientTechcardsAssociations, Tag, TagsTechcardsAssociations
  ],
  autoLoadModels: configService.get('DB.AUTOLOADMODELS')
})