import type { QrcodeErrorCallback, QrcodeSuccessCallback } from 'html5-qrcode';
import { Html5QrcodeScanType, Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { useEffect } from 'react';

const qrcodeRegionId = "qrcode-scanner";
export default function QrCodeScanner(props: {successCallback: QrcodeSuccessCallback, errorCallback: QrcodeErrorCallback }) {
    useEffect(() => {
        if (!(props.successCallback)) {
            throw "qrCodeSuccessCallback is required callback.";
        }

        const qrScannerConfig = {
          rememberLastUsedCamera: true,
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
          formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
          showTorchButtonIfSupported: true,
          showZoomSliderIfSupported: true,
          fps: 10,
          qrbox: {width: 500, height: 500},
        };
        const qrcodeScanner = new Html5QrcodeScanner(
          qrcodeRegionId,
          qrScannerConfig,
          /* verbose= */ false);

        qrcodeScanner.render(props.successCallback, props.errorCallback);

        return () => {
          qrcodeScanner.clear().catch(error => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    }, [props.successCallback, props.errorCallback]);

    return (
        <div id={qrcodeRegionId} />
    );
};
