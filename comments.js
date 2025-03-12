// Create web server
var express = require('express');
var app = express();
var fs = require('fs');

// Load comments from file
var comments = JSON.parse(fs.readFileSync('comments.json'));

// Create a new comment
app.post('/comments', function(req, res) {
  var newComment = req.body;
  comments.push(newComment);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.send('Comment added');
});

// Get all comments
app.get('/comments', function(req, res) {
  res.send(comments);
});

// Get a comment by ID
app.get('/comments/:id', function(req, res) {
  var id = req.params.id;
  var comment = comments[id];
  if (comment) {
    res.send(comment);
  } else {
    res.status(404).send('Comment not found');
  }
});

// Update a comment
app.put('/comments/:id', function(req, res) {
  var id = req.params.id;
  var updatedComment = req.body;
  comments[id] = updatedComment;
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.send('Comment updated');
});

// Delete a comment
app.delete('/comments/:id', function(req, res) {
  var id = req.params.id;
  comments.splice(id, 1);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.send('Comment deleted');
});

// Start server
app.listen(3000, function() {
  console.log('Server listening on port 3000');
});