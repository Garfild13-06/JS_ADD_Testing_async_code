import read from './reader';
import json from './parser';
import GameSaving from './GameSaving';

export default class GameSavingLoader {
    static async load() {
        try {
            const data = await read();
            const jsonString = await json(data);
            const parsedData = JSON.parse(jsonString);
            return new GameSaving(
                parsedData.id,
                parsedData.created,
                parsedData.userInfo,
            );
        } catch (error) {
            throw new Error('Error loading game saving: ' + error.message);
        }
    }
}
