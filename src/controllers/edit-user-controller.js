export const editUserController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "Edit PlaceMarks User info",
      };
      return h.view("editUser", viewData);
    },
  },
};
