import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useCallback } from "react";

type ServiceModalProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export default function ServiceModal({ title, description, icon, isOpen, onClose }: ServiceModalProps) {
  // Evita el scroll del fondo cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-lg z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose} // Cierra al hacer clic fuera del modal
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-gray-900/80 backdrop-blur-2xl p-8 rounded-2xl shadow-2xl border border-gray-700/40 relative max-w-lg w-full mx-4 text-center"
          onClick={(e) => e.stopPropagation()} // Evita que el clic cierre el modal cuando se hace dentro
        >
          {/* Botón de cierre */}
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-400 transition"
            onClick={onClose}
          >
            <X size={28} />
          </button>

          {/* Icono del servicio */}
          <motion.div
            className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-white/10 shadow-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {icon}
          </motion.div>

          {/* Título y descripción */}
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          <p className="text-gray-300 mt-3 text-lg leading-relaxed">{description}</p>

          {/* Efecto visual en el fondo */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-500/30 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-10 -left-10 w-24 h-24 bg-indigo-500/30 rounded-full blur-3xl opacity-50" />

          {/* Cierre con botón */}
          <motion.button
            onClick={onClose}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cerrar
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
