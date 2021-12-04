const router = require("express").Router();
const UserProfile = require("../database/models/userProfile");
const TenantProfile = require("../database/models/tenantProfile");

router.get("/", async (req, res) => {
  try {
    const users = await UserProfile.query().withGraphFetched("tenant");
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const users = await UserProfile.query()
      .findById(id)
      .withGraphFetched("tenant");
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { social_links, ...data } = req.body;
    const { tenant_id } = data;
    const tenant = await TenantProfile.query().findById(tenant_id);
    if (!tenant) res.status(404).send({ message: "Tenant not found!!" });
    const user = await UserProfile.query().insert({
      ...data,
      social_links: JSON.stringify(social_links),
    });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserProfile.query().findById(id);

    if (!user) res.status(400).send({ message: "User not found" });

    const { social_links, ...data } = req.body;
    const updatedUser = await UserProfile.query().insert({
      ...data,
      social_links: JSON.stringify(social_links),
    });
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(400).json(err);
  }
});

module.exports = router;
