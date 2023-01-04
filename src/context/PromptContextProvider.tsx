import { useState } from "react";
import { PromptContext } from "./PromptContext";

function PromptContextProvider({ children }: { children: React.ReactNode }) {
  const [topic, setTopic] = useState("");
  const [userId, setUserId] = useState("");

  const updatePrompt = (newTopic: string, newUser: string) => {
    setTopic(newTopic);
    setUserId(newUser);
  };

  return (
    <PromptContext.Provider value={{ topic, userId, updatePrompt }}>
      {children}
    </PromptContext.Provider>
  );
}

export default PromptContextProvider;
