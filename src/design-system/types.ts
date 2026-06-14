export type TasteTag = "Sweet" | "Mild" | "Fresh" | "Creamy" | "Full-bodied" | "Green" | "Berry" | "Spiced";

export type HealthGoal =
  | "General healthy"
  | "Fiber focus"
  | "Heart-friendly"
  | "Blood sugar conscious"
  | "Filling"
  | "Child-friendly"
  | "Gentle for sensitive stomach"
  | "Energizing";

export type Recipe = {
  id: string;
  title: string;
  description: string;
  tags: TasteTag[];
  childFriendly: boolean;
  goal: HealthGoal;
  ingredients: string[];
  why: string;
  source: string;
};

export const COLORS = {
  leaf: "#5F8A6B",
  leafDark: "#3F5F4B",
  mint: "#EFF3ED",
  berry: "#B86C7A",
  berrySoft: "#F5EDED",
  cream: "#F7F5F0",
  sand: "#F0EDE6",
  text: "#1F2A24",
  muted: "#66736B",
  border: "#E7E1D8",
  white: "#FFFFFF",
};
