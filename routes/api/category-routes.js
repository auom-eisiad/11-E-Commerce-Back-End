const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// Get all categories with their associated products
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get one category by its `id` value with associated products
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!category) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new category with associated products
router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body, {
      include: [{ model: Product }],
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
});

// Update a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedCategory) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    res.status(200).json({ message: "Category updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedCategory) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    res.status(200).json({ message: "Category deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
