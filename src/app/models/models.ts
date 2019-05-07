export interface IInsuredMember {
    schemecode: string;
    polno: string;
    certNo: string;
    effDate: string;
    isTerminated: string;
    customerHotline: string;
    inceptionDate: string;
    emergencyHotline: string;
    panelcode: string;
    cardColor: string;
    mmrlnm: string;
    subsidiary: string;
}

export interface IPolicyInput {
    wsVer: string;
    policyNumber: string;
    certNo: string;
    language: string;
    identityNumber: string;
    dob: string;
}

export class PolicyInput {
    wsVer: string;
    policyNumber: string;
    certNo: string;
    language: string;
    identityNumber: string;
    dob: string;
    constructor(policyNumber: string, certNo: string, identityNumber: string) {
        this.wsVer = '1.0';
        this.policyNumber = policyNumber;
        this.certNo = certNo;
        this.language = 'ENG';
        this.identityNumber = identityNumber;
        this.dob = '1988-01-01';
    }
}

export interface Policy {
    agreeMrkt: string;
    policyDetail: {
        accessLevel: string;
        brokerAgentId: number;
        policyNo: string;
        panelCode: string;
        effFrom: string;
        productName: string;
        claimSubmissionEnabled: string;
        certNo: string;
        isDefault: string;
        brokerCode: string;
        benfitEnabled: string;
        noOfDep: string;
        members: [IInsuredMember]
        brokerName: string;
        policyHolder: number;
        effTo: string
    };
    name: string;
    message: string;
    status: number;
}

export interface Claim {
    claimTypechineseDescription: string;
    orderSequence: number;
    docTypes: [any];
    diognosisList: [any];
    claimType: string;
    claimTypeDescription: string;
}

export interface ClaimDetail {
    result: [Claim];
    status: number;
}
