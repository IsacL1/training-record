export interface AthletesInfo {
    athletesId: string;
    athletesName: string;
    bod: Date;
    phone: string;
    password: string;
    addr: string;
    HKID4digit: string;
}

export interface CurrentAbilityValue {
    date: Date;
    weight: number;
    height: number;
    timedRun9min: number;
    verticalJump: number;
    longJump: number;
    sqaut: number;
}

export interface AthletesCurrentAbilityValue {
    athletesName: string;
    CurrentAbilityValue: CurrentAbilityValue[];
}

export interface SpeedSlalom {
    date: string;
    side: string;
    step: number;
    time: number;
    missedCone: number;
    kickedCone: number;
    DQ: boolean;
    endLine: boolean;
    result: number;
    notes?: string;
}

export interface Slide {
    date: string;
    trickName: string;
    level: string;
    family: string;
    length: number;
    notes?: string;
}

export interface ClassicSlalom {
    date: string;
    trickName: string;
    level: string;
    family: string;
    cones: number;
    notes?: string;
}

export interface OffSkateExercise {
    date: string;
    exerciseName: string;
    set: number;
    reps: number;
    weight: number;
    totalSet: number;
    totalReps: number;
    totalWeight: number;
    notes?: string;
}

export interface Goals {
    athletesName: string;
    SpeedSlalom: SpeedSlalom[];
    Slide: Slide[];
    ClassicSlalom: ClassicSlalom[];
    offSkateExercise: OffSkateExercise[];
}

export interface Athletes {
    name: string;
    athletesCurrentAbilityValue: CurrentAbilityValue[];
    SSRrecords: any[];
    CSrecords: any[];
    Sliderecords: any[];
    offSkateExercise: any[];
    goals: Goals[];
}