export interface ChargeConfig {
  chargeList: any[];
  patientRegId: number;
  visitId: number;
  serviceDate: Date;
  existingCharges: any[];
  name?:string;
}

// Pick and Omit are TypeScript mapped utility types used to create new types from existing interfaces by selecting or 
// excluding properties. Pick<T, K>

// Pick/Select specific properties in main interface Object: 
export type chargeList = Pick <ChargeConfig,'chargeList' | 'visitId'>
// Omit/Remove used for remove specific properties from a single interface Object:
export type  chargeArray = Omit <ChargeConfig,'serviceDate' | 'existingCharges' | 'patientRegId'>