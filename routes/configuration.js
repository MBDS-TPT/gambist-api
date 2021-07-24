let configurationSchema = require('../models/configuration');

exports.create = (req, res) => {
  console.log(req.body);
  let newConfiguration = new configurationSchema({
    configkey: req.body.ConfigKey,
    configvalue: req.body.ConfigValue
  });

  newConfiguration.save((error, data) => {
    if (error) {
      res.status(500).send({ message: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'configuration saved.', data: data });
    }
  });
}

exports.getById = (req, res) => {
  configurationSchema.findById(req.params.id, (error, data) => {
    if (error) {
      res.status(500).send({ message: 'Internal server error' });
    } else {
      res.json(data);
    }
  });
}

exports.getAll = (req, res) => {
  configurationSchema.find((error, data) => {
    if (error) {
      res.status(500).send({ message: 'Internal server error' });
    } else {
      res.status(200).json(data);
    }
  });
}

exports.update = (req, res) => {
  configurationSchema.findByIdAndUpdate(req.params.id, {
    configkey: req.body.ConfigKey,
    configvalue: req.body.ConfigValue
  }, (error, data) => {
    if (error) {
      res.status(500).send({ message: 'Internal server error' });
    } else {
      res.status(200).json({ message: "configuration has been updated" })
    }
  });
}

exports.delete = (req, res) => {
  configurationSchema.findByIdAndRemove(req.params.id, (error, configuration) => {
    if (error) {
      res.status(500).send({ message: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'configuration deleted' });
    }
  });
}


exports.findByConfigKey = (req, res) => {
  configurationSchema.find({
        configkey: { $regex: '.*' + req.params.configkey + '.*', $options: 'i' }
    }, (error, data) => {
        if (error) {
          res.status(500).send({  message: 'Internal server error' });
        } else {
          res.status(200).json(data);
        }
    });
}