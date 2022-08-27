const knex = require('knex')(require('../knexfile').development);

exports.index = (_req, res) => {
  knex('tricks')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving tricks: ${err}`)
    );
};

exports.singleTrick = (req, res) => {
  knex('tricks')
    .where({ id: req.params.id })
    .then((data) => {
      if (!data.length) {
        return res.status(404).send(`Record with id: ${req.params.id} is not found`);
      }

      res.status(200).json(data[0]);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving warehouse ${req.params.id} ${err}`)
    );
};

exports.updateTrick = (req, res) => {
  knex('tricks')
    .update(req.body)
    .where({ id: req.params.id })
    .then(() => {
      res.status(200).send(`Trick with id: ${req.params.id} has been updated`);
    }) 
    .catch((err) =>
      res.status(400).send(`Error updating trick ${req.params.id} ${err}`)
    );

    console.log(req.body)
};