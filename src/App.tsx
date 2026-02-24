import { useState } from "react";

import type { Voicemail } from "./types/voicemail";
import { mockVoicemails } from "./data/mockVoicemails";

function App() {
  const [voicemails, setVoicemails] = useState<Voicemail[]>(mockVoicemails);
  
  return (
    <div className="app">
      {mockVoicemails.map(vm => (
        <div key={vm.id}>{vm.extracted.summary}</div>
      ))}
    </div>
  )
}

export default App
