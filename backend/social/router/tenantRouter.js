const router = require("express").Router();
const TenantProfile = require("../database/models/tenantProfile");

router.get("/", async (req, res) => {
  try {
    const tenants = await TenantProfile.query().withGraphFetched("users");
    res.json(tenants);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tenants = await TenantProfile.query()
      .findById(id)
      .withGraphFetched("users");
    res.json(tenants);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { address, ...data } = req.body;
    const tenant = await TenantProfile.query().insert({
      ...data,
      address: JSON.stringify(address),
    });
    res.json(tenant);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { address, ...data } = req.body;

    const tenant = await TenantProfile.query().findById(id);
    if (!tenant) {
      res.status(404).send({ message: "Tenant is not found" });
    }
    const updatedTenant = await TenantProfile.query().updateAndFetchById(id, {
      ...data,
      address: JSON.stringify(address),
    });
    res.json(updatedTenant);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tenant = await TenantProfile.query().findById(id);
    if (!tenant) {
      res.status(404).send({ message: "Tenant is not found" });
    }
    const updatedTenant = await TenantProfile.query().deleteById(id);
    res.json(updatedTenant);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
