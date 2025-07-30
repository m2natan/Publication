export interface Publication{
    publication_id: string;
    count: number;
}

export type PublicationFormData = {
  combinedIdAndLanguage: string; // e.g., "MA8499-AM"
  count: number;
}
export const LANGUAGE_MAP: { [key: string]: string } = {
  "AM": "Amharic",
  "EN": "English",
  "OA": "Oromo",
  "TG": "Tigrinya",
  "SO": "Somali",
  "AF": "Afar",
  "OM": "Oromo (Alt)", // Example for another Oromo variant if needed
  "SN": "Sidama",
  "HA": "Hadiyya",
  "GE": "Geez",
  "AR": "Arabic", // Up to 10+ languages
  // Add all your 10+ language codes and their full names here
};

export const LANGUAGE_CODES = Object.keys(LANGUAGE_MAP); // ['AM', 'EN', ...]
export const LANGUAGE_FULL_NAMES = Object.values(LANGUAGE_MAP); // ['Amharic', 'English', ...]
