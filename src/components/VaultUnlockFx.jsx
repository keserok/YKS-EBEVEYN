import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Unlock, ShieldAlert } from 'lucide-react';

export default function VaultUnlockFx({ onComplete }) {
  useEffect(() => {
    // 2.2 seconds cinematic transition
    const timer = setTimeout(() => {
      onComplete();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian-deep overflow-hidden select-none">
      {/* Glitch & Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_51%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

      {/* Vibration / Glitch Container */}
      <div className="animate-vault-glitch text-center px-6 relative z-10 flex flex-col items-center">
        {/* Animated Vault Ring */}
        <div className="relative mb-8">
          <motion.div
            initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
            animate={{ rotate: 360, scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-32 h-32 rounded-full border-2 border-dashed border-gold/60 flex items-center justify-center relative"
          >
            <div className="w-24 h-24 rounded-full border border-gold/30 flex items-center justify-center bg-gold/10 backdrop-blur-xl">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <Unlock className="w-10 h-10 text-gold" />
              </motion.div>
            </div>
          </motion.div>

          {/* Pulse Ripple */}
          <div className="absolute inset-0 rounded-full bg-gold/20 animate-ping opacity-40" />
        </div>

        {/* Security Warning & Unlocked Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-[10px] font-mono tracking-widest text-red-400 uppercase">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>GİZLİ KONTROL KANALI TESPİT EDİLDİ</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-4xl text-architectural-white font-bold tracking-widest">
            MEDİART VAULT UNLOCKED
          </h2>

          <p className="text-xs font-mono text-gold tracking-widest uppercase">
            KİMLİK DOĞRULANDI • AJANS YÖNETİM MERKEZİ BAŞLATILIYOR...
          </p>
        </motion.div>

        {/* Data Stream Line */}
        <div className="w-64 h-1 bg-white/10 rounded-full mt-8 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-red-500 via-gold to-gold-light"
          />
        </div>
      </div>
    </div>
  );
}
