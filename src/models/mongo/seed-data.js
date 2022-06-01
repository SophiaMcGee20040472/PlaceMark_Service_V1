export const seedData = {
  users: {
    _model: "User",
    homer: {
      admin: true,
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "$2a$10$HnapEWWKQQ0.0Ft33nXxtuJ0fsmd9ywYswEzT4C.6Ul5y6cOU.UEa",
      _id: "621f2bf90f8832d1b1b3630a",
      __v: 0,
    },
    marge: {
      admin: false,
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "$2a$10$D3TWK8MSAh63Lhk4gIFSJ.ekM368J88qJRUYSbuBfzffex6B0dFwK",
      _id: "621f2bf90f8832d1b1b3630c",
      __v: 0,
    },
    bart: {
      admin: false,
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "$2a$10$uqnPlgyVjBEOtcgMhn/WRO3FwW4T9gX36tTB4RqpGeB/LkCR3YQuO",
      _id: "621f2bf90f8832d1b1b3630e",
      __v: 0,
    },
  },
  categories: {
    _model: "Category",
    category1: {
      seeded: true,
      title: "Desert",
      userid: "111111111111",
      __v: 0,
    },
    category2: {
      seeded: true,
      title: "Forest",
      userid: "222222222222",
      __v: 0,
    },
    category3: {
      seeded: true,
      title: "Grassland",
      userid: "333333333333",
      __v: 0,
    },
    category4: {
      seeded: true,
      title: "Aquatic",
      userid: "444444444444",
      __v: 0,
    },
    category5: {
      seeded: true,
      title: "Woodlands",
      userid: "555555555555",
      __v: 0,
    },
    category6: {
      seeded: true,
      title: "Arctic",
      userid: "666666666666",
      __v: 0,
    },
  },
};
