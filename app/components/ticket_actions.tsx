import { useEffect, useState, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import type { Firestore} from 'firebase/firestore/lite';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { firebaseConfig } from '~/api-keys';

export default function TicketActions(props: {ticketId: string}) {
  const [firestoreDb, setFirestoreDb] = useState<Firestore|null>(null);
  const [ticketInfo, setTicketInfo] = useState({}|null);

  const initializeFirebase = useCallback(async () => {
    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp);
    setFirestoreDb(db);
    const orderObj = await getDoc(doc(db, 'orders', props.ticketId));
    if (orderObj.exists()) {
      setTicketInfo(orderObj.data());
    }
  }, [props.ticketId]);

  const checkInTicket = async () => {
    await updateDoc(doc(firestoreDb, 'orders', props.ticketId), {
      checkedIn: true,
    });
    const orderObj = await getDoc(doc(firestoreDb, 'orders', props.ticketId));
    setTicketInfo(orderObj.data());
  }

  const checkOutTicket = async () => {
    await updateDoc(doc(firestoreDb, 'orders', props.ticketId), {
      checkedIn: false,
    });
    const orderObj = await getDoc(doc(firestoreDb, 'orders', props.ticketId));
    setTicketInfo(orderObj.data());
  }

  useEffect(() => {
    initializeFirebase();
  }, [initializeFirebase]);

  return (
    <div className="p-3">
      Ticket ID: {props.ticketId}
      {!firestoreDb &&(<span>Loading Firestore DB</span>)}
      {firestoreDb && (
        <div>
          {!ticketInfo && (<span>Loading ticket</span>)}
          {ticketInfo && (<div>
            <div>Full Name: {ticketInfo.fullname || 'No name provided'}</div>
            <div>Paid: {ticketInfo.paid ? "Paid" : "Not paid"}</div>
            <div>Quantity: {ticketInfo.quantity || "0"}</div>
            <div>Contact: {ticketInfo.phone} {ticketInfo.email}</div>
            {ticketInfo.checkedIn && (<div className="text-green-800 text-lg">Checked In</div>)}
            {!ticketInfo.checkedIn && (<div className="text-red-800 text-lg">Checked Out</div>)}
            {!ticketInfo.checkedIn && (<div><button className="bg-orange-800 text-white px-3 py-1 rounded-md" onClick={checkInTicket}>Check In {ticketInfo.fullname}</button></div>)}
            {ticketInfo.checkedIn && (<div><button className="bg-orange-800 text-white px-3 py-1 rounded-md" onClick={checkOutTicket}>Check Out {ticketInfo.fullname}</button></div>)}
          </div>)}
        </div>)}
    </div>
  );
}
