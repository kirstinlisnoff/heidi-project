import { useState } from "react";

import type { Voicemail } from "./types/voicemail";
import { mockVoicemails } from "./data/mockVoicemails";

function App() {
  const [voicemails, setVoicemails] = useState<Voicemail[]>(mockVoicemails);
  const [selectedVoicemail, setSelectedVoicemail] = useState<Voicemail | null>(mockVoicemails[0]);

  return (

    <div className='app' style={{ display: 'flex', height: '100vh' }}>
{/*LEFT PANEL*/}
      <div style={{ width: '30%', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
        <h2>Inbox</h2>
        {voicemails.map(vm => (
          <div 
            key={vm.id}
            onClick={() => setSelectedVoicemail(vm)}
            style={{
              padding: "0.5rem",
              marginBottom: "0.5rem",
              cursor: "pointer",
              backgroundColor: selectedVoicemail?.id === vm.id ? "#f0f0f0" : "white",
              border: "1px solid #ddd"
            }}
            >
              <strong>{vm.extracted.summary}</strong>
              <div>Urgency: {vm.extracted.urgency}</div>
    </div>
        ))}
      </div>

{/*RIGHT PANEL*/}
      <div style={{ width: '70%', padding: '1rem' }}>
        <h2>Voicemail Details</h2>

        {selectedVoicemail ? (
          <div>
            <p><strong>Summary:</strong> {selectedVoicemail.extracted.summary}</p>
            <p><strong>Intent:</strong> {selectedVoicemail.extracted.intent}</p>
            <p><strong>Urgency:</strong> {selectedVoicemail.extracted.urgency}</p>
            <p><strong>Suggested Action:</strong> {selectedVoicemail.workflow.suggestedNextAction}</p>

            <details>
              <summary>View Full Transcript</summary>
              <p>{selectedVoicemail.transcription}</p>
            </details>
            </div>
        ) : (
          <p>Select a voicemail</p>
        )}
        </div>
    </div>
      )
};

export default App
