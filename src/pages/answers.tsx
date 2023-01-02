import { type NextPage } from "next";
import Answer from "../components/Answer";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Answers: NextPage = () => {
  const [user] = useAuthState(auth);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAnswers = async () => {
      setLoading(true);
      let unsubscribe = {};
      if (user) {
        const collectionRef = collection(db, "answers");
        const q = query(collectionRef, where("user", "==", user.uid));
        unsubscribe = onSnapshot(q, (snapshot) => {
          setAnswers(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
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
    </main>
  );
};

export default Answers;
