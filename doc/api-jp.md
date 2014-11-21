[形式](format-jp.md#readme) -
[URL](url-jp.md#readme) -
[API](api-jp.md#readme)

# 標準API

HTTP/RESTに近い普通のAPIです。
情報を送信したり、受信したりする事を目的とします。

GETメソッド方式とPOSTメソッド方式に対応します。

GETメソッド方式は、引数に `param1=value1&param2=value2` 形式で指定します。
結果はFORMATで指定した形式に従って返されます。

POSTメソッド方式は、ボディにJSON形式またはFORMATで指定した形式で指定します。
結果はFORMATで指定した形式に従って返されます。

非同期のプッシュ通知として、URLに '/wait' ロングポーリング(long polling)方式を推奨します。

サーバー同志では、逆方向にプッシュ通知するためのAPIのURLを登録できます。

# 拡張API

XMLHttpRequest(xhr)およびWebSocket(ws)を使用します。
JavaScript での利用を想定しているため socket.io を使用します。

- - -

[形式](format-jp.md#readme) -
[URL](url-jp.md#readme) -
[API](api-jp.md#readme)
