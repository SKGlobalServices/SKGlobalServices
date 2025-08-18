export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export type TranslatedService = {
  id: string | number;
  front_title: string;
  front_text: string;
  page_title?: string;
  page_description?: string;
  features?: { title: string; description: string }[];
};

export type ServiceImage = {
  id: string | number;
  front: { img: string };
};

export type ServiceImages = {
  id: string | number;
  cardImg: string;
  carouselImg: string;
};

// UI helper type for components that need to render images/icons along with translated data
export type UIService = TranslatedService & {
  img?: string;
  icon?: string;
  cardImg?: string;
  carouselImg?: string;
};

// Security types
export interface SecurityState {
  attemptCount: number;
  lastSubmissionTime: number;
  isBlocked: boolean;
  blockEndTime: number;
  suspiciousActivity: boolean;
}

export interface SecurityMetrics {
  timeOnPage: number;
  mouseMoves: number;
  keystrokes: number;
  focusEvents: number;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: string[];
  spamScore: number;
}