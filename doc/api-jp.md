[home](../README.md#readme) -
[ドキュメント](index-jp.md#readme) -
[ファイル形式](format-jp.md#readme) -
[URL](url-jp.md#readme) -
[API](api-jp.md#readme)

# 標準API

HTTP/RESTに近い普通のAPIです。
情報を送信したり、受信したりする事を目的とします。

GETメソッド方式とPOSTメソッド方式に対応します。

GETメソッド方式は、引数に `?param1=value1&param2=value2` 形式で指定します。
結果はFORMATで指定した形式に従って返されます。

POSTメソッド方式は、ボディにJSON形式またはFORMATで指定した形式で指定します。
結果はFORMATで指定した形式に従って返されます。

基本は同期型でプル型の情報送受信機能を想定していますが、
非同期のプッシュ通知として、URLに '/wait' を追加して
ロングポーリング(long polling)方式に対応することを推奨します。

サーバー同志では、逆方向にプッシュ通知するためのAPIのURLを登録できます。

# 拡張API

標準APIではポーリングなどサーバが高負荷になる可能性があるため、
大量接続が可能となる、技術を使用したAPIです。

XMLHttpRequest(xhr)およびWebSocket(ws)を使用します。
JavaScript での利用を想定しているため socket.io を使用します。

- - -

[home](../README.md#readme) -
[ドキュメント](index-jp.md#readme) -
[ファイル形式](format-jp.md#readme) -
[URL](url-jp.md#readme) -
[API](api-jp.md#readme)
