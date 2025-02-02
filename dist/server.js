"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const qrcode_1 = __importDefault(require("qrcode"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get("/generate_qr", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.query.url;
    if (!url) {
        res.status(400).json({ error: "Se requiere una URL válida" });
        return;
    }
    try {
        // Generar la imagen del código QR en base64
        const qrCode = yield qrcode_1.default.toDataURL(url);
        res.json({ qrCode });
    }
    catch (error) {
        res.status(500).json({ error: "Error generando el código QR" });
    }
}));
// Si se ejecuta de forma directa (por ejemplo, en desarrollo), inicia el servidor
if (require.main === module) {
    app.listen(3000, () => {
        console.log(`Servidor corriendo en http://localhost:3000`);
    });
}
exports.default = app;
