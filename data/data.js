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
        location_id: "loc-123",
        name: "2F男用",
        rooms: [{
          room_id: "room-876",
          name: "1",
          status: 0,
        }, {
          room_id: "room-879",
          name: "2",
          status: 1,
        }],
      }],
    }, {
      site_id: "site-12346",
      name: "別館",
      locations: [{
        location_id: "loc-124",
        name: "3F男用",
        rooms: [{
          room_id: "room-877",
          name: "A",
          status: 0,
        }, {
          room_id: "room-880",
          name: "B",
          status: 1,
        }],
      }],
    }],
  }],
}
