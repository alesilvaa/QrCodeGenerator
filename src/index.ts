import express, { Request, Response } from "express";
import QRCode from "qrcode";

const app = express();

app.get("/generate_qr", async (req: Request, res: Response): Promise<void> => {
  const url = req.query.url as string;
  if (!url) {
    res.status(400).json({ error: "Se requiere una URL válida" });
    return;
  }
  try {
    const qrCode = await QRCode.toDataURL(url);
    res.json({ qrCode });
  } catch (error) {
    res.status(500).json({ error: "Error generando el código QR" });
  }
});

// Solo para desarrollo local
if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => {
    console.log("API corriendo en http://localhost:3000");
  });
}

export default app;
