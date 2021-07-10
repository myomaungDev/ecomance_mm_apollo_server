
import { IsAuthDirective } from "./auth_directives";
import { IsSellerDirectives } from "./seller_directive";
import {IsSuperAdminDirective} from './super_admin_directive'
import {IsBuyerDirectives} from './buyer_directive'
import {IsDeliveryDirectives} from './delivery_directives'
export const schemaDirectives = {
  isAuth: IsAuthDirective,
  isSuperAdmin:IsSuperAdminDirective,
  isSeller:IsSellerDirectives,
  isBuyer:IsBuyerDirectives,
  isDelivery:IsDeliveryDirectives
};