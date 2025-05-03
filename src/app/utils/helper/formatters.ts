/**
 * Formats a date string into a localized date format
 * @param dateString - ISO date string to format
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  /**
   * Maps body type codes to display names
   */
  export const bodyTypeMap: Record<string, string> = {
    athletic: "Athletic",
    slim: "Slim",
    average: "Average",
    curvy: "Curvy",
    muscular: "Muscular",
    plus_size: "Plus Size",
  };
  
  /**
   * Maps relationship goal codes to display names
   */
  export const goalMap: Record<string, string> = {
    hookup: "Hookups",
    dating: "Dating",
    relationship: "Relationship",
    marriage: "Marriage",
    friends: "Friends",
    casual: "Casual",
  };
  
  /**
   * Maps love language codes to display names
   */
  export const loveLanguageMap: Record<string, string> = {
    touch: "Physical Touch",
    gifts: "Receiving Gifts",
    time: "Quality Time",
    acts: "Acts of Service",
    words: "Words of Affirmation",
  };