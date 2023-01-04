import { type NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../firebase";
import Main from "../components/Main";

const Home: NextPage = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  });

  return (
    <>
      <Head>
        <title>Simplify It</title>
        <meta
          name="description"
          content="a tool built with the openai api that explains topic that a 5-year-old can understand."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Main />
    </>
  );
};

export default Home;
