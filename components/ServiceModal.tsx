import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ServiceModalProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export default function ServiceModal({ title, description, icon, isOpen, onClose }: ServiceModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Evita el scroll del fondo cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Focus al modal para accesibilidad
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup al desmontar
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Cierra el modal con "Escape"
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // Maneja clics fuera del modal
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[12px] z-[9999]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="bg-slate-50/90 dark:bg-[#050505]/90 backdrop-blur-2xl p-8 md:p-12 rounded-[2rem] shadow-[0_32px_64px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_rgba(0,0,0,0.5)] border border-black/10 dark:border-white/10 relative max-w-xl w-full mx-4 text-center overflow-hidden"
          onClick={(e) => e.stopPropagation()} 
        >
          {/* Botón de cierre */}
          <button
            className="absolute top-6 right-6 text-foreground/50 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-full transition-all duration-300 z-50"
            onClick={onClose}
          >
            <X size={28} />
          </button>

          {/* Icono del servicio */}
          <motion.div
            className="w-20 h-20 mx-auto mb-8 flex items-center justify-center rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {icon}
          </motion.div>

          {/* Título y descripción */}
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight z-10 relative">{title}</h2>
          <p className="text-foreground/70 mt-4 text-base md:text-lg leading-relaxed z-10 relative">{description}</p>

          {/* Efectos visuales en el fondo abstractos */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand/10 rounded-full blur-[80px] opacity-70 pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] opacity-70 pointer-events-none" />

          {/* Cierre con botón CTA estético */}
          <motion.button
            onClick={onClose}
            className="mt-10 px-8 py-4 bg-brand text-brand-foreground rounded-xl font-semibold opacity-90 hover:opacity-100 shadow-[0_0_20px_rgba(33,150,243,0.3)] transition-all z-10 relative"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Entendido
          </motion.button>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
