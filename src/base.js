import Rebase from 're-base'
import firebase from 'firebase'

// ES5 若使用 CommonJS 標準，一般使用 require() 用法引入模組, 輸出則是使用 module.exports = xxx
// ES6+ import 用法, 輸出則是使用 export default

// firebase 初始化
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBujQ8K7shHzOdoo9QPht5opkFTg7mGU7w",
  authDomain: "catch-of-the-day-12fdc.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-12fdc.firebaseio.com"
})
// es5: React.createClass 是傳入一個物件，其屬性值可以是函數或值，換成 class 就可以直接宣告函數或變數，看起來比較直觀。
const base = Rebase.createClass(firebaseApp.database())

// This is a name export
// 這是導出
// ES6 的模組若要公開名稱，可以使用 export，必須注意的是，為了表示公開的是名稱，必須使用 {} 包含，就算只有一個名稱要公開也是一樣
// 這樣的 export 稱為 Named Export，你不可以這麼撰寫： export firebaseApp
// 相對地，在 import 時也必須使用 {} 表示要匯入的是名稱，就算只有匯入一個名稱： import {firebaseApp} from './base.js'
export {firebaseApp}

// This is a default export
// 這是默認導出
// https://openhome.cc/Gossip/ECMAScript/Export.html
export default base
