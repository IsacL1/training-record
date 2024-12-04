const mongoose = require('mongoose')

const athletesInfoSchema = new mongoose.Schema({
    athletesId: String,
    athleteName: String,
    bod: { type: Date },
    phone: String,
    password: String,
    addr: String,
    HKID4digit: String
})

// Classic Slalom trick
const classicSlalomSchema = new mongoose.Schema({
    trickName: String,
    level: String,
    family: String,
    cones: Number,
    notes: String,
})

// Slide trick
const slideSchema = new mongoose.Schema({
    trickName: String,
    level: String,
    family: String,
    length: Number,
    notes: String
})

// Off skate exercise
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

// To record athletes current ability
const athletesCurrentAbilityValueSchema = new mongoose.Schema({
    athletesName: String,
    CurrentAbilityValue: [{
        date: { type: Date },
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
                    date: { type: Date },
                    side: String,
                    step: Number,
                    time: Number,
                    missedCone: Number,
                    kickedCone: Number,
                    DQ: Boolean,
                    endLine: Boolean,
                    result: Number,
                    notes: String,
                }
            ],
            Slide: [
                {
                    date: { type: Date },
                    trickName: String,
                    level: String,
                    family: String,
                    length: Number,
                    notes: String,
                }
            ],
            ClassicSlalom: [
                {
                    date: { type: Date },
                    trickName: String,
                    level: String,
                    family: String,
                    cones: Number,
                    notes: String,
                }
            ],
            offSkateExercise: [
                {
                    date: { type: Date },
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

// Athletes records
const athletesRecordsSchema = new mongoose.Schema({
    athletesName: String,
    //...athletesCurrentAbilityValueSchema.obj, // call the athletesCurrentAbilityValueSchema
    SSRecords: [{
        date: { type: Date },
        side: { type: String, enum:["L", "R"] },
        step: Number,
        time: Number,
        missedCone: Number,
        kickedCone: Number,
        DQ: Boolean,
        endLine: Boolean,
        SSResult: Number,
        notes: String,
    }],
    /*CSRecords: [{ date: { type: Date } , type: Schema.Types.ObjectId, ref: 'ClassicSlalom' }], // call the classicSlalomSchema
    SlideRecords: [{ date: { type: Date } , type: Schema.Types.ObjectId, ref: 'Slide'}], // call the slideSchema
    /*offSkateExercise: [{ date: { type: Date } , type: Schema.Types.ObjectId, ref:  'offSkateExercise'}], // call the offSkateExerciseSchema
    ...goalsSchema.obj  //  call the goalsSchema
    */
})


// export to mongoDB
const athletesInfoModel = mongoose.model('AthletesInfo', athletesInfoSchema)
const classicSlalomModel = mongoose.model('ClassicSlalom', classicSlalomSchema)
const SlideModel = mongoose.model('Slide', slideSchema)
const offSkateExerciseModel = mongoose.model('offSkateExercise', offSkateExerciseSchema)
const goalsModel = mongoose.model('Goals', goalsSchema)
const athletesCurrentAbilityValueModel = mongoose.model('AthletesCurrentAbilityValue', athletesCurrentAbilityValueSchema)
const athletesRecordsModel = mongoose.model('Athletes', athletesRecordsSchema)

module.exports = {
    athletesInfoModel, classicSlalomModel,
    SlideModel, offSkateExerciseModel, goalsModel,
    athletesCurrentAbilityValueModel, athletesRecordsModel
}