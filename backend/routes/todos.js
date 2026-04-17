const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

// @route   GET /api/todos
// @desc    Get all user todos
// @access  Private
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/todos
// @desc    Create a new todo
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Please add a text field' });
    }

    const todo = await Todo.create({
      title,
      description,
      priority,
      user: req.user.id
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/todos/:id
// @desc    Update a todo
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Check for user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/todos/:id
// @desc    Delete a todo
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Check for user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await todo.deleteOne();
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
