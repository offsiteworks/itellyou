# data structure データ構造

## データ一覧

 * ユーザー(第1段階では作らない)
 * グループ(第1段階では作らない)
 * ビル
  * ロケーション
 * ホスト(データとして管理する必要ある？)
  * センサー
 * センサーログ

()は忍足コメント  
jsonで書かれても読めないから日本語でOK

(記入例) 

| No. | 項目名 | 項目物理名 | データ型 | 説明 | 備考 |
| ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
| 1 | ユーザID | user_id | 文字列 | ユーザID | 半角英数字のみ |
| 2 | ユーザ名 | name | 文字列 | ユーザ名 |  |

## コレクション: users ユーザー

まずユーザーありき。<br/>
ユーザーIDはユニークな英数字小文字のIDで決定します。

```
users: [
	{user_id: "user1", name: "西澤", desc: "",
	 epwd: "768hg",
	 mail_to: "xxx.xxx@xxx.com",
	 mail_certified: false,
	 type: "men",
	 groups: ["rs"],
	 created_by: "user1", created_at: "日付",
	 updated_by: "user1", updated_at: "日付",
	},
	{user_id: "rs", reserved_by: "groups"},
	{user_id: "mitsuba", reserved_by: "groups"},
	{user_id: "system", reserved_by: "system"},
]
```

## コレクション: groups グループ

ユーザーはログイン後、会社などのグループを作成します。<br/>
グループIDはユニークな英数字小文字のIDで決定します。<br/>
(ユーザーIDとグループIDの重複も許されません)<br/>
もしくは参加します。(公開か承認制)<br/>
グループを作成した人はグループ管理者となります。

```
groups: [
	{group_id: "rs", name: "両毛システムズ", desc: "",
	 group_type: "public",
	 admin_users: ["user1"],
	 created_by: "user1", created_at: "日付",
	 updated_by: "user1", updated_at: "日付",
	 buildings: [{building_id: "b1-1"}, {building_id: "b1-2"}],
	},
	{group_id: "mitsuba", name: "ミツバ", desc: "",
	 group_type: "public",
	 admin_users:[{user_id: "user1"}],
	 buildings: [{building_id: "b2-1"}],
	},
]
```

## buildings ビル/locations ロケーション/rooms ルーム

グループ管理者がビルを作成します。IDは自動生成。名前は入力する。<br/>
グループ管理者がビル内にロケーション(フロア等)を作成します。<br/>
グループ管理者がロケーション内にルームを作成します。

```
buildings: [
	{building_id: "b0i2w6wjjl-a76jg24", name: "RS本社ビル", desc: "",
	 group_id: "rs",
	 created_by: "user1", created_at: "日付",
	 updated_by: "user1", updated_at: "日付",
	 locations: [
		{location_id: "l0i2w6wjjl-b45jh45", name: "7F", desc: "",
		 light: 1,
		 rooms: [
			{room_id: "r0i2w6wjjl-e76jg29", name: "", desc: "",
			 type: "men",
			 door: 1,
			 created_at: "日付", updated_at: "日付",
			 },
		 ]},
	 ]},
	{building_id: "b0i2w6wjkl-c76jg27", name: "別館",desc: "",
	 group_id: "rs",
	 locations: [
	 ]},
	{building_id: "b0i2w6wjml-c76jz27", name: "ミツバ本社",desc: "",
	 group_id: "mitsuba",
	 locations: [
	 ]},
]
```

## コレクション: hosts ホスト/sensors センサー

ホスト(ボードコンピュータ)の名前を付けます。<br/>
可能なら最初から名前を付けておく。<br/>
ホストにユーザーIDでログインする<br/>
最初にホストとグループを割り当てる。<br/>
ここで設定したユーザーIDはホストに記憶される。

センサーを登録する。

```
hosts: [
	{host_id: "h0i2w6wjjl-d76jg24", name: "hostname1", desc: "",
	 group_id: "rs",
	 user_id: "user1",
	 sensors: [
		{sensor_id: "s701", name: "s701", desc: "",
		 sensor_type: "light",
		 building_id: "b0i2w6wjjl-a76jg24",
		 location_id: "l0i2w6wjjl-b45jh45",
		 room_id: "r0i2w6wjjl-e76jg29",
		 // または
		 path: "/rs/b0i2w6wjjl-a76jg24/loc1/r701",
		 created_at: "日付", updated_at: "日付",
		 },
		]
	},
]
```

## センサーログ

```
sensor_logs: [
	{sensor_id: "s701",
	 value: "1",
	 at: "日付"},
	// または
	{host_id: "h0i2w6wjjl-d76jg24",
	 path: "/rs/b0i2w6wjjl-a76jg24/l0i2w6wjjl-b45jh45/r0i2w6wjjl-e76jg29",
	 light: 0, door: 0,
	 at: "日付"},
]
```

## データアクセスURL

```
/users/nishizawa
/groups/rs/b0i2w6wjjl-a76jg24/
/groups/rs/b0i2w6wjjl-a76jg24/l0i2w6wjjl-b45jh45/
/groups/rs/b0i2w6wjjl-a76jg24/l0i2w6wjjl-b45jh45/r0i2w6wjjl-e76jg29
```

