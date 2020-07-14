const handphoneModel = require('../model/Handphone')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId
const { deleteImage } = require('../uploadConfig')

exports.insertHandphone = (data) =>
  new Promise((resolve, reject) => {
    handphoneModel.create(data)
    .then(() => resolve(requestResponse.sukses('Berhasil Input Handphone')))
    .catch(() => reject(requestResponse.serverError))
  })

exports.getAllHandphone = () =>
    new Promise((resolve, reject) => {
      handphoneModel.find({})
        .then(handphone => resolve(requestResponse.suksesWithData(handphone)))
        .catch(error => reject(requestResponse.serverError))
    })

exports.getbyId = (id) =>
    new Promise((resolve, reject) => {
      handphoneModel.findOne({
        _id: objectId(id)
      }).then(handphone => resolve(requestResponse.suksesWithData(handphone)))
      .catch(error => reject(requestResponse.serverError))
    })

exports.edit = (data, id, changeImage) =>
    new Promise((resolve, reject) => {
      handphoneModel.updateOne({
        _id: objectId(id)
      }, data)
        .then(() => {
          if (changeImage) {
            deleteImage(data.oldImage)
          }
          resolve(requestResponse.sukses('Berhasil Edit Handphone'))
        }).catch(() => reject(requestResponse.serverError))
    })

exports.delete = (id) =>
  new Promise((resolve, reject) => {
    handphoneModel.findOne({
      _id: objectId(id)
    }).then(Handphone => {
      handphoneModel.deleteOne({
        _id: objectId(id)
      }).then(() => {
        deleteImage(Handphone.image)
        resolve(requestResponse.sukses('Berhasil Delete Handphone'))
      }).catch(() => reject(requestResponse.serverError))
    })
  })