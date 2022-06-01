import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { CategoryController } from "./controllers/placemark-controller.js";
import { editUserController } from "./controllers/edit-user-controller.js";
import { adminController } from "./controllers/admin-controller.js";
import { reviewController } from "./controllers/review-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },
  { method: "GET", path: "/editUser", config: editUserController.index },
  { method: "GET", path: "/admin", config: adminController.index },
  { method: "POST", path: "/editUser", config: accountsController.updateCurrentUser },
  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
  { method: "GET", path: "/admin/deleteuser/{id}", config: adminController.deleteUser },
  { method: "POST", path: "/dashboard/addCategory", config: dashboardController.addCategory },
  { method: "GET", path: "/about", config: aboutController.index },
  { method: "GET", path: "/review", config: reviewController.index },
  { method: "GET", path: "/placemark/{id}", config: CategoryController.index },
  { method: "POST", path: "/placemark/{id}/addplacemark", config: CategoryController.addPlaceMark },

  { method: "GET", path: "/placemark/{id}/placemark/{placemarkid}", config: CategoryController.placeMarkDetails },
  { method: "POST", path: "/placemark/{id}/placemark/{placemarkid}", config: CategoryController.update },
  { method: "POST", path: "/placemark/{id}/{placemarkid}/uploadimage", config: CategoryController.uploadImage },

  { method: "GET", path: "/dashboard/deleteplacemark/{id}", config: dashboardController.deleteCategory },
  { method: "GET", path: "/placemark/{id}/deleteplacemark/{categoryid}", config: CategoryController.deletePlaceMark },
  { method: "POST", path: "/review/addReview/placemark/{placemarkid}", config: reviewController.addReview },
];
