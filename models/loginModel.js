const login = require("nedb");

class UserDAO {
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new login({
                filename: dbFilePath,
                autoload: true
            })
        } else {
            this.db = new login();
        }

        this.db.insert({
            user: 'Peter',
            password: '$2b$10$I82WRFuGghOMjtu3LLZW9OAMrmYOlMZjEEkh.vx.K2MM05iu5hY2C'
        });
    }
}

const dao = new UserDAO();

module.exports = dao;