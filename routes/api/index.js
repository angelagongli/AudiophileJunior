const router = require("express").Router();
const userRoutes = require("./users");
const subuserRoutes = require("./subusers");

router.use("/users", userRoutes);
router.use("/subusers", subuserRoutes);

module.exports = router;
