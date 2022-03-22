import { assert } from "chai";
import { db } from "../../src/models/db.js";
// eslint-disable-next-line import/named
import { testPlaceMarks, Woodlands, Swamp, FreshWater, testUsers, testCategories } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Place Model tests", () => {
  let AnimalPlaceList = null;
  let testUsersList = null;

  setup(async () => {
    db.init("mongo");
    await db.CategoryStore.deleteAllCategories();
    await db.placeMarkStore.deleteAllPlaceMarks();
    AnimalPlaceList = await db.CategoryStore.addCategory(Woodlands);
    for (let i = 0; i < testPlaceMarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlaceMarks[i] = await db.placeMarkStore.addPlaceMark(AnimalPlaceList._id, testPlaceMarks[i]);
    }
  });

  test("testing User", async () => {
    await db.userStore.getAllUsers();
    testUsersList = await db.userStore.addUser(testUsers);
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testUsers[i] = await db.userStore.addUser(testUsersList._id, testUsers[i]);
      console.log(testUsers);
    }
  });

  test("create single place", async () => {
    const reptileList = await db.CategoryStore.addCategory(Swamp);
    const placemark = await db.placeMarkStore.addPlaceMark(reptileList._id, FreshWater);
    assert.isNotNull(placemark._id);
    assertSubset(FreshWater, placemark);
  });

  test("get multiple placemarks", async () => {
    const places = await db.placeMarkStore.getPlaceMarksByCategoryId(AnimalPlaceList._id);
    assert.equal(testPlaceMarks.length, testPlaceMarks.length);
  });

  test("delete all placemarks", async () => {
    const placemarks = await db.placeMarkStore.getAllPlaceMarks();
    assert.equal(testPlaceMarks.length, placemarks.length);
    await db.placeMarkStore.deleteAllPlaceMarks();
    const newPlaceMarks = await db.placeMarkStore.getAllPlaceMarks();
    assert.equal(0, newPlaceMarks.length);
  });
  test("get a placemark - success", async () => {
    const reptileList = await db.CategoryStore.addCategory(Swamp);
    const placemark = await db.placeMarkStore.addPlaceMark(reptileList._id, FreshWater);
    const newPlaceMark = await db.placeMarkStore.getPlaceMarkById(placemark._id);
    assertSubset(FreshWater, newPlaceMark);
  });

  test("delete One PlaceMark - success", async () => {
    await db.placeMarkStore.deletePlaceMark(testPlaceMarks[0]._id);
    const placemarks = await db.placeMarkStore.getAllPlaceMarks();
    assert.equal(placemarks.length, testCategories.length - 1);
    const deletedPlaceMarks = await db.placeMarkStore.getPlaceMarkById(testPlaceMarks[0]._id);
    assert.isNull(deletedPlaceMarks);
  });

  test("get a placemark - bad params", async () => {
    assert.isNull(await db.placeMarkStore.getPlaceMarkById(""));
    assert.isNull(await db.placeMarkStore.getPlaceMarkById());
  });

  test("delete one placemark - fail", async () => {
    await db.placeMarkStore.deletePlaceMark("bad-id");
    const placemarks = await db.placeMarkStore.getAllPlaceMarks();
    assert.equal(placemarks.length, testCategories.length);
  });
});
