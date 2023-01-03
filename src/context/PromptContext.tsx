import { createContext } from "react";

interface ContextType {
  topic: string;
  userId: string;
  updatePrompt: (newTopic: string, newUser: string) => void;
}

export const PromptContext = createContext<ContextType>({
  topic: "",
  userId: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updatePrompt: () => {},
});
