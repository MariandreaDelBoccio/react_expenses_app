import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  Timestamp,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import { Helmet } from "react-helmet-async";
import { Header, Title } from "../elements/Header";
import BackBtn from "../elements/BackBtn";
import CategoryICon from "../elements/CategoryIcons";
import {
  ActionButton,
  ButtonContainer,
  Category,
  ElementList,
} from "../elements/ListElements";
import formatCurrency from "../functions/currencyConvertion";
import DeleteIcon from "../assets/images/borrar.svg?react";
import EditIcon from "../assets/images/editar.svg?react";

type Hucha = {
  id: string;
  name: string;
  goal: number;
  description: string;
  color: string;
  deadline: Timestamp;
  savings: Saving[];
  remaining: number;
};

type Saving = {
  amount: number;
};

type HuchaConAhorros = Hucha & {
  savings: Saving[];
  remaining: number;
};

export default function HuchasList() {
  const [huchas, setHuchas] = useState<Hucha[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const formatDate = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'huchas'), where('userId', '==', user.uid));
    const unsub = onSnapshot(q, async (snapshot) => {
      const huchasData: HuchaConAhorros[] = [];

      for (const docSnap of snapshot.docs) {
        const huchaData = { id: docSnap.id, ...docSnap.data() } as Hucha;

        const savingsSnapshot = await getDocs(
          collection(db, "huchas", docSnap.id, "savings"),
        );
        const savings = savingsSnapshot.docs.map((s) => s.data() as Saving);

        const totalSaved = savings.reduce((acc, s) => acc + s.amount, 0);
        const remaining = huchaData.goal - totalSaved;

        huchasData.push({ ...huchaData, savings, remaining });
      }
      setHuchas(huchasData);
    });

    return () => unsub();
  }, [user]);

  const deleteHucha = async (id: string) => {
    await deleteDoc(doc(db, "huchas", id));
    navigate("/money-box");
  };

  return (
    <>
      <Helmet>
        <title>Piggy Bank</title>
        <link rel="icon" type="image/x-icon" href="../public/favicon.ico" />
      </Helmet>
      <Header>
        <BackBtn />
        <Title>Piggy Bank</Title>
      </Header>
      <div style={{ padding: "2.5rem", width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {huchas.map((hucha) => (
            <div
            onClick={() => navigate(`/money-box/${hucha.id}`)}
              key={hucha.id}
              style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
            >
              <div
                style={{
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  borderLeft: `6px solid ${hucha.color}`,
                  backgroundColor: "#f9fafb",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Category>
                    <CategoryICon id={hucha.name} />
                    {hucha.name}
                  </Category>

                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#555",
                      marginTop: "1rem",
                    }}
                  >
                    {hucha.description}
                  </p>
                  <p style={{ fontSize: "1rem" }}>
                    <strong>Goal:</strong> {formatCurrency(hucha.goal)}
                  </p>
                  {hucha.deadline && (
                    <p style={{ fontSize: "1rem" }}>
                      <strong>Deadline:</strong> {formatDate(hucha.deadline)}
                    </p>
                  )}
                  <p style={{ fontSize: "1rem" }}>
                    <>
                      {hucha.savings ? (
                        <>
                          <strong>Remaining: </strong>
                          {formatCurrency(hucha.remaining)}
                        </>
                      ) : (
                        <span>0</span>
                      )}
                    </>
                  </p>
                </div>
                <ElementList style={{ borderBottom: "none" }}>
                  <ButtonContainer>
                    <ActionButton as={Link} to={`/money-box/${hucha.id}`}>
                      <EditIcon />
                    </ActionButton>
                    <ActionButton
                      onClick={() => deleteHucha(hucha.id as string)}
                    >
                      <DeleteIcon />
                    </ActionButton>
                  </ButtonContainer>
                </ElementList>
              </div>
            </div>
          ))}
        </div>
        <Link
          to="/money-box/new"
          style={{
            marginTop: "2rem",
            display: "block",
            textAlign: "center",
            backgroundColor: "#5B69E2",
            color: "white",
            padding: "1rem",
            borderRadius: "0.5rem",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          + New Box
        </Link>
      </div>
    </>
  );
}
