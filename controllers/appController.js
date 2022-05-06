//Create Link to the model of the application. Add const for each part of app model
const { response } = require("express");
const { render } = require("mustache");
const menuDAO = require("../models/menuModel");
const dao = require("../models/loginModel");

const db = new menuDAO();
db.init();

exports.show_login = function (req, res) {
    res.render("login");
};

exports.handle_login = function (req, res) {    //login
    res.redirect("/staff")
}

exports.main_page = function (req, res) {
    let type = req.params.type;
    db.getDinnerDishes(type)
        .then((dinner) => {
            db.getLunchDishes(type)
                .then((lunch) => {
                    res.render("main", {
                        dinner: dinner,
                        lunch: lunch,
                    })
                });
        })
        .catch((err) => {
            console.log("promise rejected", err);
        });
};

exports.show_update_page = function (req, res) {
    const id = req.params.id;
    db.getDishById(id)
        .then((entries) => {
            console.log(entries);
            res.render("edit", {
                dish: entries,
            })
        });
}

exports.staff_page = function (req, res) {
    let type = req.params.type;
    db.getAllDinnerDishes(type)
        .then((dinner) => {
            db.getAllLunchDishes(type)
                .then((lunch) => {
                    db.getAllSpecialDishes(type)
                        .then ((special) => {
                            res.render("staff", {
                                dinner: dinner,
                                lunch: lunch,
                                special: special
                            })
                        })
                    })
                })
        .catch((err) => {
            console.log("promise rejected", err);
        });
};

exports.post_new_entry = function (req, res) {
    console.log("processing post_new_dish controller");
    if (!req.body.name) {
        response.status(400).send("Dish must have a name.");
        return;
    }
    db.addDish(req.body.name, req.body.description, req.body.ingreedients, req.body.price, req.body.type, req.body.availability === "True");
    res.redirect("/staff");
}

exports.post_update = function (req, res) {
    console.log("Updating existing Dish");
    if (!req.body.name) {
        response.status(400).send("Dish must have a name.");
        return;
    }
    db.updateDish(req.body.id, req.body.name, req.body.description, req.body.ingredients, req.body.price, req.body.type, req.body.availability);
    res.redirect("/staff");
}

exports.show_new_dishes = function (req, res) {
    let dish = req.params.name;
    db.getDishByName(dish)
        .then((entries) => {
            res.render("main", {
                dinner: dinner,
                lunch: lunch,
            });
        })
        .catch((err) => {
            console.log("Error: ");
            console.log(JSON.stringify(err));
        });
};

exports.logout = function (req, res) {
    res.clearCookie("jwt").status(200).redirect("/");
  };
  