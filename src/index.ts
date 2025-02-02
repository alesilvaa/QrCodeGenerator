import express, { Request, Response } from "express";
import cors from "cors";
import QRCode from "qrcode";

const app = express();

app.use(cors());

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

// Si se ejecuta de forma directa (por ejemplo, en desarrollo), inicia el servidor
if (require.main === module) {
  app.listen(3000, () => {
    console.log(`Servidor corriendo en http://localhost:3000`);
  });
}

export default app;
