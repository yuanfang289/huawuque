# 数字code转换成文本

## 示例

```js
export default function parsePayType(code) {
    const textArray = {
        '1': '个人支付',
        '2': '企业支付'
    }
    return textArray[code]
}
```
