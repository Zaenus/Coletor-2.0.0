document.addEventListener("DOMContentLoaded", function() {
    // Function to start barcode scanning
    function startBarcodeScanning(video) {
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: video
            },
            decoder: {
                readers: ["ean_reader"]
            }
        }, function(err) {
            if (err) {
                console.error("Error initializing Quagga:", err);
                alert("Error initializing Quagga. Please make sure your camera is accessible and try again.");
                return;
            }
            // Visual feedback that scanning has started
            document.querySelector('.status').textContent = "Scanning...";
            console.log("Quagga initialization successful");
            Quagga.start();
        });

        // Callback for when a barcode is detected
        Quagga.onDetected(function(result) {
            var code = result.codeResult.code;
            stopBarcodeScanning(); // Stop scanning after detecting a barcode
            // Pass the barcode information back to the previous page
            sendBarcodeToPreviousPage(code);
        });
    }

    // Function to stop barcode scanning
    function stopBarcodeScanning() {
        Quagga.stop();
        // Visual feedback that scanning has stopped
        document.querySelector('.status').textContent = "Scanning stopped";
    }

    // Function to send barcode information back to the previous page
    function sendBarcodeToPreviousPage(barcode) {
        // Close the current page
        window.close();

        // Access the opener window (previous page) and pass the selected barcode
        if (window.opener) {
            window.opener.handleSelectedBarcode(barcode);
        }
    }

    // Event listener for button click to start barcode scanning
    document.querySelector('.contagem-iniciar').addEventListener('click', function() {
        // Check if camera access is granted
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
                // Once camera access is granted, start barcode scanning
                console.log("Camera access granted, starting barcode scanning...");
                var video = document.createElement('video');
                video.setAttribute('autoplay', '');
                video.setAttribute('playsinline', ''); // For Safari compatibility
                document.querySelector('#scanner-container').appendChild(video);
                video.onloadedmetadata = function() {
                    console.log("Video stream loaded, starting barcode scanning...");
                    startBarcodeScanning(video);
                };
                video.srcObject = stream;
            }).catch(function(err) {
                console.error("Error accessing camera:", err);
                alert("Error accessing camera. Please grant camera access and try again.");
            });
        } else {
            console.error("getUserMedia not supported");
            alert("Your browser does not support camera access. Please try again with a different browser.");
        }
    });

    // Event listener for button click to stop barcode scanning
    document.querySelector('.stop-scanning').addEventListener('click', function() {
        stopBarcodeScanning();
    });
});