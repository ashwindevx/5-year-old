import { type NextPage } from "next";
import Head from "next/head";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { PromptContext } from "../context/PromptContext";

const Login: NextPage = () => {
  const provider = new GoogleAuthProvider();
  const [user] = useAuthState(auth);

  const { updatePrompt } = useContext(PromptContext);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
      updatePrompt("", user.uid);
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Login - Simplify It</title>
        <meta property="og:image" content="../../public/thumbnail.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          name="description"
          content="a tool built with the openai api that explains topic that a 5-year-old can understand."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black pb-64 md:px-2">
        <h1 className="mb-4 text-9xl font-bold text-white md:text-7xl">
          simplify it
        </h1>
        <h3 className="mb-20 max-w-xl text-center text-xl font-normal lowercase text-neutral-400 md:text-lg">
          A tool built with the OpenAI API that explains topic that a 5-year-old
          can understand.
        </h3>
        <button
          className="rounded-full bg-white px-8 py-4 text-xl text-black"
          onClick={handleLogin}
        >
          login
        </button>
      </div>
    </>
  );
};

export default Login;
