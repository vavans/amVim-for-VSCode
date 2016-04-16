export class UtilMatch {

    public static mapToClosingChar =   {"'"  : "'",
                                        "\"" : "\"",
                                        "<"  : ">",
                                        ">"  : ">",
                                        "("  : ")",
                                        ")"  : ")",
                                        "["  : "]",
                                        "]"  : "]",
                                        "{"  : "}",
                                        "}"  : "}",
                                        };

    public static mapToOpeningChar =   {"'"  : "'",
                                        "\"" : "\"",
                                        ">"  : "<",
                                        "<"  : "<",
                                        ")"  : "(",
                                        "("  : "(",
                                        "]"  : "[",
                                        "["  : "[",
                                        "}"  : "{",
                                        "{"  : "{"
                                        };

    public static isClosingChar(char: string) : boolean {
        return UtilMatch.mapToClosingChar[char] === char;
    }

    public static isOpeningChar(char: string) : boolean {
        return UtilMatch.mapToOpeningChar[char] === char;
    }

    /** pairings char are the ones which are different between opening and closing */
    public static isPairingChar(char: string) : boolean {
        return UtilMatch.mapToOpeningChar[char] != UtilMatch.mapToClosingChar[char];
    }
}