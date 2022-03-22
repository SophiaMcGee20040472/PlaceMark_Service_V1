import { assert } from "chai";
import { db } from "../../src/models/db.js";
// eslint-disable-next-line import/named
import { FreshWater, testCategories } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Category Model tests", () => {
  setup(async () => {
    db.init("mongo");
    await db.CategoryStore.deleteAllCategories();
    for (let i = 0; i < testCategories.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testCategories[i] = await db.CategoryStore.addCategory(testCategories[i]);
    }
  });

  test("create a category", async () => {
    const category = await db.CategoryStore.addCategory(FreshWater);
    assertSubset(FreshWater, category);
    assert.isDefined(category._id);
  });

  test("delete all categories", async () => {
    let returnedCategories = await db.CategoryStore.getAllCategories();
    assert.equal(returnedCategories.length, 3);
    await db.CategoryStore.deleteAllCategories();
    returnedCategories = await db.CategoryStore.getAllCategories();
    assert.equal(returnedCategories.length, 0);
  });

  test("get a category - success", async () => {
    const category = await db.CategoryStore.addCategory(FreshWater);
    const returnedCategory = await db.CategoryStore.getCategoriesById(category._id);
    assertSubset(FreshWater, category);
  });

  test("delete One Category - success", async () => {
    const id = testCategories[0]._id;
    await db.CategoryStore.deleteCategoryById(id);
    const returnedCategories = await db.CategoryStore.getAllCategories();
    assert.equal(returnedCategories.length, testCategories.length - 1);
    const deletedCategory = await db.CategoryStore.getCategoriesById(id);
    assert.isNull(deletedCategory);
  });

  test("get a Category - bad params", async () => {
    assert.isNull(await db.CategoryStore.getCategoriesById(""));
    assert.isNull(await db.CategoryStore.getCategoriesById());
  });

  test("delete One Category - fail", async () => {
    await db.CategoryStore.deleteCategoryById("bad-id");
    const allCategories = await db.CategoryStore.getAllCategories();
    assert.equal(testCategories.length, allCategories.length);
  });
});
