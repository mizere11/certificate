const form = document.getElementById("certificate-form");
const certificate = document.getElementById("certificate");
const certName = document.getElementById("cert-name");
const certType = document.getElementById("cert-type");
const certCourse = document.getElementById("cert-course");
const certDate = document.getElementById("cert-date");
const qrCodeElement = document.getElementById("qr-code");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const type = document.getElementById("type").value;
  const course = document.getElementById("course").value;
  const date = document.getElementById("date").value;

  certName.textContent = name;
  certType.textContent = type === "certificate" ? "Professional Certificate" : "Professional Diploma";
  certCourse.textContent = course;
  certDate.textContent = date;

  const qrCodeData = {
    name: name,
    type: type,
    course: course,
    date: date,
  };

  const qrCode = new QRCode(qrCodeElement, {
    text: JSON.stringify(qrCodeData),
    width: 100,
    height: 100,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  certificate.style.display = "block";

  setTimeout(() => {
    // Generate PDF
    const opt = {
      margin: 1,
      filename: `Certificate-${name}-${course}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(certificate).set(opt).save().then(() => {
      // Clear the QR code and hide the certificate
      qrCode.clear();
      certificate.style.display = "none";
    });
  }, 500);
});
