import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button, CircularProgress, Snackbar } from '@mui/material';

type Props = {
  targetId: string; // id del elemento DOM a capturar
  fileName?: string;
  className?: string;
  beforeCapture?: () => Promise<void> | void;
  afterCapture?: () => Promise<void> | void;
};

const DownloadPdf: React.FC<Props> = ({ targetId, fileName = 'informe_nutricion.pdf', className, beforeCapture, afterCapture }) => {
  const [loading, setLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');

  const handleDownload = async () => {
    const element = document.getElementById(targetId);
    if (!element) {
      console.error('Elemento no encontrado para generar PDF:', targetId);
      setSnackMsg('Elemento no encontrado para exportar');
      setSnackOpen(true);
      return;
    }

    try {
      if (beforeCapture) await beforeCapture();
      // esperar un momento para que el DOM se actualice si beforeCapture cambia la UI
      await new Promise((res) => setTimeout(res, 300));
      setLoading(true);

      const scale = 2;
      const canvas = await html2canvas(element, { scale, useCORS: true });

      const pdf = new jsPDF('portrait', 'pt', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const headerHeight = 40; // pts
      const footerHeight = 30; // pts

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = pdfWidth / canvasWidth;
      // calcular la altura disponible para la imagen en px (considerando header/footer)
      const pageHeightPx = Math.floor((pdfHeight - headerHeight - footerHeight) / ratio);

      let y = 0;
      let page = 0;

      while (y < canvasHeight) {
        const sliceHeight = Math.min(pageHeightPx, canvasHeight - y);
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvasWidth;
        pageCanvas.height = sliceHeight;
        const pageCtx = pageCanvas.getContext('2d')!;
        pageCtx.drawImage(canvas, 0, y, canvasWidth, sliceHeight, 0, 0, canvasWidth, sliceHeight);

        const imgData = pageCanvas.toDataURL('image/jpeg', 0.95);

        if (page > 0) pdf.addPage();
        // dibujar imagen desplazada para dejar espacio al header
        pdf.addImage(imgData, 'JPEG', 0, headerHeight, pdfWidth, sliceHeight * ratio);

        y += sliceHeight;
        page += 1;
      }

      // añadir header/footer y numeración en cada página
      const total = pdf.getNumberOfPages();
      const today = new Date().toLocaleDateString();
      for (let i = 1; i <= total; i++) {
        pdf.setPage(i);
        pdf.setFontSize(12);
        pdf.text('Informe: Nutrición Holística', pdfWidth / 2, 20, { align: 'center' });
        pdf.setFontSize(9);
        pdf.text(today, pdfWidth - 40, 20, { align: 'right' });
        pdf.text(`Página ${i} de ${total}`, pdfWidth / 2, pdfHeight - 10, { align: 'center' });
      }

      pdf.save(fileName);
      setSnackMsg('PDF generado correctamente');
      setSnackOpen(true);
    } catch (err) {
      console.error('Error generando PDF:', err);
      setSnackMsg('Error al generar PDF');
      setSnackOpen(true);
    } finally {
      setLoading(false);
      if (afterCapture) await afterCapture();
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleDownload} disabled={loading} className={className}>
        {loading ? <CircularProgress size={20} color="inherit" /> : 'Descargar Informe (PDF)'}
      </Button>
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        message={snackMsg}
      />
    </>
  );
};

export default DownloadPdf;
