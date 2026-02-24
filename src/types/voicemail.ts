export type Intent =
    | 'appointment'
    | 'prescription_refill'
    | 'billing'
    | 'urgent'
    | 'other';

export type Urgency = 'low' | 'medium' | 'high';

export type WorflowStatus = 'new' | 'in_progress' | 'completed';

export type Voicemail = {
    id: string;
    callerName?: string;
    callerNumber: string;
    timestamp: string;
    transcription: string;

    extracted: {
        intent: Intent;
        urgency: Urgency;
        summary: string;
        keyDetails?: Record<string, string>;    
    };

    workflow: {
        status: WorflowStatus;
        assignedTo?: string;
        suggestedNextAction: string;
    };
};