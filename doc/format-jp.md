[home](../README.md#readme) -
[ドキュメント](index-jp.md#readme) -
[ファイル形式](format-jp.md#readme) -
[URL](url-jp.md#readme) -
[API](api-jp.md#readme)

# ファイル形式

## JSON形式

通信プロトコル内のファイル形式は、JSON形式を基本とします。

属性の命名規約として、`camelCase` や `snake_case` や `chain-case` などがあります。

JavaScript でのアクセスのし易さから、`chain-case` を除外すると、
`camelCase` または `snake_case` となり、DBの項目名に `snake_case` がよく使用されるるため
`snake_case` を採用します。

Javaなど言語によっては `camelCase` との間で相互変換する必要が出てくるが、
相互変換できなくなる事態を避けるため単語の先頭に数字等を使用しないルールとします。

### JSON形式の例 (text/json)

```
[{"relay": "relay1", "term": "host1", "sensor": 1, "bright": 1, "door": 1, "date_time": "2014/11/21 14:10:23.234"},
 {"relay": "relay1", "term": "host1", "sensor": 2, "bright": 1, "door": 0, "date_time": "2014/11/21 14:10:23.245"}]
```

## LTSV形式 (text/ltsv)

LTSV形式を2番目の候補とします。

属性の命名規約は `snake_case` とします。

### LTSV形式の例

```
term:host1	sensor:1	bright:1	door:1	date_time:2014/11/21 14:10:23.234
term:host1	sensor:2	bright:1	door:0	date_time:2014/11/21 14:10:23.245
```

## HTML形式 (text/html)

表示するだけの場合、サーバーで生成したHTML形式も実装可能とします。

## TSV, CSV 他

TSV や CSV では必ず先頭行に、属性名のリストを送出する事をルールとします。

その他必要に応じて他のファイル形式に対応します。

### TSV形式の例 (text/tab-separated-values)

```
term	sensor	bright	door	date_time
host1	1	1	1	2014/11/21 14:10:23.234
host1	2	1	0	2014/11/21 14:10:23.245
```

### CSV形式の例 (text/csv, text/comma-separated-values)

```
term,sensor,bright,door,date_time
host1,1,1,1,2014/11/21 14:10:23.234
host1,2,1,0,2014/11/21 14:10:23.245
```

※注意：データ内にコンマがある場合についてはrfc4180を参照

- - -

[home](../readme-jp.md#readme) -
[ドキュメント](index-jp.md#readme) -
[ファイル形式](format-jp.md#readme) -
[URL](url-jp.md#readme) -
[API](api-jp.md#readme)
