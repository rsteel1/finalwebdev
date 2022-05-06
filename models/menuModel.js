const nedb = require("nedb");
const { resolve } = require("path");
class Menu {
    constructor(dbFilePath) {
        if(dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true});
            console.log('DB Connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }
    }

    init(){
        this.db.insert({
            name: 'Pizza',
            description: 'Pepperoni Pizza',
            ingredients: 'Dough, Cheese, Tomato, Pepperoni',
            price: 5,
            type: 'Dinner',
            availability: true
        });
        console.log('Dish Entered');
    }

    getAllDishes(){
        return new Promise((resolve, reject) => {
            this.db.find({}, function(err, dishes){
                if (err) {
                    reject(err);
                } else {
                    resolve(dishes);
                    console.log('function all() returns: ', dishes);
                }
            })
        })
    }

    getDinnerDishes(){
        return new Promise((resolve, reject) => {
            this.db.find({ type: 'Dinner', availability: true }, function(err, dinner) {
                if (err) {
                    reject(err);
                } else {
                    resolve(dinner);
                    console.log('getDinnerDishes() returns ', dinner)
                }
            })
        })
    }
    getAllDinnerDishes(){
        return new Promise((resolve, reject) => {
            this.db.find({ type: 'Dinner' }, function(err, dinner) {
                if (err) {
                    reject(err);
                } else {
                    resolve(dinner);
                    console.log('getDinnerDishes() returns ', dinner)
                }
            })
        })
    }
    getAllSpecialDishes() {
        return new Promise((resolve, reject) => {
            this.db.find({ type: 'Special' }, function(err, special) {
                if (err) {
                    reject(err);
                } else {
                    resolve(special);
                    console.log('getSpecialDishes() returns ', special)
                }
            })
        })
    }
    getSpecialDishes() {
        return new Promise((resolve, reject) => {
            this.db.find({ type: 'Special', availability: true }, function(err, special) {
                if (err) {
                    reject(err);
                } else {
                    resolve(special);
                    console.log('getSpecialDishes() returns ', special)
                }
            })
        })
        
    }
    getLunchDishes(){
        return new Promise((resolve, reject) => {
            this.db.find({ type: 'Lunch', availability: true }, function(err, lunch) {
                if (err) {
                    reject(err);
                } else {
                    resolve(lunch);
                    console.log('getDinnerDishes() returns ', lunch)
                }
            })
        })
    }
    getAllLunchDishes(){
        return new Promise((resolve, reject) => {
            this.db.find({ type: 'Lunch' }, function(err, lunch) {
                if (err) {
                    reject(err);
                } else {
                    resolve(lunch);
                    console.log('getDinnerDishes() returns ', lunch)
                }
            })
        })
    }

    addDish(name, description, ingredients, price, type, availability) {
        var entry = {
            name: name, 
            description: description,
            ingredients: ingredients,
            price: price,
            type: type,
            availability: availability
        }
        console.log('Dish Added', entry);
        this.db.insert(entry, function(err, doc) {
            if (err) {
                console.log('Error inserting dish', subject);
            } else {
            console.log('Dish inserted into the database', doc);
            }
        })
    }

    getDishByName(name) {
        return new Promise((resolve, reject) => {
            this.db.find({ 'name': name}, function(err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('getDishByName returns: ', entries);
                }
            })
        })
    }

    getDishById(id) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ '_id': id}, function(err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('getDishById returns: ', entries);
                }
            })
        })
    }

    updateDish(id, name, description, ingredients, price, type, availability) {
        return new Promise((resolve, reject) => {
            availability = availability === "True";
            price = Number(price);
            this.db.update({ "_id": id}, { $set: {'name': name, 'description': description, 'ingredients': ingredients, 'price': price, "type": type, 'availability': availability }}, {}, function(err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('updateDish returns: ', entries);
                }
            })
        })
    }
}

module.exports = Menu