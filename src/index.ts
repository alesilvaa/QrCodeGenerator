import express, { Request, Response } from "express";
import cors from "cors";
import QRCode from "qrcode";
import path from "path";

const app = express();

// Habilitar CORS (aunque si el front se sirve desde el mismo dominio, no es estrictamente necesario)
app.use(cors());

// Ruta explícita para la raíz ("/") que envía index.html
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Sirve archivos estáticos (CSS, JS, imágenes, etc.) desde la carpeta "public"
app.use(express.static(path.join(__dirname, "../public")));

// Endpoint para generar el QR
app.get("/generate_qr", async (req: Request, res: Response): Promise<void> => {
  const url = req.query.url as string;
  if (!url) {
    res.status(400).json({ error: "Se requiere una URL válida" });
    return;
  }
  try {
    // Generar la imagen del código QR en base64
    const qrCode = await QRCode.toDataURL(url);
    res.json({ qrCode });
  } catch (error) {
    res.status(500).json({ error: "Error generando el código QR" });
  }
});

// Solo iniciamos el servidor en modo no producción
if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
  });
}

export default app;
