import { useEffect } from 'react';
import BookingSection from './BookingSection';

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  defaultItem?: string;
}

export default function BookingDialog({ isOpen, onClose, defaultItem }: BookingDialogProps) {
  // Prevent scrolling when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />
      
      {/* Dialog content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#e4ccaa] border-[4px] border-[#5E3B22] shadow-[8px_8px_0_rgba(0,0,0,0.5)] z-10 custom-scrollbar">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 z-20 text-[#5E3B22] hover:text-[#A9442A] transition-colors p-1 bg-white/30 rounded-full border-2 border-transparent hover:border-[#5E3B22] hover:bg-white/70"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        {/* The Booking Section */}
        <BookingSection key={defaultItem || Date.now()} defaultItem={defaultItem} /> 
      </div>
    </div>
  );
}
