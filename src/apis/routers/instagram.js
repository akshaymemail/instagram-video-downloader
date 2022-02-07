import express from 'express'
import isRequestValid from '../../utils/expressValidator.js'
import { getLinkValidator } from '../../validators/instagram.js'
import { getLinkController } from '../controllers/instagram.js'

const Instagram = express.Router()

Instagram.post('/get-link', getLinkValidator, isRequestValid, getLinkController)

export default Instagram
