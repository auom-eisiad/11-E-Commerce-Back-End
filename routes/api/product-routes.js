const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// Get all products with their associated Category and Tag data
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get one product by its `id` value with associated Category and Tag data
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });

    if (!product) {
      res.status(404).json({ message: "No product found with this id!" });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new product
router.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);

    // If there are product tags, create pairings in the ProductTag model
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagId = req.body.tagIds.map((tagId) => ({
        product_id: newProduct.id,
        tag_id: tagId,
      }));
      await ProductTag.bulkCreate(productTagId);
    }

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Bad Request" });
  }
});

// Update a product by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the product exists
    const existingProduct = await Product.findByPk(id);

    if (!existingProduct) {
      res.status(404).json({ message: "No product found with this id!" });
      return;
    }

    // Update the product
    await Product.update(req.body, {
      where: {
        id: id,
      },
    });

    // Fetch the updated product
    const updatedProduct = await Product.findByPk(id);

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a product by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedProduct) {
      res.status(404).json({ message: "No product found with this id!" });
      return;
    }

    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
