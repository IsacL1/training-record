const mongoose = require('mongoose');

const athletesSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    addr: String,
    HKID4digit: String,

});

const speedSlalomRecordSchema = new mongoose.Schema({
    athletes: [
        {
            name: String,
            records: [
                {
                    date: String,
                    side: String,
                    step: Number,
                    time: Number,
                    missedCone: Number,
                    kickedCone: Number,
                    DQ: Boolean,
                    endLine: Boolean,
                    result: Number,
                    notes: String
                }
            ]
        }
    ]
});

const AthletesModel = mongoose.model('Athletes', athletesSchema);
const SpeedSlalomRecordModel = mongoose.model('SpeedSlalomRecord', speedSlalomRecordSchema);

module.exports = { AthletesModel, SpeedSlalomRecordModel };