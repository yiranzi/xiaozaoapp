## 组件说明
现在已封装组件列表

### audio
参数： idTag, audioUrl

### button
参数： text, bg, color, half, onClick

### card
参数： title, content

### checkbox
参数： name, defaultValue, options, disabled
options结构：[{value: value, label: label}]
defaultValue: 答案字符串ABC，没考虑答案是多个字符

### fixFooter
参数： content

### loading
撑满整个页面的遮罩

### more
超过line行折叠
参数： line, title, content

### motal
######　待补全

### radio
单选按钮

参数： params, onChange

params = {name, value, defaultValue, label, disabled}

### textarea
参数： placeholder, defaultValue, maxLength, onChange, disabled

### timedown 倒计时

参数： limitTime 分钟, timeDown倒计时结束后的回调方法

### timeup 正计时

### uploader 长传图片

参数： title, maxCount 最多上传多少张 默认最多10张

### textarea 文本输入框

参数： placeholder，maxLength，onChange回调