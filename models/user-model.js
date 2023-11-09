const db = require('../data/database');

class User {
    constructor(name, id, password, email, phoneNumber, position) {
        this.name = name;
        this.id = id;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.position = position;
    }

    // static async findById(userId) {
    //     const query = `select * from users where id = ?`;
    //     const [user] = await db.query(query, userId);
    //     return user[0];
    // }

    async getUserWithSameId() {
        const query = `select * from users where id = ?`;
        const [user] = await db.query(query, this.id);
        return user[0];
    }

    async existsAlready() {
        const existingUser = await this.getUserWithSameId();
        if (existingUser) {
          return true;
        }
        return false;
      }

    async regist() {
        const data = [
            null,
            this.name,
            this.id,
            this.password,
            this.email,
            this.phoneNumber,
            this.position,
          ];
        
        const query = `insert into users values(?)`;
        await db.query(query, [data]);
    }
};

module.exports = User;