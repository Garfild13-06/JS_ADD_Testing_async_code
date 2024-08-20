// src/js/__tests__/GameSavingLoader.test.js
import GameSavingLoader from '../GameSavingLoader';
import GameSaving from '../GameSaving';
import read from '../reader'; // Импортируем модуль для мокирования

// Мокируем функцию read
jest.mock('../reader');

test('should correctly load and parse game saving', async () => {
  const jsonData = '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';

  const buffer = new ArrayBuffer(jsonData.length * 2);
  const bufferView = new Uint16Array(buffer);
  for (let i = 0; i < jsonData.length; i++) {
    bufferView[i] = jsonData.charCodeAt(i);
  }

  // Устанавливаем поведение мока для успешного резолва
  read.mockResolvedValue(buffer);

  const saving = await GameSavingLoader.load();
  expect(saving).toBeInstanceOf(GameSaving);
  expect(saving.id).toBe(9);
  expect(saving.created).toBe(1546300800);
  expect(saving.userInfo).toEqual({
    id: 1,
    name: 'Hitman',
    level: 10,
    points: 2000,
  });
});

test('should throw an error when loading fails', async () => {
  // Устанавливаем поведение мока для отклонения
  read.mockRejectedValue(new Error('Loading error'));

  await expect(GameSavingLoader.load()).rejects.toThrow('Error loading game saving: Loading error');
});
