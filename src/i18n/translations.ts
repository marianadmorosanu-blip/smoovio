import type { SupportedLocale } from '@/types';

type TranslationKeys = {
  // App
  appName: string;
  appTagline: string;
  // Nav
  home: string;
  favorites: string;
  admin: string;
  // Home
  homeTitle: string;
  homeSubtitle: string;
  getStarted: string;
  // Ingredients
  selectIngredients: string;
  searchIngredients: string;
  ingredientsSelected: string;
  next: string;
  back: string;
  // Goals
  selectGoal: string;
  selectGoalSubtitle: string;
  // Taste
  selectTaste: string;
  selectTasteSubtitle: string;
  childFriendly: string;
  childFriendlyDesc: string;
  findSmoothies: string;
  // Results
  yourSmoothies: string;
  noResults: string;
  tryAgain: string;
  viewRecipe: string;
  matchScore: string;
  // Recipe
  ingredients: string;
  instructions: string;
  whyRecommended: string;
  sources: string;
  servings: string;
  prepTime: string;
  minutes: string;
  saveToFavorites: string;
  removeFromFavorites: string;
  // Disclaimer
  disclaimer: string;
  generalDisclaimer: string;
  // Categories
  fruits: string;
  vegetables: string;
  liquids: string;
  proteins: string;
  extras: string;
  // Admin
  adminPanel: string;
  manageIngredients: string;
  manageRecipes: string;
  manageGoals: string;
  manageSources: string;
};

