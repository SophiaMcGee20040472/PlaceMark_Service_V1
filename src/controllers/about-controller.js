export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About PlaceMarks",
      };
      return h.view("about-view", viewData);
    },
  },
};
