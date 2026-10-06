import type { BankCard, CoreCardCategory } from '../types';

export const QUICK_RESPONSES = [
  ['👍', 'Có'],
  ['👎', 'Không'],
  ['🤷', 'Con không biết'],
] satisfies readonly BankCard[];

export const CATEGORY_LABELS: Record<CoreCardCategory, string> = {
  topic: 'Chủ đề',
  action: 'Hành động',
  emotion: 'Cảm xúc',
};

export const CARD_CATEGORY_ORDER = ['topic', 'action', 'emotion'] as const satisfies readonly CoreCardCategory[];
export const PARENT_QUESTION_LIMIT = 5;

export const PICTOGRAM_LABEL_ALIASES: Partial<Record<string, string>> = {
  'Ăn thêm': 'Muốn thêm',
  'Uống thêm': 'Muốn thêm',
  'Chỗ nghỉ': 'Ghế nghỉ',
  'No rồi': 'No',
  'Thắng': 'Thắng lượt',
  'Cần giúp': 'Cần giúp',
  'Bà': 'ba-noi',
  'bà': 'ba-noi',
};
