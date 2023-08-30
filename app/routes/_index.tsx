// import { Link } from "@remix-run/react";

// import { useOptionalUser } from "~/utils";
import { useState } from 'react';
import QrCodeScanner from '../components/qr_code_scanner';
import type { Html5QrcodeResult } from 'html5-qrcode';
import TicketActions from '../components/ticket_actions';

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
    </div>
  ) : (
    <div>
      <div className="text">Scanner:</div>
      <QrCodeScanner successCallback={onScanSuccess} errorCallback={onScanFailure}></QrCodeScanner>
    </div>
  );

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="header">
        Reunion Festival
      </div>
      {body}
    </main>
  );
}
