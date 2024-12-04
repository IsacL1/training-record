export interface AthletesInfo {
    athletesId: String;
    athletesName: String;
    bod: Date;
    phone: String;
    password: String;
    addr: String;
    HKID4digit: String;
}

export interface CurrentAbilityValue {
    date: Date;
    weight: Number;
    height: Number;
    timedRun9min: Number;
    verticalJump: Number;
    longJump: Number;
    sqaut: Number;
}

export interface AthletesCurrentAbilityValue {
    athletesName: String;
    CurrentAbilityValue: CurrentAbilityValue[];
}

export interface SpeedSlalom {
    date: String;
    side: String;
    step: Number;
    time: Number;
    missedCone: Number;
    kickedCone: Number;
    DQ: Boolean;
    endLine: Boolean;
    result: Number;
    notes?: String;
}

export interface Slide {
    date: String;
    trickName: String;
    level: String;
    family: String;
    length: Number;
    notes?: String;
}

export interface ClassicSlalom {
    date: String;
    trickName: String;
    level: String;
    family: String;
    cones: Number;
    notes?: String;
}

export interface OffSkateExercise {
    date: String;
    exerciseName: String;
    set: Number;
    reps: Number;
    weight: Number;
    totalSet: Number;
    totalReps: Number;
    totalWeight: Number;
    notes?: String;
}

export interface Goals {
    athletesName: String;
    speedSlalom: SpeedSlalom[];
    slide: Slide[];
    classicSlalom: ClassicSlalom[];
    offSkateExercise: OffSkateExercise[];
}

export interface Athletes {
    athletesName: String;
    athletesCurrentAbilityValue: CurrentAbilityValue[];
    SSRrecords: any[];
    CSrecords: any[];
    slideRecords: any[];
    offSkateExercise: any[];
    goals: Goals[];
}