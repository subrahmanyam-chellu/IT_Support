const mongoose = require('mongoose');

const AppTicket = mongoose.Schema({
    ticketId:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
    priority:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    createdBy:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model('AppTicket', AppTicket);