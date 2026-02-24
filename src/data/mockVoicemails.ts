import type { Voicemail }  from '../types/voicemail'; 

export const mockVoicemails: Voicemail[] = [
    {
        id: '1',
        callerName: "Alex Johnson",
        callerNumber: "+1234567890",
        timestamp: "2024-06-01T10:15:00Z",
        transcription: "Hello, this is Alex Johnson, I am having bad chest pains and shortness of breath, I need to see the doctor as soon as possible. Please call me back. Thank you.",
        extracted: {
            intent: "urgent",
            urgency: "high",
            summary: "Severe chest pain and shortness of breath",
            keyDetails: {
                "symptoms": "chest pains, shortness of breath",
            }
        },
        workflow: {
            status: "new",
            suggestedNextAction: "Send patient to ER immediately"
        }
            
        }
]
