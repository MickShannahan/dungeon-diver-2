import { AppState } from "../AppState.js"
import { Stage } from "../models/Stage.js"
import { monstersService } from "./MonstersService.js"



class StagesService {

  /**
   * @param {Stage} stage
   */
  async changeStage(stage) {
    AppState.currentStage = stage
    AppState.monsters = stage.monsters
    monstersService.spawnNextMonster()
  }

}

export const stagesService = new StagesService()
