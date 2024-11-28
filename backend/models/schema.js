const mongoose = require('mongoose')

const athletesInfoSchema = new mongoose.Schema({
    athletesId: String,
    athletesName: String,
    bod: date,
    phone: String,
    password: String,
    addr: String,
    HKID4digit: String
})

const classicSlalomSchema = new mongoose.Schema({
    trickName: String,
    level: String,
    family: String,
    cones: Number,
    notes: String,
})

const SlideSchema = new mongoose.Schema({
    trickName: String,
    level: String,
    family: String,
    length: Number,
    notes: String
})

const offSkateExerciseSchema = new mongoose.Schema({
    exerciseName: String,
    set: Number,
    reps: Number,
    weight: Number,
    totalSet: Number,
    totalReps: Number,
    totalWeight: Number,
    notes: String,
})


const athletesCurrentAbilityValueSchema = new mongoose.Schema({
    athletesName: String,
    CurrentAbilityValue: [{
        date: Date,
        weight: Number,
        height: Number,
        timedRun9min: Number,
        verticalJump: Number,
        longJump: Number,
        sqaut: Number
    }]
})

// Goals for speed slalom, slide and classic slalom
const goalsSchema = new mongoose.Schema({
    athletesName: String,
    goals: [
        {
            SpeedSlalom: [
                {
                    date: string,
                    side: string,
                    step: number,
                    time: number,
                    missedCone: number,
                    kickedCone: number,
                    DQ: boolean,
                    endLine: boolean,
                    result: number,
                    notes: string,
                }
            ],
            Slide: [
                {
                    date: String,
                    trickName: String,
                    level: String,
                    family: String,
                    length: Number,
                    notes: String,
                }
            ],
            ClassicSlalom: [
                {
                    date: String,
                    trickName: String,
                    level: String,
                    family: String,
                    cones: Number,
                    notes: String,
                }
            ],
            offSkateExercise: [
                {
                    date: String,
                    exerciseName: String,
                    set: Number,
                    reps: Number,
                    weight: Number,
                    totalSet: Number,
                    totalReps: Number,
                    totalWeight: Number,
                    notes: String,
                }
            ]
        }
    ]
})

const athletesRecordsSchema = new mongoose.Schema({
    athletesName: String,
    athletesCurrentAbilityValue: [],
    SSRrecords: [],
    CSRecords: [],
    SlideRecords: [],
    offSkateExercise: [],
    goals: []
})


const athletesInfoModel = mongoose.model('AthletesInfo', athletesInfoSchema)
const classicSlalomModel = mongoose.model('ClassicSlalom', classicSlalomSchema)
const SlideModel = mongoose.model('Slide', SlideSchema)
const offSkateExerciseModel = mongoose.model('offSkateExercise', offSkateExerciseSchema)
const goalsModel = mongoose.model('Goals', goalsSchema)
const athletesCurrentAbilityValueModel = mongoose.model('AthletesCurrentAbilityValue', athletesCurrentAbilityValueSchema)
const athletesRecordsModel = mongoose.model('Athletes', athletesRecordsSchema)

module.exports = {
    athletesInfoModel, classicSlalomModel,
    SlideModel, offSkateExerciseModel, goalsModel,
    athletesCurrentAbilityValueModel, athletesRecordsModel
}