import express from "express";
import multer from "multer";
import {
  obtenerGatos,
  registrarGato,actualizarGato,
  eliminarGato,buscarGatos,
  enviarGatosPorEmail,   // Importe el nuevo controlador
} from "../controllers/gato.controllers.js";
import { capturarInfoSolicitud } from "../middlewares/auditoria.js";



const router = express.Router();

router.use(capturarInfoSolicitud); 
router.get('/gatos/enviar-email', enviarGatosPorEmail);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post("/gato", 
  upload.single("imagen"), 
  registrarGato);

router.put("/gato/:id", 
  upload.single("imagen"),
  actualizarGato);

router.delete("/gato/:id", eliminarGato);

router.get("/gatos/buscar", buscarGatos);   // nueva ruta

router.get("/gatos", obtenerGatos);

export default router;