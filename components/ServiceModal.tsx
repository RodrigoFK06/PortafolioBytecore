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

  if (!mounted || !isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 flex items-center justify-center bg-foreground/30 z-[9999] animate-in fade-in duration-200"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-background p-8 md:p-12 rounded-lg shadow-hairline-md shadow-2xl relative max-w-xl w-full mx-4 text-center animate-in fade-in slide-in-from-bottom-2 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cierre */}
        <button
          className="absolute top-5 right-5 text-muted-foreground hover:text-foreground hover:bg-secondary p-2 rounded-md transition-colors"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <X size={24} />
        </button>

        {/* Icono del servicio */}
        <div className="w-20 h-20 mx-auto mb-8 flex items-center justify-center rounded-md bg-secondary shadow-hairline">
          {icon}
        </div>

        {/* Título y descripción */}
        <h2 id="modal-title" className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          {title}
        </h2>
        <p id="modal-description" className="text-muted-foreground mt-4 text-base md:text-lg leading-relaxed">
          {description}
        </p>

        {/* Cierre */}
        <button
          onClick={onClose}
          className="mt-10 px-8 py-3.5 bg-brand text-brand-foreground rounded-md text-sm font-semibold hover:bg-brand/90 transition-colors"
        >
          Entendido
        </button>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
