[home](../README.md#readme) -
[ドキュメント](index-jp.md#readme) -
[ファイル形式](format-jp.md#readme) -
[URL](url-jp.md#readme) -
[API](api-jp.md#readme)

# URL

URLは以下の形式です。

`/APP/API/VERSION/INTERFACE.FORMAT?ARGUMENTS#HASH`

|項目       |req|説明|例  |備考|
|-----------|---|----|----|----|
|/APP       |req|アプリケーション名|/itellyou        |アプリで固定     |
|/API       |req|APIを表す         |/api             |固定             |
|/VERSION   |req|バージョン番号    |/v0.0            |メジャー.マイナー|
|/INTERFACE |req|インターフェース名|/                |名詞形           |
|.FORMAT    |opt|形式              |.json            |省略時は.json    |
|?ARGUMENTS |opt|引数              |?g=rs&b=main&f=2 |必要時           |
|#HASH      |opt|ハッシュタグ      |                 |必要時           |

## /APP/API/VERSION

`/itellyou/api/v0.x` など、ほぼ固定で指定します。

マイナーバージョンには `x` が指定でき、最新を意味します。

## /INTERFACE

`/messages` や `/users` など、取得したいリソースの名前(複数形)を候補とします。

`/users/new` や `/users/edit` や `/messages/wait` なども候補とします。

## .FORMAT

省略時は `.json` とします。

その他、`.html`, `.ltsv` をサポートする事を推奨します。

## ?ARGUMENTS

`?g=rs&b=main&f=2` は `{"g":"rs", "b": "main", "f": "2"}` と変換され渡されます。

ボディ部分は別なオブジェクトで渡されます。

## #HASH

ハッシュタグの使用は任意です。

- - -

[home](../README.md#readme) -
[ドキュメント](index-jp.md#readme) -
[ファイル形式](format-jp.md#readme) -
[URL](url-jp.md#readme) -
[API](api-jp.md#readme)
