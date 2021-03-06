# クライアントがサーバへ要求するインタフェース

## トランザクション一覧

| No | トランザクション名 | 概要 |
| --- | --- | --- |
| 1 | サイト一覧取得 (グループ取得) | 表示可能なサイトの一覧を取得する。 |
| 2 | 最新空き状況取得 | 指定したサイトの最新の空き状況を取得する。 一括取得と、PUSHで差分取得がある。|

## サイト一覧取得 (グループ取得)

### 概要

表示可能なサイトの一覧を取得する。

※電文構成の理由：レスポンスを早くすため、および、実装を楽にするため。データ量などや通信量の無駄があるが、電文のピンポンを減らすために、妥協しています。ご了承ください。問題が出てくれば後で改良しましょう。

### 要求データ

| No | 項目 | 物理名 | 概要 |
| --- | --- | --- | --- |
| 1 | グループID | group_id |  "rs" 固定 (将来の実装用) |

### 応答データ

グループ

| No | 項目 | 物理名 | 概要 |
| --- | --- | --- | --- |
| 1 | グループID | group_id | グループの識別子 |
| 2 | グループ名 | name | グループの名称 |
| 3 | サイト一覧 | sites | サイトの配列 |

サイト

| No | 項目 | 物理名 | 概要 |
| --- | --- | --- | --- |
| 1 | サイトID | site_id | サイトの識別子 |
| 2 | サイト名 | name | サイトの名称 |
| 3 | ロケーション一覧 | locations | ロケーションの配列 |

ロケーション

| No | 項目 | 物理名 | 概要 |
| --- | --- | --- | --- |
| 1 | ロケーションID | location_id | ロケーションの識別子 |
| 2 | ロケーション名 | name | ロケーションの名称 |
| 3 | 部屋一覧 | rooms | 部屋の配列 |

部屋

| No | 項目 | 物理名 | 概要 |
| --- | --- | --- | --- |
| 1 | 部屋ID | room_id | 部屋の識別子 |
| 2 | 部屋名 | name | 部屋の名称 |
| 3 | 状態 | status | 0:空き, 1:使用中 |
| 4 | データ更新日時 | updated_at | 状態の最終更新日時 |

## 最新空き状況取得

### 概要

指定したサイトの最新の空き状況を取得する。

### 要求データ

| No | 項目 | 概要 |
| --- | --- | --- |
| 1 | サイトID |  |
| 2 | 通知方式 | "pull":全件を即時一括取得。"push":差分をPUSH通知で取得。|

### 応答データ

| No | 項目 | 概要 |
| --- | --- | --- |
| 1 | 部屋状態一覧 | 状態の配列 |

部屋状態

| No | 項目 | 概要 |
| --- | --- | --- |
| 1 | 部屋ID | 部屋の識別子 |
| 2 | 部屋名 | 部屋の名称 |
| 3 | 状態 | 0:空き。1:使用中 |
| 4 | データ更新日時 | 状態の更新日時 |

