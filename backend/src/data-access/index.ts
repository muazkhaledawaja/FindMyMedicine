import {
    User,
    Role,
    Pharmacy,
    City,
    Region,
    ActivityLog,
    PharmacyMedicine,
    Category,
    Medicine,
    Order,
    OrderItem,
    Prescription,
    DeliveryProfile,
    UserReview,
    PharmacyProfile,
} from "../models/index";

import { UserRepository } from "./UserRepository";
import { RoleRepository } from "./RoleRepository";
import { PharmacyRepository } from "./PharmacyRepository";
import { CityRepository } from "./CityRepository";
import { RegionRepository } from "./RegionRepository";
import { ActivityLogRepository } from "./ActivityLogRepository";
import { PharmacyMedicineRepository } from "./PharmacyMedicineRepository";
import { CategoryRepository } from "./CategoryRepository";
import { MedicineRepository } from "./MedicineRepository";
import { OrderRepository } from "./OrderRepository";
import { OrderItemRepository } from "./OrderItemRepository";
import { PrescriptionRepository } from "./PrescriptionRepository";
import { DeliveryProfileRepository } from "./DeliveryProfileRepository";
import { UserReviewRepository } from "./UserReviewRepository";
import { PharmacyProfileRepository } from "./PharmacyProfileRepository";


export const userRepository = new UserRepository(User);
export const roleRepository = new RoleRepository(Role);
export const pharmacyRepository = new PharmacyRepository(Pharmacy);
export const cityRepository = new CityRepository(City);
export const regionRepository = new RegionRepository(Region);
export const activityLogRepository = new ActivityLogRepository(ActivityLog);
export const pharmacyMedicineRepository = new PharmacyMedicineRepository(PharmacyMedicine);
export const categoryRepository = new CategoryRepository(Category);
export const medicineRepository = new MedicineRepository(Medicine);
export const orderRepository = new OrderRepository(Order);
export const orderItemRepository = new OrderItemRepository(OrderItem);
export const prescriptionRepository = new PrescriptionRepository(Prescription);
export const deliveryProfileRepository = new DeliveryProfileRepository(DeliveryProfile);
export const userReviewRepository = new UserReviewRepository(UserReview);
export const pharmacyProfileRepository = new PharmacyProfileRepository(PharmacyProfile);
