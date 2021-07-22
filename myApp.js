require('dotenv').config();
var mongoose = require("mongoose")
var express = require('express');

mongoose.connect(
process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


const { Schema } = mongoose;

const personSchema = new Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String],
  });

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let andy = new Person({name: 'Andy', age: 29, favoriteFoods: ['Pizza', 'Mashed Potatoes', 'Soup']});
  andy.save((error, data) => {
    if (error) {
      console.log(error)
    } else {
      done(null, data)
    }
  })
  //done(null /*, data*/);
};

var arrayOfPeople = [
  {name: 'Mandy', age: 29, favoriteFoods: ['Pizza', 'Mashed Potatoes', 'Soup']},
  {name: 'Adam', age: 34, favoriteFoods: ['Chipotle', 'Wings', 'Curry Ramen']},
  {name: 'Andy2', age: 29, favoriteFoods: ['Pizza', 'Mashed Potatoes', 'Soup']}
]
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, data) => {
    if (error) {
      console.log(error)
    } else {
      done(null, data)
    }
  });
  //done(null /*, data*/);
};

var personName = 'Mandy';

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (error, data) => {
    if (error) {
      console.log(error)
    } else {
      done(null, data)
    }
  });
  //done(null /*, data*/);
};

food = 'Wings';

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: {$all: [food]} }, (error, data) => {
    if (error) {
      console.log(error)
    } else {
      done(null, data)
    }
  });
  //done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (error, data) => {
    if (error) {
      console.log(error)
    } else {
      done(null, data)
    }
  });
  //done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (error, data) => {
    if (error) {
      console.log(error)
    } else {
      data.favoriteFoods.push(foodToAdd);
      data.save((error, updatedData) => {
        if (error) {
          console.log(error)
        } else {
          done(null, updatedData)
        }
      })
      //done(null, data)
    }
  });
  //done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName}, { age: ageToSet }, { new: true}, (error, data) => {
    if (error) {
      console.log(error)
    } else {
      done(null, data)
    }
  });
  //done(null /*, data*/);
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (error, data) => {
    if (error) {
      console.log(error)
    } else {
      done(null, data)
    }
  });
  //done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (error, data) => {
    if (error) {
      console.log(error)
    } else {
      done(null, data)
    }
  });
  //done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: {$all: [foodToSearch]}})
    .sort({name: 'asc'})
    .limit(2)
    .select('-age')
    .exec((error, data) => {
      if (error) {
        console.log(error)
      } else {
        done(null, data)
      }
    })
  //done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
