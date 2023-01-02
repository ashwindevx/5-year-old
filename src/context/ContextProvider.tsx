import { useState } from "react";
import { PromptContext } from "./promptContext";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [prompt, setPrompt] = useState({
    topic: "",
    user: "",
  });

  const updatePrompt = (prompt: { topic: string; user: string }) => {
    setPrompt(prompt);
  };

  return (
    <PromptContext.Provider value={{ prompt, updatePrompt }}>
      {children}
    </PromptContext.Provider>
  );
};

export default ContextProvider;
