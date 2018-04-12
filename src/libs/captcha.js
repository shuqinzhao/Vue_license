/**
 * Captcha.js
 * @description 简单的基于 canvas 的验证码生成器
 * @version 0.0.1
 * @author changming.huang@woqutech.com
 */


/*
  * set width and height default value
  */
 var G_WIDTH = 90
 var G_HEIGHT = 30
 var G_LENGTH = 4
 
 /*
   * get random float value amount [start, end)
   */
 var randFloat = function (start, end) {
   return start + Math.random() * (end - start)
 }
 
 /*
   * get random integer value amount [start, end)
   */
 var randInt = function (start, end) {
   return Math.floor(Math.random() * (end - start)) + start
 }
 
 /*
   * get canvas object
   */
 var getCanvas = function (w, h) {
   var canvas = document.createElement('canvas')
   canvas.setAttribute('width', w)
   canvas.setAttribute('height', h)
 
   return canvas
 }
 
 var captchajs = function (w, h) {
   var W = w ? w : G_WIDTH
   var H = w ? h : G_HEIGHT
 
   var canvas = getCanvas(W, H)
   var ctx = canvas.getContext('2d')
   var items = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPRSTUVWXYZ23456789'.split('')
   var vcode = ''
 
   // 背景
   ctx.fillStyle = '#f3fbfe'
   ctx.fillRect(0, 0, W, H)
   ctx.globalAlpha = 0.8
   ctx.font = '15px sans-serif'
   for (var i = 0; i < 10; i++) {
     ctx.fillStyle = 'rgb(' + randInt(150, 225) + ',' + randInt(150, 225) + ',' + randInt(150, 225) + ')'
     for (var j = 0; j < 5; j++) {
       ctx.fillText(items[randInt(0, items.length)], randFloat(-10, W + 10), randFloat(-10, H + 10))
     }
   }
 
   // 验证码
   var textOffsetX = 2
   var textWidth = W / G_LENGTH
   var textMaxWidth = textWidth - textOffsetX * 2
   var textY = H - 4 / 2
   var color = 'rgb(' + randInt(1, 120) + ',' + randInt(1, 120) + ',' + randInt(1, 120) + ')'
   ctx.font = 'bold 30px sans-serif'
   for (var I = 0; I < G_LENGTH; I++) {
     var J = randInt(0, items.length)
     ctx.fillStyle = color
     ctx.fillText(items[J], textOffsetX + textWidth * I, textY, textMaxWidth)
     var a = randFloat(1.0, 1.0) // 水平缩放
     var b = randFloat(-0.03, 0.03) // 水平倾斜
     var c = randFloat(-0.03, 0.03) // 垂直倾斜
     var d = randFloat(0.85, 1.0) // 垂直缩放
     var e = 0 // 水平移动
     var f = 0 // 垂直移动
     ctx.transform(a, b, c, d, e, f)
     vcode += items[J]
   }
 
   // 干扰线
   ctx.beginPath()
   ctx.strokeStyle = color
   var A = randFloat(10, H / 2)
   var B = randFloat(H / 4, 3 * H / 4)
   var F = randFloat(H / 4, 3 * H / 4)
   var T = randFloat(H * 1.5, W)
   var y = 2 * Math.PI / T
   var s = function (x) {
     return A * Math.sin(y * x + F) + B
   }
   ctx.lineWidth = 3
   for (var x = -20; x < 200; x += 4) {
     ctx.moveTo(x, s(x))
     ctx.lineTo(x + 3, s(x + 3))
   }
   ctx.closePath()
   ctx.stroke()
 
   return {
     code: vcode.toLowerCase(),
     dataURL: canvas.toDataURL(),
   }
 }
 
 // bind to windowdow
 if (!window.captchajs) {
   window.captchajs = captchajs
 }
 
 
 export default captchajs
 