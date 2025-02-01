import express, { Request, Response } from "express";
import cors from "cors";
import QRCode from "qrcode";

const app = express();
const port = 3000;

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

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
