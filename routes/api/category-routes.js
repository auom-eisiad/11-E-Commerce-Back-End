const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [{ model: Product }],
  })
    .then((catData) => res.status(200).json(catData))
    .catch((err) => res.status(500).json(err));
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: [{ model: Product }],
  })
    .then((catData) => {
      if (!catData) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
      res.status(200).json(catData);
    })
    .catch((err) => res.status(500).json(err));
});

router.post('/', async (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((catData) => res.status(201).json(catData))
    .catch((err) => res.status(400).json(err));
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((catData) => {
      if (!catData[0]) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
      res.status(200).json({ message: 'Category updated successfully!' });
    })
    .catch((err) => res.status(500).json(err));
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((catData) => {
      if (!catData) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
      res.status(200).json({ message: 'Category deleted successfully!' });
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;