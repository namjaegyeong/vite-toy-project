/**
 * Represents a summary of an estate property.
 */
export interface EstateSummary {
    /**
     * The unique identifier of the property.
     * All estate data in the API is distinguished by this identifier.
     */
    id: number;
  
    /**
     * The case number of the property.
     * Follows the format [<Year>타경<Sequence Number>].
     */
    caseNumber: string;
  
    /**
     * The name of the court where the auction will take place.
     */
    court: string;
  
    /**
     * The address of the auction property.
     */
    address: string;
  
    /**
     * The appraised value of the auction property.
     */
    appraisalValue: number;
  
    /**
     * The type of the auction property.
     * Indicates what kind of property it is, such as an apartment or land.
     */
    type: string;
  
    /**
     * The latitude coordinate of the auction property.
     */
    coordinateX: number;
  
    /**
     * The longitude coordinate of the auction property.
     */
    coordinateY: number;
  
    /**
     * The photo URLs of the auction property.
     * This can be empty or contain multiple URLs.
     */
    photos: string[];
  
    /**
     * The standard date when the auction property was listed on the site.
     */
    standardDate: string;
  }