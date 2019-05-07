import { IInsuredMember, IDiagnosis, IDoctor, IMemberType } from '../models/model';

export const insuredMemberArray: IInsuredMember[] = [
    {name: 'Zafar Basil', id: 1},
    {name: 'Ali Zafar', id: 2},
    {name: 'Vladmir Putin', id: 3},
    {name: 'John Wick', id: 4}
];

export const memberTypeArray: IMemberType[] = [
    {type: 'General Physician', id: 'type1' },
    {type: 'Acupunture or chinese medical Practioner', id: 'type2'},
    {type: 'Outpatient Specialist Consultation', id: 'type3'},
    {type: 'Physiotherapy or Chiropractic Treatment', id: 'type4'},
    {type: 'Prescribed Medicine', id: 'type5'},
    {type: 'Outpatient Diagnostic Lab Test', id: 'type6'},
    {type: 'Vaccination', id: 'type7'},
    {type: 'Dental Benefit', id: 'type8'}
];

export const doctorNameArray: IDoctor[] = [
    {id: 1, name: 'Dr. Au Yeung Wai Yan'},
    {id: 2, name: 'Dr. Chuk Pui Chun'},
    {id: 3, name: 'Dr. Lau chun Hung'},
    {id: 4, name: 'Dr. Leung Yu Lam Simon'},
    {id: 5, name: 'Dr. WONG Lik Kong'},
    {id: 6, name: 'Dr. Au Yeung Wa Yan'},
    {id: 7, name: 'Dr. Chuk Pui Chun'},
    {id: 8, name: 'Dr. Leung Yui Lam Simon'},
    {id: 9, name: 'Dr. Wong Lik Kong'},
    {id: 10, name: 'Dr. Au Yeung Wai Yan'},
    {id: 11, name: 'Dr. Chuk Pui Chun'},
    {id: 12, name: ' Dr. Lau chun Hung'},
    {id: 13, name: 'Dr. Chuk Pui Chun'},
    {id: 14, name: 'Dr. Chuk Pui Chun'},
    {id: 15, name: 'Dr. Chuk Pui Chun'}
];

export const diagnosisNameArray: IDiagnosis[] = [
    {name: 'upper respiratory Infection (URTI)', id: 1},
    {name: 'Upper 1', id: 2},
    {name: 'Upper 2', id: 3},
    {name: 'Upper 3', id: 4},
    {name: 'Upper 4', id: 5},
    {name: 'Upper 5', id: 6}
];

