import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, addDoc } from "@firebase/firestore";

import { Formik, Form, Field } from "formik";
import { useAuthState } from "react-firebase-hooks/auth";
import { PromptContext } from "../context/PromptContext";
import * as yup from "yup";

const keywordSchema = yup.object().shape({
  topic: yup.string().required("required"),
});

const Main = () => {
  const handleLogout = async () => {
    await signOut(auth);
  };

  const { topic, userId, updatePrompt } = useContext(PromptContext);

  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const [user] = useAuthState(auth);

  useEffect(() => {
    const saveAnswer = async () => {
      const collectionRef = collection(db, "answers");
      if (answer && user)
        await addDoc(collectionRef, {
          topic: topic,
          answerText: answer,
          user: userId,
        });
    };

    saveAnswer();
  }, [answer]);

  const initialValue = {
    topic: "",
  };

  const fetchData = async (values: { topic: string }) => {
    const prompt = `Explain ${values.topic} to a 5 year old.`;
    updatePrompt(values.topic, userId);

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
        max_tokens: 150
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
    <main className="flex min-h-screen w-full flex-col items-center justify-between bg-black py-40">
      <div className="flex flex-col items-center">
        <p className="mb-6 text-5xl font-bold text-white md:text-4xl">
          enter a keyword:
        </p>
        <Formik
          validationSchema={keywordSchema}
          initialValues={initialValue}
          onSubmit={(values) => fetchData(values)}
        >
          <Form className="flex flex-col items-center">
            <Field
              name="topic"
              placeholder="recursion, optional chaining, etc"
              className="w-96 rounded-full border border-gray-50 bg-gray-900 py-4 px-6 text-white placeholder:text-gray-400 md:w-80"
            />
            <button
              className="mt-8 rounded-full bg-white px-8 py-4 text-xl text-black"
              type="submit"
            >
              generate
            </button>
          </Form>
        </Formik>
      </div>
      <div>
        {loading && (
          <h4 className="mt-10 text-2xl font-bold text-white">loading...</h4>
        )}
        {answer && !loading ? (
          <div className="h-full max-w-sm rounded-3xl border-2 border-white p-4 text-white md:max-w-xs">
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
      </div>
      <div className="flex items-center justify-center">
        <Link
          href="/history"
          className="text-md mx-2 mt-8 rounded-full border-2 border-slate-300 px-4 py-2 text-slate-300"
        >
          history
        </Link>
        <button
          className="text-md mx-2 mt-8 rounded-full border-2 border-slate-300 px-4 py-2 text-slate-300"
          onClick={handleLogout}
        >
          logout
        </button>
      </div>
    </main>
  );
};

export default Main;
