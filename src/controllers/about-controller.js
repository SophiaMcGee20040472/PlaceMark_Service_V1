export const aboutController = {
  // About Method to control view output.
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About PlaceMarks",
      };
      return h.view("about-view", viewData);
    },
  },
};
