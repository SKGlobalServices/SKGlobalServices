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

// UI helper type for components that need to render images/icons along with translated data
export type UIService = TranslatedService & {
  img?: string;
  icon?: string;
};
