const router = require('express').Router()
const HandphoneController = require('../controller/Handphone')
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

  HandphoneController.insertHandphone(data)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.get('/getall', (req, res) => {
  HandphoneController.getAllHandphone()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.get('/getbyid/:id', (req, res) => {
  HandphoneController.getbyId(req.params.id)
    .then((result) => res.json(result))
    .catch(err => res.json(err))
})

router.put('/edit/:id/', fields,(req, res) => {
  const imageName = uploadSetting.cekNull(req.files['image'])
  let data = JSON.parse(req.body.data)
  let changeImage = false
  if (imageName) {
    changeImage = true
    data = Object.assign(data, {
      image: imageName,
      oldImage: data.image
    })
  }

  HandphoneController.edit(data, req.params.id, changeImage)
    .then(result => res.json(result))
    .catch(err => {
      res.json(err)
    })
})

router.delete('/delete/:id', (req, res) => {
  HandphoneController.delete(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

module.exports = router