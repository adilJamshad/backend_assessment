const router = require("express").Router();
const userRouter = require("./userRouter");
const tenantRouter = require("./tenantRouter");

router.use("/users", userRouter);
router.use("/tenants", tenantRouter);

module.exports = router;
