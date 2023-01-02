import { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, addDoc } from "@firebase/firestore";

import { Formik, Form, Field } from "formik";
import { useAuthState } from "react-firebase-hooks/auth";
import { PromptContext } from "../context/promptContext";

const Main = () => {
  const handleLogout = async () => {
    await signOut(auth);
  };

  const { prompt, updatePrompt } = useContext(PromptContext);

  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const [user] = useAuthState(auth);

  useEffect(() => {
    const saveAnswer = async () => {
      const collectionRef = collection(db, "answers");
      if (answer && user)
        await addDoc(collectionRef, {
          topic: prompt.topic,
          answerText: answer,
          user: user.uid,
        });
    };

    saveAnswer();
  }, [answer]);

  const initialValue = {
    topic: "",
  };

  const fetchData = async (values: { topic: string }) => {
    const prompt = `Explain ${values.topic} to a 5 year old.`;
    updatePrompt({ topic: values.topic, user: user.uid });

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + String(process.env.NEXT_PUBLIC_OPENAI_API_KEY),
      },
      body: JSON.stringify({
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    };

    setLoading(true);

    const data = await fetch(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => setAnswer(res.choices[0].text));
    setLoading(false);
    setCopied(false);
    return data;
  };

  function copyText(text: string) {
    const textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    setCopied(true);
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-violet-500 to-violet-800">
      <div className="flex flex-col items-center">
        <p className="mb-3 text-2xl font-bold text-white">Explanation for:</p>
        <Formik
          initialValues={initialValue}
          onSubmit={(values) => fetchData(values)}
        >
          <Form className="flex flex-col items-center">
            <Field
              name="topic"
              placeholder="recursion, optional chaining, etc"
              className="w-96 rounded-full border border-gray-50 bg-violet-400 py-4 px-8 placeholder:text-slate-300"
            />
            <button
              className="mt-8 rounded-full bg-black px-8 py-4 text-xl text-white"
              type="submit"
            >
              Generate
            </button>
          </Form>
        </Formik>
      </div>
      {loading && (
        <h4 className="mt-10 text-2xl font-bold text-white">Loading...</h4>
      )}
      {answer && !loading ? (
        <div className="mt-20 h-full w-1/2 rounded-3xl border-2 border-white p-4 text-white">
          <p>{answer}</p>
          <button
            onClick={() => copyText(answer)}
            className="mt-4 rounded-full bg-white px-4 py-2 text-black"
          >
            {copied ? "Copied!" : "Copy Text"}
          </button>
        </div>
      ) : (
        <div></div>
      )}
      <a href="/answers" className="mt-10 text-white underline">
        Your saved Answers &gt;
      </a>
      <button
        className="text-md mt-16 rounded-full border-2 border-slate-300 px-4 py-2 text-slate-300"
        onClick={handleLogout}
      >
        Logout
      </button>
    </main>
  );
};

export default Main;
