import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
    const phoneNumber = "917386376302"; // Real phone number from user
    const message = "Hello Uthsav Invitations! I'm interested in creating a digital invitation.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] flex items-center justify-center group"
        >
            <MessageCircle size={28} />
            
            {/* Tooltip */}
            <div className="absolute right-full mr-4 bg-white/90 text-[#4A2E2A] text-xs px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-[#D4AF37]/20 font-sans shadow-2xl">
                Chat with us on WhatsApp
            </div>

            {/* Pulsing Ring */}
            <div className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/40 -z-10" />
        </motion.a>
    );
};

export default WhatsAppButton;
