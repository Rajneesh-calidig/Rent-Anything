import express from 'express'
import authRouter from '../routes/auth/auth.route.js'
import itemRouter from "../routes/items/items.route.js"
import itemRoutes from '../routes/admin/itemRoutes.js'
import userRoutes from '../routes/admin/userRoutes.js'
import reviewRoutes from '../routes/admin/reviewRoutes.js'
import statsRouter from '../routes/admin/stats.js'
import rentalRouter from "../routes/rental/rental.route.js"
import reviewRouter from "../routes/review/review.route.js"
import paymentRoute from "../routes/payment/payments.routes.js"
import userRouter from "../routes/user/user.route.js"
import adminRouter from "./admin/admin.route.js"
const router = express.Router()

router.use('/auth',authRouter)
router.use('/admin/items',itemRoutes)
router.use('/admin/user',userRoutes)
router.use('/admin/reviews',reviewRoutes)
router.use('/admin/stats',statsRouter)
router.use('/user',userRouter)
router.use('/items',itemRouter)
router.use('/rental',rentalRouter)
router.use('/review',reviewRouter)
router.use("/payment",paymentRoute)
router.use("/admin",adminRouter)

export default router;