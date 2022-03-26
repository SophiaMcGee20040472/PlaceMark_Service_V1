/*
import { assert } from "chai";
import { CategoryService } from "./placemark-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, maggieCredentials, FreshWater, testCategories } from "../fixtures.js";

suite("Category API tests", () => {
  let user = null;

  setup(async () => {
    CategoryService.clearAuth();
    user = await CategoryService.createUser(maggie);
    await CategoryService.authenticate(maggieCredentials);
    await CategoryService.deleteAllCategories();
    await CategoryService.deleteAllUsers();
    user = await CategoryService.createUser(maggie);
    await CategoryService.authenticate(maggieCredentials);
    FreshWater.userid = user._id;
  });

  test("create Category", async () => {
    const returnedCategory = await CategoryService.createCategory(FreshWater);
    assert.isNotNull(returnedCategory);
    assertSubset(FreshWater, returnedCategory);
  });

  test("delete a category", async () => {
    const category = await CategoryService.createCategory(FreshWater);
    const response = await CategoryService.deleteCategory(category._id);
    assert.equal(response.status, 204);
    try {
      const returnedCategory = await CategoryService.getCategory(category.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });

  test("create multiple categories", async () => {
    for (let i = 0; i < testCategories.length; i += 1) {
      testCategories[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await CategoryService.createCategory(testCategories[i]);
    }
    let returnedLists = await CategoryService.getAllCategories();
    assert.equal(returnedLists.length, testCategories.length);
    await CategoryService.deleteAllCategories();
    returnedLists = await CategoryService.getAllCategories();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant categories", async () => {
    try {
      const response = await CategoryService.deleteCategory("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });
});
*/
