import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

import { db } from "./firebase-config";
import Attendance from "./components/Attendance";
import Navbar from "./components/Navigation";
import { Button, Form } from "react-bootstrap";
import CurrentAttendance from "./components/CurrentAttendance";

const App = () => {
  const attendanceCollectionRef = collection(db, "attendance");
  const studentRecordsCollectionRef = collection(db, "studentRecords");

  const [showCurrentAttendance, setShowCurrentAttendance] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const checkIn = async (rollNo, name, checkinTime) => {
    const q = query(
      studentRecordsCollectionRef,
      where("rollNo", "==", Number(rollNo))
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      await addDoc(studentRecordsCollectionRef, {
        rollNo: Number(rollNo),
        name: name,
      });

      await addDoc(attendanceCollectionRef, {
        rollNo: Number(rollNo),
        name: name,
        checkinTime: checkinTime,
        checkOutTime: "",
      });
    } else {
      querySnapshot.forEach((doc) => {
        if (doc.data().name !== name) {
          return alert("name doesnt match");
        }
      });

      const q1 = query(
        attendanceCollectionRef,
        where("rollNo", "==", Number(rollNo))
      );

      let checkedIn = false;
      const querySnapshot1 = await getDocs(q1);
      if (!querySnapshot1.empty) {
        querySnapshot1.forEach((doc) => {
          if (doc.data().checkOutTime.length === 0) {
            checkedIn = true;
            return alert("already checkd in");
          }
          console.log(doc.data());
        });
      }
      if (!checkedIn) {
        await addDoc(attendanceCollectionRef, {
          rollNo: Number(rollNo),
          name: name,
          checkinTime: checkinTime,
          checkOutTime: "",
        });
      }
    }
    setRefresh((prev) => prev + 1);
  };

  const checkOut = async (selectedEntryId, checkOutTime, checkinTime) => {
    const h1 = parseInt(checkinTime.substring(0, 2));
    const m1 = parseInt(checkinTime.substr(3, 5));
    const h2 = parseInt(checkOutTime.substring(0, 2));
    const m2 = parseInt(checkOutTime.substr(3, 5));

    if (h1 > h2 || (h1 === h2 && m1 > m2)) {
      return alert("Checkout should be biger than checkin");
    }

    const entryDoc = doc(db, "attendance", selectedEntryId);
    const newFields = { checkOutTime: checkOutTime };
    await updateDoc(entryDoc, newFields);
    setRefresh((prev) => prev + 1);
  };

  const deleteEntry = async (id) => {
    const entryDoc = doc(db, "attendance", id);
    await deleteDoc(entryDoc);
    setRefresh((prev) => prev + 1);
  };

  useEffect(() => {
    const getAttendance = async () => {
      const data = await getDocs(attendanceCollectionRef);
      setAttendance(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getAttendance();
  }, [refresh]);

  return (
    <div>
      <Navbar />
      <main>
        <Button
          variant="dark"
          className="m-3"
          onClick={() => {
            setShowCurrentAttendance((prev) => !prev);
          }}
        >
          {showCurrentAttendance
            ? "Show Attendance Log"
            : "Show Current Attendance"}
        </Button>
        {!showCurrentAttendance && (
          <Attendance
            attendance={attendance}
            checkOut={checkOut}
            checkIn={checkIn}
            deleteEntry={deleteEntry}
          />
        )}
        {showCurrentAttendance && <CurrentAttendance attendance={attendance} />}
      </main>
    </div>
  );
};

export default App;
