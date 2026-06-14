import type { Ingredient } from '@/types';

export const ingredients: Ingredient[] = [
  // Fruits
  { id: 'banana', name: { en: 'Banana', sv: 'Banan', fr: 'Banane', es: 'Plátano', it: 'Banana', ro: 'Banană', de: 'Banane' }, category: 'fruits', emoji: '🍌' },
  { id: 'strawberry', name: { en: 'Strawberry', sv: 'Jordgubbe', fr: 'Fraise', es: 'Fresa', it: 'Fragola', ro: 'Căpșună', de: 'Erdbeere' }, category: 'fruits', emoji: '🍓' },
  { id: 'blueberry', name: { en: 'Blueberry', sv: 'Blåbär', fr: 'Myrtille', es: 'Arándano', it: 'Mirtillo', ro: 'Afină', de: 'Heidelbeere' }, category: 'fruits', emoji: '🫐' },
  { id: 'mango', name: { en: 'Mango', sv: 'Mango', fr: 'Mangue', es: 'Mango', it: 'Mango', ro: 'Mango', de: 'Mango' }, category: 'fruits', emoji: '🥭' },
  { id: 'apple', name: { en: 'Apple', sv: 'Äpple', fr: 'Pomme', es: 'Manzana', it: 'Mela', ro: 'Măr', de: 'Apfel' }, category: 'fruits', emoji: '🍎' },
  { id: 'pineapple', name: { en: 'Pineapple', sv: 'Ananas', fr: 'Ananas', es: 'Piña', it: 'Ananas', ro: 'Ananas', de: 'Ananas' }, category: 'fruits', emoji: '🍍' },
  { id: 'avocado', name: { en: 'Avocado', sv: 'Avokado', fr: 'Avocat', es: 'Aguacate', it: 'Avocado', ro: 'Avocado', de: 'Avocado' }, category: 'fruits', emoji: '🥑' },
  { id: 'raspberry', name: { en: 'Raspberry', sv: 'Hallon', fr: 'Framboise', es: 'Frambuesa', it: 'Lampone', ro: 'Zmeură', de: 'Himbeere' }, category: 'fruits', emoji: '🫐' },
  // Vegetables
  { id: 'spinach', name: { en: 'Spinach', sv: 'Spenat', fr: 'Épinard', es: 'Espinaca', it: 'Spinaci', ro: 'Spanac', de: 'Spinat' }, category: 'vegetables', emoji: '🥬' },
  { id: 'kale', name: { en: 'Kale', sv: 'Grönkål', fr: 'Chou frisé', es: 'Col rizada', it: 'Cavolo riccio', ro: 'Kale', de: 'Grünkohl' }, category: 'vegetables', emoji: '🥬' },
  { id: 'carrot', name: { en: 'Carrot', sv: 'Morot', fr: 'Carotte', es: 'Zanahoria', it: 'Carota', ro: 'Morcov', de: 'Karotte' }, category: 'vegetables', emoji: '🥕' },
  { id: 'cucumber', name: { en: 'Cucumber', sv: 'Gurka', fr: 'Concombre', es: 'Pepino', it: 'Cetriolo', ro: 'Castravete', de: 'Gurke' }, category: 'vegetables', emoji: '🥒' },
  { id: 'beetroot', name: { en: 'Beetroot', sv: 'Rödbeta', fr: 'Betterave', es: 'Remolacha', it: 'Barbabietola', ro: 'Sfeclă', de: 'Rote Bete' }, category: 'vegetables', emoji: '🟣' },
  // Liquids
  { id: 'milk', name: { en: 'Milk', sv: 'Mjölk', fr: 'Lait', es: 'Leche', it: 'Latte', ro: 'Lapte', de: 'Milch' }, category: 'liquids', emoji: '🥛' },
  { id: 'oat-milk', name: { en: 'Oat Milk', sv: 'Havremjölk', fr: 'Lait d\'avoine', es: 'Leche de avena', it: 'Latte d\'avena', ro: 'Lapte de ovăz', de: 'Hafermilch' }, category: 'liquids', emoji: '🥛' },
  { id: 'almond-milk', name: { en: 'Almond Milk', sv: 'Mandelmjölk', fr: 'Lait d\'amande', es: 'Leche de almendra', it: 'Latte di mandorla', ro: 'Lapte de migdale', de: 'Mandelmilch' }, category: 'liquids', emoji: '🥛' },
  { id: 'coconut-water', name: { en: 'Coconut Water', sv: 'Kokosvatten', fr: 'Eau de coco', es: 'Agua de coco', it: 'Acqua di cocco', ro: 'Apă de cocos', de: 'Kokoswasser' }, category: 'liquids', emoji: '🥥' },
  { id: 'yogurt', name: { en: 'Yogurt', sv: 'Yoghurt', fr: 'Yaourt', es: 'Yogur', it: 'Yogurt', ro: 'Iaurt', de: 'Joghurt' }, category: 'liquids', emoji: '🥄' },
  { id: 'orange-juice', name: { en: 'Orange Juice', sv: 'Apelsinjuice', fr: 'Jus d\'orange', es: 'Zumo de naranja', it: 'Succo d\'arancia', ro: 'Suc de portocale', de: 'Orangensaft' }, category: 'liquids', emoji: '🍊' },
  // Proteins
  { id: 'protein-powder', name: { en: 'Protein Powder', sv: 'Proteinpulver', fr: 'Protéine en poudre', es: 'Proteína en polvo', it: 'Proteine in polvere', ro: 'Pudră de proteine', de: 'Proteinpulver' }, category: 'proteins', emoji: '💪' },
  { id: 'peanut-butter', name: { en: 'Peanut Butter', sv: 'Jordnötssmör', fr: 'Beurre de cacahuète', es: 'Mantequilla de cacahuete', it: 'Burro di arachidi', ro: 'Unt de arahide', de: 'Erdnussbutter' }, category: 'proteins', emoji: '🥜' },
  { id: 'chia-seeds', name: { en: 'Chia Seeds', sv: 'Chiafrön', fr: 'Graines de chia', es: 'Semillas de chía', it: 'Semi di chia', ro: 'Semințe de chia', de: 'Chiasamen' }, category: 'proteins', emoji: '🌱' },
  { id: 'hemp-seeds', name: { en: 'Hemp Seeds', sv: 'Hampafrön', fr: 'Graines de chanvre', es: 'Semillas de cáñamo', it: 'Semi di canapa', ro: 'Semințe de cânepă', de: 'Hanfsamen' }, category: 'proteins', emoji: '🌱' },
  // Extras
  { id: 'honey', name: { en: 'Honey', sv: 'Honung', fr: 'Miel', es: 'Miel', it: 'Miele', ro: 'Miere', de: 'Honig' }, category: 'extras', emoji: '🍯' },
  { id: 'cinnamon', name: { en: 'Cinnamon', sv: 'Kanel', fr: 'Cannelle', es: 'Canela', it: 'Cannella', ro: 'Scorțișoară', de: 'Zimt' }, category: 'extras', emoji: '🫙' },
  { id: 'ginger', name: { en: 'Ginger', sv: 'Ingefära', fr: 'Gingembre', es: 'Jengibre', it: 'Zenzero', ro: 'Ghimbir', de: 'Ingwer' }, category: 'extras', emoji: '🫚' },
  { id: 'turmeric', name: { en: 'Turmeric', sv: 'Gurkmeja', fr: 'Curcuma', es: 'Cúrcuma', it: 'Curcuma', ro: 'Turmeric', de: 'Kurkuma' }, category: 'extras', emoji: '🟡' },
  { id: 'flax-seeds', name: { en: 'Flax Seeds', sv: 'Linfrön', fr: 'Graines de lin', es: 'Semillas de lino', it: 'Semi di lino', ro: 'Semințe de in', de: 'Leinsamen' }, category: 'extras', emoji: '🌰' },
  { id: 'oats', name: { en: 'Oats', sv: 'Havregryn', fr: 'Flocons d\'avoine', es: 'Avena', it: 'Avena', ro: 'Ovăz', de: 'Haferflocken' }, category: 'extras', emoji: '🥣' },
  { id: 'cocoa', name: { en: 'Cocoa Powder', sv: 'Kakaopulver', fr: 'Cacao en poudre', es: 'Cacao en polvo', it: 'Cacao in polvere', ro: 'Pudră de cacao', de: 'Kakaopulver' }, category: 'extras', emoji: '🍫' },
];