const translations: Record<SupportedLocale, TranslationKeys> = {
  en: {
    appName: 'Smovioo',
    appTagline: 'Your personal smoothie guide',
    home: 'Home',
    favorites: 'Favorites',
    admin: 'Admin',
    homeTitle: 'Create your perfect smoothie',
    homeSubtitle: 'Tell us what you have, what you need, and how you like it. We\'ll find the best smoothie for you.',
    getStarted: 'Get Started',
    selectIngredients: 'What do you have?',
    searchIngredients: 'Search ingredients...',
    ingredientsSelected: 'ingredients selected',
    next: 'Next',
    back: 'Back',
    selectGoal: 'What\'s your goal?',
    selectGoalSubtitle: 'Choose a health focus for your smoothie',
    selectTaste: 'How should it taste?',
    selectTasteSubtitle: 'Pick one or more taste profiles',
    childFriendly: 'Child-friendly',
    childFriendlyDesc: 'Only show smoothies suitable for children',
    findSmoothies: 'Find My Smoothies',
    yourSmoothies: 'Your Smoothie Picks',
    noResults: 'No matching smoothies found. Try adjusting your selections.',
    tryAgain: 'Try Again',
    viewRecipe: 'View Recipe',
    matchScore: 'Match',
    ingredients: 'Ingredients',
    instructions: 'Instructions',
    whyRecommended: 'Why this smoothie?',
    sources: 'Sources',
    servings: 'Servings',
    prepTime: 'Prep time',
    minutes: 'min',
    saveToFavorites: 'Save to Favorites',
    removeFromFavorites: 'Remove from Favorites',
    disclaimer: 'Disclaimer',
    generalDisclaimer: 'This app provides general food inspiration and does not replace professional medical or dietary advice. Always consult a qualified professional for health concerns.',
    fruits: 'Fruits',
    vegetables: 'Vegetables',
    liquids: 'Liquids',
    proteins: 'Proteins',
    extras: 'Extras',
    adminPanel: 'Admin Panel',
    manageIngredients: 'Ingredients',
    manageRecipes: 'Recipes',
    manageGoals: 'Health Goals',
    manageSources: 'Sources',
  },
  sv: { appName: 'Smovioo', appTagline: 'Din personliga smoothieguide', home: 'Hem', favorites: 'Favoriter', admin: 'Admin', homeTitle: 'Skapa din perfekta smoothie', homeSubtitle: 'Berätta vad du har, vad du behöver och hur du vill ha den.', getStarted: 'Kom igång', selectIngredients: 'Vad har du hemma?', searchIngredients: 'Sök ingredienser...', ingredientsSelected: 'ingredienser valda', next: 'Nästa', back: 'Tillbaka', selectGoal: 'Vad är ditt mål?', selectGoalSubtitle: 'Välj ett hälsofokus', selectTaste: 'Hur ska den smaka?', selectTasteSubtitle: 'Välj en eller flera smakprofiler', childFriendly: 'Barnvänlig', childFriendlyDesc: 'Visa bara smoothies lämpliga för barn', findSmoothies: 'Hitta mina smoothies', yourSmoothies: 'Dina smoothieförslag', noResults: 'Inga matchande smoothies hittades.', tryAgain: 'Försök igen', viewRecipe: 'Visa recept', matchScore: 'Match', ingredients: 'Ingredienser', instructions: 'Instruktioner', whyRecommended: 'Varför denna smoothie?', sources: 'Källor', servings: 'Portioner', prepTime: 'Tillagningstid', minutes: 'min', saveToFavorites: 'Spara som favorit', removeFromFavorites: 'Ta bort från favoriter', disclaimer: 'Ansvarsfriskrivning', generalDisclaimer: 'Denna app ger allmän matinspiration och ersätter inte professionell medicinsk rådgivning.', fruits: 'Frukter', vegetables: 'Grönsaker', liquids: 'Vätskor', proteins: 'Proteiner', extras: 'Tillägg', adminPanel: 'Adminpanel', manageIngredients: 'Ingredienser', manageRecipes: 'Recept', manageGoals: 'Hälsomål', manageSources: 'Källor' },
  fr: { appName: 'Smovioo', appTagline: 'Votre guide smoothie personnel', home: 'Accueil', favorites: 'Favoris', admin: 'Admin', homeTitle: 'Créez votre smoothie parfait', homeSubtitle: 'Dites-nous ce que vous avez et ce que vous aimez.', getStarted: 'Commencer', selectIngredients: 'Qu\'avez-vous?', searchIngredients: 'Rechercher...', ingredientsSelected: 'ingrédients sélectionnés', next: 'Suivant', back: 'Retour', selectGoal: 'Quel est votre objectif?', selectGoalSubtitle: 'Choisissez un objectif santé', selectTaste: 'Quel goût?', selectTasteSubtitle: 'Choisissez un ou plusieurs profils', childFriendly: 'Adapté aux enfants', childFriendlyDesc: 'Afficher uniquement les smoothies adaptés aux enfants', findSmoothies: 'Trouver mes smoothies', yourSmoothies: 'Vos smoothies', noResults: 'Aucun smoothie trouvé.', tryAgain: 'Réessayer', viewRecipe: 'Voir la recette', matchScore: 'Match', ingredients: 'Ingrédients', instructions: 'Instructions', whyRecommended: 'Pourquoi ce smoothie?', sources: 'Sources', servings: 'Portions', prepTime: 'Préparation', minutes: 'min', saveToFavorites: 'Ajouter aux favoris', removeFromFavorites: 'Retirer des favoris', disclaimer: 'Avertissement', generalDisclaimer: 'Cette application fournit une inspiration alimentaire générale et ne remplace pas un avis médical professionnel.', fruits: 'Fruits', vegetables: 'Légumes', liquids: 'Liquides', proteins: 'Protéines', extras: 'Extras', adminPanel: 'Panneau admin', manageIngredients: 'Ingrédients', manageRecipes: 'Recettes', manageGoals: 'Objectifs santé', manageSources: 'Sources' },
  es: { appName: 'Smovioo', appTagline: 'Tu guía personal de smoothies', home: 'Inicio', favorites: 'Favoritos', admin: 'Admin', homeTitle: 'Crea tu smoothie perfecto', homeSubtitle: 'Cuéntanos qué tienes y qué te gusta.', getStarted: 'Empezar', selectIngredients: '¿Qué tienes?', searchIngredients: 'Buscar...', ingredientsSelected: 'ingredientes seleccionados', next: 'Siguiente', back: 'Atrás', selectGoal: '¿Cuál es tu objetivo?', selectGoalSubtitle: 'Elige un enfoque de salud', selectTaste: '¿Cómo debe saber?', selectTasteSubtitle: 'Elige uno o más perfiles', childFriendly: 'Apto para niños', childFriendlyDesc: 'Solo mostrar smoothies aptos para niños', findSmoothies: 'Buscar smoothies', yourSmoothies: 'Tus smoothies', noResults: 'No se encontraron smoothies.', tryAgain: 'Intentar de nuevo', viewRecipe: 'Ver receta', matchScore: 'Match', ingredients: 'Ingredientes', instructions: 'Instrucciones', whyRecommended: '¿Por qué este smoothie?', sources: 'Fuentes', servings: 'Porciones', prepTime: 'Preparación', minutes: 'min', saveToFavorites: 'Guardar en favoritos', removeFromFavorites: 'Quitar de favoritos', disclaimer: 'Aviso', generalDisclaimer: 'Esta aplicación proporciona inspiración alimentaria general y no reemplaza el consejo médico profesional.', fruits: 'Frutas', vegetables: 'Verduras', liquids: 'Líquidos', proteins: 'Proteínas', extras: 'Extras', adminPanel: 'Panel admin', manageIngredients: 'Ingredientes', manageRecipes: 'Recetas', manageGoals: 'Objetivos', manageSources: 'Fuentes' },
  it: { appName: 'Smovioo', appTagline: 'La tua guida personale ai frullati', home: 'Home', favorites: 'Preferiti', admin: 'Admin', homeTitle: 'Crea il tuo frullato perfetto', homeSubtitle: 'Dicci cosa hai e cosa ti piace.', getStarted: 'Inizia', selectIngredients: 'Cosa hai?', searchIngredients: 'Cerca...', ingredientsSelected: 'ingredienti selezionati', next: 'Avanti', back: 'Indietro', selectGoal: 'Qual è il tuo obiettivo?', selectGoalSubtitle: 'Scegli un obiettivo di salute', selectTaste: 'Come deve essere?', selectTasteSubtitle: 'Scegli uno o più profili di gusto', childFriendly: 'Adatto ai bambini', childFriendlyDesc: 'Mostra solo frullati adatti ai bambini', findSmoothies: 'Trova i miei frullati', yourSmoothies: 'I tuoi frullati', noResults: 'Nessun frullato trovato.', tryAgain: 'Riprova', viewRecipe: 'Vedi ricetta', matchScore: 'Match', ingredients: 'Ingredienti', instructions: 'Istruzioni', whyRecommended: 'Perché questo frullato?', sources: 'Fonti', servings: 'Porzioni', prepTime: 'Preparazione', minutes: 'min', saveToFavorites: 'Salva nei preferiti', removeFromFavorites: 'Rimuovi dai preferiti', disclaimer: 'Avvertenza', generalDisclaimer: 'Questa app fornisce ispirazione alimentare generale e non sostituisce il parere medico professionale.', fruits: 'Frutta', vegetables: 'Verdure', liquids: 'Liquidi', proteins: 'Proteine', extras: 'Extra', adminPanel: 'Pannello admin', manageIngredients: 'Ingredienti', manageRecipes: 'Ricette', manageGoals: 'Obiettivi', manageSources: 'Fonti' },
  ro: { appName: 'Smovioo', appTagline: 'Ghidul tău personal de smoothie-uri', home: 'Acasă', favorites: 'Favorite', admin: 'Admin', homeTitle: 'Creează smoothie-ul perfect', homeSubtitle: 'Spune-ne ce ai și ce îți place.', getStarted: 'Începe', selectIngredients: 'Ce ai acasă?', searchIngredients: 'Caută...', ingredientsSelected: 'ingrediente selectate', next: 'Următorul', back: 'Înapoi', selectGoal: 'Care este scopul tău?', selectGoalSubtitle: 'Alege un obiectiv de sănătate', selectTaste: 'Cum ar trebui să fie?', selectTasteSubtitle: 'Alege unul sau mai multe profiluri', childFriendly: 'Potrivit pentru copii', childFriendlyDesc: 'Arată doar smoothie-uri potrivite pentru copii', findSmoothies: 'Găsește smoothie-uri', yourSmoothies: 'Smoothie-urile tale', noResults: 'Niciun smoothie găsit.', tryAgain: 'Încearcă din nou', viewRecipe: 'Vezi rețeta', matchScore: 'Potrivire', ingredients: 'Ingrediente', instructions: 'Instrucțiuni', whyRecommended: 'De ce acest smoothie?', sources: 'Surse', servings: 'Porții', prepTime: 'Pregătire', minutes: 'min', saveToFavorites: 'Salvează la favorite', removeFromFavorites: 'Elimină din favorite', disclaimer: 'Avertisment', generalDisclaimer: 'Această aplicație oferă inspirație alimentară generală și nu înlocuiește sfatul medical profesional.', fruits: 'Fructe', vegetables: 'Legume', liquids: 'Lichide', proteins: 'Proteine', extras: 'Extra', adminPanel: 'Panou admin', manageIngredients: 'Ingrediente', manageRecipes: 'Rețete', manageGoals: 'Obiective', manageSources: 'Surse' },
  de: { appName: 'Smovioo', appTagline: 'Dein persönlicher Smoothie-Guide', home: 'Start', favorites: 'Favoriten', admin: 'Admin', homeTitle: 'Erstelle deinen perfekten Smoothie', homeSubtitle: 'Sag uns, was du hast und was du magst.', getStarted: 'Los geht\'s', selectIngredients: 'Was hast du?', searchIngredients: 'Suchen...', ingredientsSelected: 'Zutaten ausgewählt', next: 'Weiter', back: 'Zurück', selectGoal: 'Was ist dein Ziel?', selectGoalSubtitle: 'Wähle einen Gesundheitsfokus', selectTaste: 'Wie soll es schmecken?', selectTasteSubtitle: 'Wähle ein oder mehrere Geschmacksprofile', childFriendly: 'Kinderfreundlich', childFriendlyDesc: 'Nur kinderfreundliche Smoothies zeigen', findSmoothies: 'Smoothies finden', yourSmoothies: 'Deine Smoothies', noResults: 'Keine passenden Smoothies gefunden.', tryAgain: 'Nochmal versuchen', viewRecipe: 'Rezept ansehen', matchScore: 'Match', ingredients: 'Zutaten', instructions: 'Anleitung', whyRecommended: 'Warum dieser Smoothie?', sources: 'Quellen', servings: 'Portionen', prepTime: 'Zubereitungszeit', minutes: 'Min', saveToFavorites: 'Zu Favoriten', removeFromFavorites: 'Aus Favoriten entfernen', disclaimer: 'Haftungsausschluss', generalDisclaimer: 'Diese App bietet allgemeine Ernährungsinspiration und ersetzt keine professionelle medizinische Beratung.', fruits: 'Früchte', vegetables: 'Gemüse', liquids: 'Flüssigkeiten', proteins: 'Proteine', extras: 'Extras', adminPanel: 'Admin-Panel', manageIngredients: 'Zutaten', manageRecipes: 'Rezepte', manageGoals: 'Gesundheitsziele', manageSources: 'Quellen' },
};

export default translations;
