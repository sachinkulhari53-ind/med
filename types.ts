
export interface PatientInfo {
  age: string;
  sex: 'Male' | 'Female' | 'Other' | '';
  symptoms: string;
  prescription: string;
  allergies: string;
}

export interface MedicationAnalysis {
  name: string;
  purpose: string;
  isFastActing: boolean;
}

export interface AnalysisResult {
  suspectedCondition: string;
  medications: MedicationAnalysis[];
  recommendation: string;
  detailedExplanation: string;
}
