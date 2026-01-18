export enum Role {
  Admin = 'Admin',
  Coordinator = 'Coordinator',
  Educator = 'Educator',
  ContentManager = 'Content Manager'
}

export type AnimationPhase = 
  | 'INITIAL'
  | 'ADMIN_CLICK'
  | 'ADMIN_EXPAND'
  | 'ADMIN_CHECKLIST'
  | 'RESET_1'
  | 'EDUCATOR_CLICK'
  | 'EDUCATOR_EXPAND'
  | 'EDUCATOR_CHECKLIST'
  | 'RESET_2';

