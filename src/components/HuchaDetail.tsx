import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  Timestamp,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import useAuth from "../context/useAuth";
import { Helmet } from "react-helmet-async";
import { Header, Title } from "../elements/Header";
import BackBtn from "../elements/BackBtn";
import { FilterContainer, Form, Input } from "../elements/FormElements";
import Button from "../elements/Button";
import Spinner from "../elements/SpinnerLoader";

interface Hucha {
  id: string;
  name: string;
  goal: number;
  description: string;
  color: string;
}

interface Saving {
  id: string;
  amount: number;
  createdAt: Timestamp;
}

export default function HuchaDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [hucha, setHucha] = useState<Hucha | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [savings, setSavings] = useState<Saving[]>([]);

  useEffect(() => {
    if (!user || !id) return;

    const fetchHucha = async () => {
      const docRef = doc(db, "huchas", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as DocumentData;
        setHucha({ id: docSnap.id, ...data } as Hucha);
      }
    };

    fetchHucha();

    const q = query(
      collection(db, "huchas", id, "savings"),
      where("userId", "==", user.uid),
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setSavings(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Saving, "id">),
          amount: Number(doc.data().amount),
        })),
      );
    });

    return () => unsub();
  }, [user, id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !id || Number(amount) <= 0) return;

    await addDoc(collection(db, "huchas", id, "savings"), {
      amount: Number(amount),
      userId: user.uid,
      createdAt: Timestamp.now(),
    });
    setAmount("");
  };

  const totalSaved = savings.reduce((acc, s) => acc + s.amount, 0);
  const progress = hucha ? Math.min((totalSaved / hucha.goal) * 100, 100) : 0;

  if (!hucha)
    return (
      <div>
        <p className="text-center mt-4">
          <Spinner fullscreen />
        </p>
      </div>
    );

  return (
    <>
      <Helmet>
        <title>Add Savings</title>
        <link rel="icon" type="image/x-icon" href="../public/favicon.ico" />
      </Helmet>
      <Header>
        <BackBtn route="/money-box" />
        <Title>Add Savings</Title>
      </Header>
      <div style={{ padding: "2.5rem", width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div
            style={{
              padding: "1rem",
              borderLeft: `6px solid ${hucha.color}`,
            }}
          >
            <h2 style={{ fontWeight: "700", fontSize: "1.25rem" }}>
              {hucha.name.toUpperCase()}
            </h2>
            <p style={{ fontSize: "0.875rem", color: "#555" }}>
              {hucha.description}
            </p>
            <p style={{ fontWeight: "600", fontSize: "1rem" }}>
              Savings: {totalSaved}€ / {hucha.goal}€ ({progress.toFixed(1)}%)
            </p>

            <div style={{ marginTop: "2rem", marginBottom: "4rem" }}>
              <p style={{ fontWeight: "600", fontSize: "1rem" }}>Progress</p>
              <div
                style={{
                  backgroundColor: "#e5e7eb",
                  borderRadius: "8px",
                  overflow: "hidden",
                  height: "24px",
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    backgroundColor: hucha.color || "#3b82f6",
                    height: "100%",
                    transition: "width 0.3s ease-in-out",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {progress.toFixed(0)}%
                </div>
              </div>
            </div>

            <Form onSubmit={handleSave}>
              <FilterContainer style={{ alignItems: "center" }}>
                <div style={{ flex: 1, marginRight: "1rem" }}>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    placeholder="Add saving"
                  />
                </div>
                <Button
                  as="button"
                  to="#"
                  $color={hucha.color}
                  $hasIcon
                  type="submit"
                  style={{ textAlign: "center" }}
                >
                  Add +
                </Button>
              </FilterContainer>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
