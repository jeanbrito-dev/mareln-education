'use client';

import { useEffect, useRef } from 'react';

interface ModalConfirmacaoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  titulo: string;
  mensagem: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  tipoPerigo?: boolean;
  carregando?: boolean;
}

export default function ModalConfirmacao({
  isOpen,
  onClose,
  onConfirm,
  titulo,
  mensagem,
  textoConfirmar = 'Confirmar',
  textoCancelar = 'Cancelar',
  tipoPerigo = true,
  carregando = false,
}: ModalConfirmacaoProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        confirmButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26364A]/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget && !carregando) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#DCEEFF] p-6 space-y-5 text-left transform transition-transform"
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
              tipoPerigo ? 'bg-red-50 text-red-600' : 'bg-[#EAF4FC] text-[#5B8DEF]'
            }`}
          >
            {tipoPerigo ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>

          <div className="space-y-1.5 flex-1">
            <h3 id="modal-title" className="text-lg font-bold text-[#26364A] leading-tight">
              {titulo}
            </h3>
            <p className="text-sm text-[#718096] leading-relaxed">{mensagem}</p>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2">
          <button
            type="button"
            disabled={carregando}
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-[#718096] hover:bg-slate-50 font-semibold text-sm transition-colors disabled:opacity-50"
          >
            {textoCancelar}
          </button>
          <button
            ref={confirmButtonRef}
            type="button"
            disabled={carregando}
            onClick={onConfirm}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all shadow-sm disabled:opacity-50 ${
              tipoPerigo
                ? 'bg-red-600 hover:bg-red-700 active:bg-red-800 shadow-red-600/20'
                : 'clay-button'
            }`}
          >
            {carregando ? 'Processando...' : textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}
