/*
import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { CategoryService } from "./placemark-service.js";
import { maggie, maggieCredentials, FreshWater, testCategories, testPlaceMarks, Swamp } from "../fixtures.js";

suite("PlaceMark API tests", () => {
  let user = null;
  let PlaceMarkList = null;

  setup(async () => {
    CategoryService.clearAuth();
    user = await CategoryService.createUser(maggie);
    await CategoryService.authenticate(maggieCredentials);
    await CategoryService.deleteAllPlaceMarks();
    await CategoryService.deleteAllPlaceMarks();
    await CategoryService.deleteAllUsers();
    user = await CategoryService.createUser(maggie);
    await CategoryService.authenticate(maggieCredentials);
    FreshWater.userid = user._id;
    PlaceMarkList = await CategoryService.createPlaceMark(FreshWater);
  });

  teardown(async () => {});

  test("create placemark", async () => {
    const returnedPlaceMark = await CategoryService.createPlaceMark(PlaceMarkList._id, Swamp);
    assertSubset(Swamp, returnedPlaceMark);
  });

  test("create Multiple placemarks", async () => {
    for (let i = 0; i < testPlaceMarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await CategoryService.createPlaceMark(PlaceMarkList._id, testPlaceMarks[i]);
    }
    const returnedPlaceMarks = await CategoryService.getAllCategories();
    assert.equal(returnedPlaceMarks.length, testPlaceMarks.length);
    for (let i = 0; i < returnedPlaceMarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const placemark = await CategoryService.getPlaceMark(returnedPlaceMarks[i]._id);
      assertSubset(placemark, returnedPlaceMarks[i]);
    }
  });

  test("Delete PlaceMarkApi", async () => {
    for (let i = 0; i < testPlaceMarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await CategoryService.createPlaceMark(PlaceMarkList._id, testPlaceMarks[i]);
    }
    let returnedPlaceMarks = await CategoryService.getAllPlaceMarks();
    assert.equal(returnedPlaceMarks.length, testPlaceMarks.length);
    for (let i = 0; i < returnedPlaceMarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const placemark = await CategoryService.deletePlaceMark(returnedPlaceMarks[i]._id);
    }
    returnedPlaceMarks = await CategoryService.getAllCategories();
    assert.equal(returnedPlaceMarks.length, 0);
  });

  test("denormalised category", async () => {
    for (let i = 0; i < testPlaceMarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await CategoryService.createPlaceMark(PlaceMarkList._id, testPlaceMarks[i]);
    }
    const returnedCategory = await CategoryService.getCategory(PlaceMarkList._id);
    assert.equal(returnedCategory.placemarks.length, testPlaceMarks.length);
    for (let i = 0; i < testPlaceMarks.length; i += 1) {
      assertSubset(testPlaceMarks[i], returnedCategory.placemarks[i]);
    }
  });
});
*/
