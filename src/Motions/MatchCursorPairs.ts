import {window, Position} from 'vscode';
import {Motion} from './Motion';
import {UtilMatch} from '../Utils/Match';
import {UtilPosition} from '../Utils/Position';
import {MotionPairsDirection} from '../Motions/MatchPairs';
import {LastCharacterMatching} from '../Motions/MatchPairs';
import {FirstPosPairMatching} from '../Motions/MatchPairs';
import {MotionMatchPairs} from '../Motions/MatchPairs';

/** Motion which goes from a position to the first closing char forward  ( )>"']} )
 *  or which goes from a position to the first opening char backwards ( (<"'[{ )
 *  Depending on a direction parameter
*/
export class MotionCursorPairs extends Motion {



    apply(from: Position): Position {
        from = super.apply(from);
        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return from;
        }

        let toLine = from.line;
        let toCharacter : number = from.character;
        const document = activeTextEditor.document;
        const targetText:string = document.lineAt(toLine).text;

        if (toCharacter >= targetText.length) {
            //cursor is out of the line
            return from;
        }

        const cursorChar = targetText[toCharacter];

        if (!UtilMatch.isPairingChar(cursorChar)) {
            return from;
        }

        let toPosition : Position = from;

        if (UtilMatch.isOpeningChar(cursorChar)) {
            toPosition = MotionMatchPairs.matchClosing({ character: cursorChar }, LastCharacterMatching.Include, FirstPosPairMatching.Ignore).apply(from);
        }

        if (UtilPosition.areEquals(from, toPosition)) {
            if (UtilMatch.isClosingChar(cursorChar)) {
                toPosition = MotionMatchPairs.matchOpening({ character: cursorChar }, LastCharacterMatching.Include, FirstPosPairMatching.Ignore).apply(from);
            }
        }

        return toPosition;
    }

}
