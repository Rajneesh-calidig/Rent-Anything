import express from 'express'
import authRouter from '../routes/auth/auth.route.js'
import itemRouter from "../routes/items/items.route.js"
import rentalRouter from "../routes/rental/rental.route.js"
import reviewRouter from "../routes/review/review.route.js"

const router = express.Router()

router.use('/auth',authRouter)
router.use('/item',itemRouter)
router.use('/rental',rentalRouter)
router.use('/review',reviewRouter)

export default router;