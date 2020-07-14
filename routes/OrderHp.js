const router = require('express').Router()
const orderHpController = require('../controller/OrderHp')
const uploadSetting = require('../uploadConfig')
const fields = uploadSetting.upload.fields([
    {
      name: 'image',
      maxCount: 1
    }
  ])

router.post('/insert', fields, (req, res) => {
  const imageName = uploadSetting.cekNull(req.files['image'])
  
  const data = Object.assign(JSON.parse(req.body.data), {
    image: imageName
  })

  orderHpController.insert(data)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.get('/getallorderhp', (req, res) => {
  orderHpController.getAllOrder()
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.get('/getorderbyuser/:id', (req, res) => {
  orderHpController.getOrderByUser(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.put('/konfirmasiorder/:id', (req, res) => {
  orderHpController.konfirmasiOrder(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.put('/terimabarang/:id', (req, res) => {
  orderHpController.terimaBarang(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

module.exports = router