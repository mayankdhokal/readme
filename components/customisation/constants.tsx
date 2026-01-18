import React from 'react';
import { CaretDown, CaretUp, Check } from '@phosphor-icons/react';
import { Role } from './types';

export const ROLES_ORDER: Role[] = [
  Role.Admin,
  Role.Coordinator,
  Role.Educator,
  Role.ContentManager
];

export const ADMIN_CHECKLIST = [
  "Can add learner",
  "Can add Educator",
  "Can see reports"
];

export const EDUCATOR_CHECKLIST = [
  "Can edit",
  "Can delete shared content",
  "Can assign content"
];

export const ChevronDownIcon = () => (
  <CaretDown size={20} weight="bold" className="text-gray-800" />
);

export const ChevronUpIcon = () => (
  <CaretUp size={20} weight="bold" className="text-gray-800" />
);

export const CheckIcon = () => (
  <Check size={16} weight="bold" className="text-white" />
);

