/* Insured Member */
export interface IInsuredMember {
    id: number;
    name: string;
}

export class InsuredMember implements IInsuredMember {
    id: number;
    name: string;
    constructor() {
    }
}

/* Member Type */
export interface IMemberType {
    id: string;
    type: string;
}

export class MemberType implements IMemberType {
    id: string;
    type: string;
    constructor() {
    }
}

/* Doctor */
export interface IDoctor {
    id: number;
    name: string;
}

export class Doctor implements IDoctor {
    id: number;
    name: string;
    constructor() {
    }
}

/* Diagnosis */
export interface IDiagnosis {
    id: number;
    name: string;
}

export class Diagnosis implements IDiagnosis {
    id: number;
    name: string;
    constructor() {
    }
}
