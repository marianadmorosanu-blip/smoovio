import type { HealthGoal, TasteTag, Recipe } from "./types";

export const INGREDIENTS = [
  "Banana", "Blueberries", "Strawberries", "Raspberries", "Mango", "Apple",
  "Pear", "Orange", "Spinach", "Kale", "Carrot", "Beetroot", "Ginger",
  "Oats", "Yogurt", "Kefir", "Oat milk", "Chia seeds", "Avocado",
];

export const GOALS: HealthGoal[] = [
  "General healthy", "Fiber focus", "Heart-friendly", "Blood sugar conscious",
  "Filling", "Child-friendly", "Gentle for sensitive stomach", "Energizing",
];

export const TASTES: TasteTag[] = [
  "Sweet", "Mild", "Fresh", "Creamy", "Full-bodied", "Green", "Berry", "Spiced",
];

export const RECIPES: Recipe[] = [
  {
    id: "1",
    title: "Creamy Blueberry Balance",
    description: "Balanced berry smoothie with oats and yogurt.",
    tags: ["Sweet", "Creamy", "Berry"],
    childFriendly: true,
    goal: "Blood sugar conscious",
    ingredients: ["Banana", "Blueberries", "Oats", "Yogurt", "Oat milk", "Spinach"],
    why: "Uses fruit, oats, and yogurt for a more rounded smoothie option.",
    source: "CDC • Diabetes meal planning",
  },
  {
    id: "2",
    title: "Mild Strawberry Oat",
    description: "Soft berry flavor with a child-friendly texture.",
    tags: ["Sweet", "Mild", "Berry"],
    childFriendly: true,
    goal: "Child-friendly",
    ingredients: ["Strawberries", "Banana", "Oats", "Yogurt", "Oat milk"],
    why: "Prioritizes mild, familiar flavors and smooth texture.",
    source: "NHS • Foods for babies and young children",
  },
  {
    id: "3",
    title: "Green Daily Blend",
    description: "A greener smoothie for everyday fruit-and-veg inspiration.",
    tags: ["Green", "Fresh"],
    childFriendly: false,
    goal: "General healthy",
    ingredients: ["Apple", "Spinach", "Kale", "Avocado", "Oat milk"],
    why: "A simple way to include greens in an everyday smoothie.",
    source: "WHO • Healthy diet",
  },
  {
    id: "4",
    title: "Filling Banana Oat Smoothie",
    description: "A thicker smoothie designed to feel more satisfying.",
    tags: ["Sweet", "Creamy", "Full-bodied"],
    childFriendly: true,
    goal: "Filling",
    ingredients: ["Banana", "Oats", "Chia seeds", "Yogurt", "Oat milk"],
    why: "Oats, chia, and yogurt create a more filling texture.",
    source: "WHO • Healthy diet",
  },
  {
    id: "5",
    title: "Fresh Mango Carrot",
    description: "A bright and lively blend with mango and carrot.",
    tags: ["Fresh", "Sweet"],
    childFriendly: true,
    goal: "Energizing",
    ingredients: ["Mango", "Carrot", "Orange", "Oat milk"],
    why: "Pairs sweet fruit with vibrant color and fresh flavor.",
    source: "Livsmedelsverket • Fruit and vegetables",
  },
  {
    id: "6",
    title: "Gentle Pear Oat",
    description: "A mellow smoothie with simple flavors and soft texture.",
    tags: ["Mild", "Creamy"],
    childFriendly: true,
    goal: "Gentle for sensitive stomach",
    ingredients: ["Pear", "Oats", "Yogurt", "Oat milk"],
    why: "Uses simpler ingredients and a soft, lower-acid profile.",
    source: "NHS • Living with kidney disease",
  },
];

export const GOAL_DESCRIPTIONS: Record<HealthGoal, string> = {
  "General healthy": "Balanced smoothie ideas for everyday wellness.",
  "Fiber focus": "Options that prioritize fiber-rich ingredients.",
  "Heart-friendly": "Inspired by heart-conscious food choices.",
  "Blood sugar conscious": "More balanced smoothie combinations.",
  Filling: "Smoother ideas that feel more satisfying.",
  "Child-friendly": "Milder flavor combinations for children.",
  "Gentle for sensitive stomach": "Softer ingredient choices and calmer flavors.",
  Energizing: "Bright, fresh blends for a lively feel.",
};
