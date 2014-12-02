module.exports = {
  users: [{
    user_id: "rsuser",
    name: "ユーザー",
  }],
  groups: [{
    group_id: "rs",
    name: "両毛システムズ",
    sites: [{
      site_id: "site-12345",
      name: "RS本社ビル",
      locations: [{
        location_id: "loc-301",
        name: "3F男用",
        rooms: [{
          room_id: "room-311",
          name: "1",
          status: 0,
        }, {
          room_id: "room-312",
          name: "2",
          status: 1,
        }],
      }, {
        location_id: "loc-201",
        name: "2F男用",
        rooms: [{
          room_id: "room-211",
          name: "1",
          status: 0,
        }, {
          room_id: "room-212",
          name: "2",
          status: 1,
        }],
      }],
    }, {
      site_id: "site-12346",
      name: "別館",
      locations: [{
        location_id: "loc-501",
        name: "5F男用",
        rooms: [{
          room_id: "room-511",
          name: "A",
          status: 0,
        }, {
          room_id: "room-512",
          name: "B",
          status: 1,
        }],
      }],
    }],
  }],
}
