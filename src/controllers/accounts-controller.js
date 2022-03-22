import { db } from "../models/db.js";
import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";

export const accountsController = {
  // Method which controls the page view
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to PlaceMark" });
    },
  },

  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for PlaceMark" });
    },
  },
  showAdmin: {
    auth: false,
    handler: function (request, h) {
      return h.view("admin", { title: "Admin for PlaceMark" });
    },
  },
  // Method to help authenticate new members
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  // this method helps display the login page
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to PlaceMark" });
    },
  },
  // this login method helps authenticate that users credentials are correct on log in.
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      /* here I used my seeded admin data which I set as a boolean. This allows me if I am an admin
      to be directed to my adminDashboard and if I am a regular user redirect to  regular dashboard */
      request.cookieAuth.set({ id: user._id });
      if (user.admin !== false) {
        return h.redirect("/admin");
      }
      return h.redirect("/dashboard");
    },
  },
  // method to redirect to main page of entry.
  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },
  // method that validates userId
  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { valid: false };
    }
    return { valid: true, credentials: user };
  },
  // This is a method that helps me get the current user and update there credentials in the database.
  updateCurrentUser: {
    handler: async function (request, h) {
      const currentUserId = request.state.category.id;
      const userId = request.payload._id;
      console.log(request.payload);
      let updatedUser = request.payload;
      await db.userStore.updateUser(currentUserId, updatedUser);
      return h.redirect("/login");
    },
  },
};
