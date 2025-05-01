import { Injectable } from '@angular/core';
import {EtatCondidature} from '../models/condidature';

@Injectable({
  providedIn: 'root'
})
export class CandidatureStateService {

  /**
   * Détermine quels états sont disponibles en fonction de l'état actuel
   * @param currentState L'état actuel de la candidature
   * @returns Un tableau d'objets contenant les états disponibles et s'ils sont sélectionnables ou non
   */
  getAvailableStates(currentState: EtatCondidature): { state: EtatCondidature, selectable: boolean }[] {
    const allStates = Object.values(EtatCondidature);

    // Initialiser tous les états comme non sélectionnables
    const stateMap = allStates.map(state => ({
      state,
      selectable: false
    }));

    // Déterminer les états sélectionnables en fonction de l'état actuel
    switch (currentState) {
      case EtatCondidature.Pending:
        this.setSelectableStates(stateMap, [
          EtatCondidature.AcceptedForFirstInterview,
          EtatCondidature.NotAccepted
        ]);
        break;

      case EtatCondidature.AcceptedForFirstInterview:
        this.setSelectableStates(stateMap, [
          EtatCondidature.AcceptedForSecondInterview,
          EtatCondidature.NotAccepted
        ]);
        break;

      case EtatCondidature.AcceptedForSecondInterview:
        this.setSelectableStates(stateMap, [
          EtatCondidature.WelcomeToTheTeam,
          EtatCondidature.NotAccepted
        ]);
        break;

      case EtatCondidature.WelcomeToTheTeam:
      case EtatCondidature.NotAccepted:
        // États terminaux - aucun état suivant n'est sélectionnable
        break;

      default:
        // Par défaut, permettre tous les états
        this.setSelectableStates(stateMap, allStates);
        break;
    }

    return stateMap;
  }

  /**
   * Fonction auxiliaire pour définir les états sélectionnables
   */
  private setSelectableStates(stateMap: { state: EtatCondidature, selectable: boolean }[],
                              selectableStates: EtatCondidature[]): void {
    for (const stateObj of stateMap) {
      stateObj.selectable = selectableStates.includes(stateObj.state);
    }
  }

  /**
   * Vérifie si une transition d'état est valide
   * @param currentState L'état actuel
   * @param newState L'état souhaité
   * @returns boolean indiquant si la transition est valide
   */
  isValidStateTransition(currentState: EtatCondidature, newState: EtatCondidature): boolean {
    const availableStates = this.getAvailableStates(currentState);
    const stateObj = availableStates.find(s => s.state === newState);
    return stateObj ? stateObj.selectable : false;
  }
}
