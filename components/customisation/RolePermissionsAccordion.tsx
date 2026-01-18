'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Role, AnimationPhase } from './types';
import { ROLES_ORDER, ADMIN_CHECKLIST, EDUCATOR_CHECKLIST } from './constants';
import RoleCard from './components/RoleCard';
import ChecklistCard from './components/ChecklistCard';

export const RolePermissionsAccordion = () => {
  const [phase, setPhase] = useState<AnimationPhase>('INITIAL');
  const [activeRole, setActiveRole] = useState<Role | null>(null);
  const [clickingRole, setClickingRole] = useState<Role | null>(null);
  const [checkedCount, setCheckedCount] = useState(0);
  
  const isChecklistVisible = phase === 'ADMIN_CHECKLIST' || phase === 'EDUCATOR_CHECKLIST';
  const currentChecklist = activeRole === Role.Admin ? ADMIN_CHECKLIST : EDUCATOR_CHECKLIST;

  // Named function expression (loop) to allow safe recursion and avoid "used before declaration" errors.
  const startLoop = useCallback(async function loop() {
    // Phase 1: Initial state
    setPhase('INITIAL');
    setActiveRole(null);
    setClickingRole(null);
    setCheckedCount(0);
    await new Promise(r => setTimeout(r, 1000));

    // Phase 2: Admin Interaction
    setClickingRole(Role.Admin);
    setPhase('ADMIN_CLICK');
    await new Promise(r => setTimeout(r, 400));
    setClickingRole(null);
    setPhase('ADMIN_EXPAND');
    setActiveRole(Role.Admin);
    await new Promise(r => setTimeout(r, 600));

    // Phase 3: Admin Checklist
    setPhase('ADMIN_CHECKLIST');
    for (let i = 1; i <= ADMIN_CHECKLIST.length; i++) {
      await new Promise(r => setTimeout(r, 500));
      setCheckedCount(i);
    }
    await new Promise(r => setTimeout(r, 1200));
    
    // Smooth reset fade out
    setPhase('RESET_1');
    setActiveRole(null);
    setCheckedCount(0);
    await new Promise(r => setTimeout(r, 1000));

    // Phase 4: Educator Interaction
    setClickingRole(Role.Educator);
    setPhase('EDUCATOR_CLICK');
    await new Promise(r => setTimeout(r, 400));
    setClickingRole(null);
    setPhase('EDUCATOR_EXPAND');
    setActiveRole(Role.Educator);
    await new Promise(r => setTimeout(r, 600));

    // Phase 5: Educator Checklist
    setPhase('EDUCATOR_CHECKLIST');
    for (let i = 1; i <= EDUCATOR_CHECKLIST.length; i++) {
      await new Promise(r => setTimeout(r, 500));
      setCheckedCount(i);
    }
    await new Promise(r => setTimeout(r, 1200));
    
    setPhase('RESET_2');
    setActiveRole(null);
    setCheckedCount(0);
    await new Promise(r => setTimeout(r, 1000));
    
    // Recursively call the local 'loop' name
    loop();
  }, []);

  useEffect(() => {
    startLoop();
  }, [startLoop]);

  const visibleRoles = activeRole 
    ? ROLES_ORDER.filter(r => r === activeRole)
    : ROLES_ORDER;

  return (
    <div className="flex flex-col items-center w-[320px] md:w-[353px] mx-auto min-h-[400px] pt-0 sm:pt-12">
      <motion.div 
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full flex flex-col items-center "
      >
        {/* Role List Container */}
        <div className="w-full flex flex-col items-start justify-start">
          <AnimatePresence mode="popLayout">
            {visibleRoles.map((role) => (
              <RoleCard 
                key={role}
                role={role}
                isActive={activeRole === role}
                isClicking={clickingRole === role}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Checklist Container */}
        <div className="w-full flex flex-col items-start justify-start ">

            {isChecklistVisible && (
              <motion.div
                key={`${activeRole}-checklist`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ 
                  opacity: 0,
                  transition: { 
                    duration: 0.4, 
                    ease: "easeOut" 
                  } 
                }}
                transition={{ 
                  duration: 0.4, 
                  ease: "easeOut",
                  layout: { type: "spring", stiffness: 300, damping: 30 }
                }}
                className="w-full"
              >
                <ChecklistCard 
                  items={currentChecklist} 
                  checkedCount={checkedCount} 
                />
              </motion.div>
            )}

        </div>
      </motion.div>
    </div>
  );
};