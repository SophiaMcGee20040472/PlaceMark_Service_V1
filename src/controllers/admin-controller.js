import { db } from "../models/db.js";

export const adminController = {
  index: {
    /* This is my main Admin index Method to control view output. This method also finds the user by there Id and if
    the user is not an admin makes sure that a regular logged in person can't log in as admin in the browser and delete Users.
    This was a bug in my code that I really needed to fix */
    handler: async function (request, h) {
      const users = await db.userStore.getAllUsers(request.params.id);
      const user = await db.userStore.getUserById(request.state.category.id);
      // here is where a regular user will be redirected to dashboard
      if (user.admin !== true) {
        return h.redirect("dashboard");
      }
      const viewData = {
        title: "Admin PlaceMarks",
        users: users,
      };
      return h.view("admin", viewData);
    },
  },
  // DeleteUser Method this allows only the user I want to delete to be deleted depending on seeding.
  deleteUser: {
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.id);
      if (user.admin !== true) {
        await db.userStore.deleteUserById(user._id);
      }
      return h.redirect("/admin");
    },
  },
};
