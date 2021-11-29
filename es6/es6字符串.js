//ES6字符串的新增方法

/**
 * String.fromCharCode()方法可以实现把码点转成字符打印,
 * 比如String.fromCharCode(0x0061)，
 * 控制台会输出a，但是fromCharCode只能对不大于0xFFFF的码点才有效
 */
var chinese = String.fromCodePoint(0x4e2d,0x56fd)
var unicode = String.fromCharCode(0x20BB7);
console.log(chinese)
console.log(unicode)

console.log(String.raw`\a\a\a\a\a\a\a\a\a`)

//字符串重复输出
let test = 'test+'
test = test.repeat(10)
console.log(test)

//字符串补全
test = '中国'
//两个参数，第一个参数是补全后的字符长度，第二个是用来补全的字符
//字符头进行补全
console.log(test.padStart(10, '+'))
//一个中文字符占一个长度
console.log(test.padEnd(10, '+'))
//参数小于原字符长度则返回原字符串
console.log(test.padEnd(1, '+'))

//消除字符串空格
test = '    test    '
//消除末尾
console.log(test.trimEnd())
//消除头部
console.log(test.trimStart())



