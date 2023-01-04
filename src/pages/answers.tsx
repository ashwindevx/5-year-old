import { type NextPage } from "next";
import Link from "next/link";
import Answer from "../components/Answer";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

interface Answers {
  topic: string;
  answerText: string;
  user: string;
}

const Answers: NextPage = () => {
  const [user] = useAuthState(auth);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAnswers = async () => {
      setLoading(true);
      if (user) {
        const collectionRef = collection(db, "answers");
        const q = query(collectionRef, where("user", "==", user.uid));
        onSnapshot(q, (snapshot) => {
          const data: Answer[] = snapshot.docs.map((doc) => {
            const { topic, answerText, user, key } = doc.data();
            return {
              topic,
              answerText,
              user,
              key,
            };
          });
          setAnswers(data);
          setLoading(false);
        });
      }
    };
    fetchAnswers();
  }, [user]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-violet-500 to-violet-800 pb-20">
      <h1 className="my-20 text-center text-3xl font-bold text-white">
        Answers
      </h1>
      {loading && (
        <h4 className="mt-10 text-2xl font-bold text-white">Loading...</h4>
      )}
      {answers && !loading ? (
        <div className="grid max-w-7xl grid-cols-3 gap-5">
          {answers.map(({ topic, answerText }) => {
            return (
              <Answer
                topic={topic}
                answerText={answerText}
                key={crypto.randomUUID()}
              />
            );
          })}
        </div>
      ) : (
        ""
      )}
      {answers.length == 0 && (
        <div className="flex flex-col items-center">
          <p className="text-xl font-semibold text-white">
            Could not find any saved topic&apos;s answers yet!
          </p>
          <Link href="/" className="mt-10 text-white underline">
            Search Topic &gt;
          </Link>
        </div>
      )}
    </main>
  );
};

export default Answers;
