export interface AthleteInfoForm {
    athleteId: String;
    athleteName: String;
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
    athleteName: String;
    CurrentAbilityValue: CurrentAbilityValue[];
}

// NOT UUSING
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
    athleteName: String;
    speedSlalom: SpeedSlalom[];
    slide: Slide[];
    classicSlalom: ClassicSlalom[];
    offSkateExercise: OffSkateExercise[];
}

export interface Athletes {
    athleteName: String;
    athletesCurrentAbilityValue: CurrentAbilityValue[];
    SSRrecords: any[];
    CSrecords: any[];
    slideRecords: any[];
    offSkateExercise: any[];
    goals: Goals[];
}

// use success in SSRecord
export interface SpeedSlalomBasic {
    AthleteName: string;
    date: Date;
    time: number | null;
    missedCone: number | null;
    kickedCone: number | null;
    DQ: boolean;
    endLine: boolean;
    SSResult: number | null;
    notes?: string;
    recordType: "Normal" | "Details";
}

export interface SSRdetails extends SpeedSlalomBasic {
    side: "L" | "R";
    step: number | null;
    time12m?: number | null;
    time20cones?: number | null;
    recordType: "Normal" | "Details";
}
