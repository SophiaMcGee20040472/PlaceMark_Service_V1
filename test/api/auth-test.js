/*
import { assert } from "chai";
import { CategoryService } from "./placemark-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    CategoryService.clearAuth();
    await CategoryService.createUser(maggie);
    await CategoryService.authenticate(maggie);
    await CategoryService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await CategoryService.createUser(maggie);
    const response = await CategoryService.authenticate(maggie);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await CategoryService.createUser(maggie);
    const response = await CategoryService.authenticate(maggie);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    CategoryService.clearAuth();
    try {
      await CategoryService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});
*/
