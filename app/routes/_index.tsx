// import { Link } from "@remix-run/react";

// import { useOptionalUser } from "~/utils";
import { useState } from 'react';
import QrCodeScanner from '../components/qr_code_scanner';
import type { Html5QrcodeResult } from 'html5-qrcode';
import TicketActions from '../components/ticket_actions';
import frog from '~/assets/frog.png';

export default function Index() {
  const [decodedQr, setDecodedQr] = useState<string|null>(null);

  const onScanSuccess = (decodedText: string, result: Html5QrcodeResult) => {
    setDecodedQr(decodedText);
  };

  const onScanFailure = (errorMessage: string, error: {errorMessage: string, type: 0|1|2}) => {
    console.log(errorMessage, error);
  };

  const body = decodedQr ? (
    <div>
      <TicketActions ticketId={decodedQr}></TicketActions>
      <button className="mx-3 bg-cyan-900 text-white px-3 py-1 rounded-md" onClick={() => {
        setDecodedQr(null);
        window.location.reload();
      }}>Back to scanner</button>
    </div>
  ) : (
    <div>
      <div>Please scan the ticket:</div>
      <QrCodeScanner successCallback={onScanSuccess} errorCallback={onScanFailure}></QrCodeScanner>
    </div>
  );

  return (
    <main className="min-h-screen bg-lime-100 flex flex-col items-center justify-center">
      <img src={frog} alt="frog logo" width="100px" height="100px" />
      <h1 className="text-2xl">Festivall Ticket Scanner</h1>
      <h2 className="text-xl mb-6">Reunion 2023</h2>
      {body}
    </main>
  );
}
