import { createSingleRun } from '../singleRun';

jest.mock('react');

const organiser = 'TEST';
const date = '01/05/23';
const time = '09:00';
const distance = 10;
const pace = 5;

test('stringify a cookie value', async () => {
  expect(await createSingleRun(organiser, date, time, distance, pace)).toBe(
    '[{"organiser":TEST,"date":01/05/23,"time":09:00,"distance":10,"pace":5}]',
  );
});
