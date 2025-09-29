import {
  KindeAccessToken,
  KindePermissions,
} from "@kinde-oss/kinde-auth-nextjs/types";

export interface Publication {
  publication_id: string;
  count: number;
  updatedAt: Date;
}

export type PublicationFormData = {
  combinedIdAndLanguage: string; // e.g., "MA8499-AM"
  count: number;
};
export const LANGUAGE_MAP: { [key: string]: string } = {
  AM: "Amharic",
  EN: "English",
  OA: "Oromo",
  TG: "Tigrinya",
  SO: "Somali",
  AF: "Afar",
  DM: "Sidama",
  WL: "Welayta",
};

export const LANGUAGE_CODES = Object.keys(LANGUAGE_MAP); // ['AM', 'EN', ...]
export const LANGUAGE_FULL_NAMES = Object.values(LANGUAGE_MAP); // ['Amharic', 'English', ...]

export interface Role_BASE {
  role: KindeAccessToken ;
}
