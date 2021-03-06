const { ObjectId } = require('mongodb');
const connect = require('../config/connection');

const register = async (name, ingredients, preparation, _id) =>
  connect().then(async (db) => { 
    const recipe = await db.collection('recipes').insertOne({ name, ingredients, preparation });

    return { _id: recipe.insertedId, name, ingredients, preparation, userID: _id };
  });

  const getAll = async () => connect().then((db) => db.collection('recipes').find().toArray());

  const getById = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    return connect().then((db) => db.collection('recipes').findOne(ObjectId(id)));
  };

  const update = async (id, name, ingredients, preparation) => {
    await connect().then((db) => db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));
  
    return { _id: ObjectId(id), name, ingredients, preparation };
  };

  const exclude = async (id) =>
  connect().then(async (db) =>
    db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

  module.exports = {
    register, getAll, getById, update, exclude,
  };