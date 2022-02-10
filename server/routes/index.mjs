import express from "express";
import userRoutes from './users.mjs'
import taskRoutes from './tasks.mjs'
import authRoutes from './auth.mjs'

const router = express.Router();

/** GET /api-status - Check service status **/
router.get("/api-status", (req, res) =>
    res.json({
        status: "ok",
    })
);
router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);
router.use('/auth', authRoutes);
export default router;
