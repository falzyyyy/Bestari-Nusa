"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = "Ya, Hapus",
  cancelText = "Batal",
  onConfirm,
  onCancel
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop with premium blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-background/80 backdrop-blur-md cursor-pointer"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md bg-card border border-border/80 rounded-2xl shadow-xl overflow-hidden z-10 p-6 flex flex-col space-y-5"
          >
            {/* Close Icon in corner */}
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-primary-soft text-muted hover:text-foreground transition-colors cursor-pointer"
              aria-label="Tutup Dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content Row */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-500/10 text-red-500 rounded-xl shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 text-left">
                <h3 className="text-sm md:text-base font-bold text-white tracking-tight">
                  {title}
                </h3>
                <p className="text-xs md:text-sm text-muted leading-relaxed font-sans font-light">
                  {message}
                </p>
              </div>
            </div>

            {/* Actions Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={onCancel}
                className="px-4 py-2 border border-border bg-card hover:bg-primary-soft/30 text-foreground rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                {cancelText}
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onCancel();
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm shadow-red-900/10"
              >
                {confirmText}
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
