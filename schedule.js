const Agenda = require("agenda");

const agenda = new Agenda({
    db: { 
        address: process.env.MONGO_URI, 
        collection: "mailDetails", 
        options: { useUnifiedTopology: true }, 
        },
        processEvery: "1 hour",
        maxConcurrency: 20,
    });
    
const schedule = {
        sendMail: async (data) => {
            await agenda.processEvery("send mail",data);
            
        },
    }

module.exports = {schedule,agenda};