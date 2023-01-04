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
    <main className="min-h-screen w-full bg-black py-10">
      <h1 className="my-20 text-center text-8xl font-bold text-white">
        history
      </h1>
      {loading && (
        <h4 className="my-10 text-center text-2xl font-bold text-white">
          loading...
        </h4>
      )}
      {answers.length > 0 ? (
        <div className="flex flex-col items-center">
          <div className="mx-auto grid max-w-7xl grid-cols-3 gap-5 xl:grid-cols-1">
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
          <Link
            href="/"
            className="text-md mx-2 mt-20 rounded-full border-2 border-slate-300 px-4 py-2 text-slate-300"
          >
            search topic
          </Link>
        </div>
      ) : (
        ""
      )}
      {answers.length == 0 && !loading ? (
        <div className="flex flex-col items-center">
          <p className="text-xl font-semibold text-white">
            nothing to see here yet!
          </p>
          <Link
            href="/"
            className="text-md mx-2 mt-10 rounded-full border-2 border-slate-300 px-4 py-2 text-slate-300"
          >
            search topic
          </Link>
        </div>
      ) : (
        ""
      )}
    </main>
  );
};

export default Answers;
