import { useState } from "react";

import type { Voicemail } from "./types/voicemail";
import { mockVoicemails } from "./data/mockVoicemails";

function App() {
  const [voicemails, setVoicemails] = useState<Voicemail[]>(mockVoicemails);

  const [selectedId, setSelectedId] = useState<string>(mockVoicemails[0].id);

const selectedVoicemail = voicemails.find((v) => v.id === selectedId);

  const priorityOrder = { low: 2, medium: 1, high: 0 };
  const sortedVoicemails = [...voicemails].sort((a, b) =>
    priorityOrder[a.extracted.urgency] - priorityOrder[b.extracted.urgency])

  const updateVoicemail = (id: string, updates: Partial<Voicemail>) => {
    setVoicemails((prev) =>
      prev.map((vm) =>
      vm.id === id ? { ...vm, ...updates } : vm
    ));
  }

  const highCount = voicemails.filter(
  (v) => v.extracted.urgency === "high"
).length;

const mediumCount = voicemails.filter(
  (v) => v.extracted.urgency === "medium"
).length;

const lowCount = voicemails.filter(
  (v) => v.extracted.urgency === "low"
).length; 


  return (

    <div className='app' style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%' }}>

    {/*OVERVIEW BANNER*/}
      <div style={{
          padding: "1rem",
          borderBottom: "1px solid #ccc",
          backgroundColor: "#fafafa",
          width: "100%",
        }}>
          <strong>Morning Overview:</strong>
          <span style={{ marginLeft: "1rem", color: "red" }}>
            High: {highCount}
          </span>
          <span style={{ marginLeft: "1rem", color: "orange" }}>
            Medium: {mediumCount}
          </span>
          <span style={{ marginLeft: "1rem", color: "green" }}>
            Low: {lowCount}
          </span>
        </div>

  <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
{/*LEFT PANEL*/}
      <div style={{ width: '30%', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
        <h2>Inbox</h2>
        {sortedVoicemails.map(vm => (
          <div 
            key={vm.id}
            onClick={() => setSelectedId(vm.id)}
            style={{
              padding: "0.5rem",
              marginBottom: "0.5rem",
              cursor: "pointer",
              backgroundColor: selectedVoicemail?.id === vm.id ? "#f0f0f0" : "white",
              border: "1px solid #ddd",
              borderLeft: `5px solid ${
                vm.extracted.urgency === "high" ? "red" :
                vm.extracted.urgency === "medium" ? "orange" :
                "green"
              }`
            }}
            >
              <strong>{vm.extracted.summary}</strong>
              <div>Urgency: {vm.extracted.urgency}</div>
              <div>Status: {vm.workflow.status}</div>
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

            <div style={{ marginTop: '1rem' }}>
              <label>Status: </label>
              <select
                value={selectedVoicemail.workflow.status}
                onChange={(e) =>
                  updateVoicemail(selectedVoicemail.id, {
                    workflow: {
                      ...selectedVoicemail.workflow,
                      status: e.target.value as any
                }
              })
            }
            >
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>  
            </select>
            </div>

            <div style={{ marginTop: "0.5rem" }}>
              <label>Assign to: </label>
              <select
                value={selectedVoicemail.workflow.assignedTo || ""}
                onChange={(e) =>
                  updateVoicemail(selectedVoicemail.id, {
                    workflow: {
                      ...selectedVoicemail.workflow,
                      assignedTo: e.target.value
                    }
                  })
                }
              >
                <option value="Unassigned"></option>
                <option value="Front Desk">Front Desk</option>
                <option value="Nurse">Nurse</option>
                <option value="Billing">Billing</option>
              </select>
          </div>

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
    </div>
      )
};

export default App;
