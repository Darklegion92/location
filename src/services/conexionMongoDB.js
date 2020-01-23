const mongoose = require('mongoose')
const CONFIG = require('../config/config')

module.exports = {
    con: null,
    connect: ()=>{
        if(this.con) return this.con;
        return mongoose.connect(CONFIG.DB_MONGO,{
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        }).then(con => {
            this.con = con;
            console.log('Conexión DB Correcta');
        }).catch(error=>console.log(error))
    }
}
