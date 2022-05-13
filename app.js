// 基本設定
const express = require('express')
const app = express()
const port = 3000

// 載入 handlebars
const exphbs = require('express-handlebars')

// 載入外部資料
const restaurantsData = require('./restaurant.json')

// set handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// 使用靜態資料
app.use(express.static('public'))

// 主頁面
app.get('/', (req,res) => {
  res.render('index', {restaurantsData: restaurantsData.results})
})

// 個別餐廳介紹頁面
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantsData.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', {restaurantData: restaurant})
})

// 啟動 server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})