import bcrypt from 'bcrypt';
import { createUser, deleteUserByUsername, getUserByUsername } from '../users';

jest.mock('react');
test('create, get and delete a user', async () => {
  const password = 'test';
  const passwordHash = await bcrypt.hash(password, 12);
  const user = {
    username: 'testUser',
    passwordHash: passwordHash,
  };
  // First, make sure that the return value of the function is undefined
  // Use .toBe to compare primitive values
  expect(getUserByUsername(user.username)).toBe(undefined);
  // expect(getParsedCookie(cookie.key)).toBeUndefined();

  // Create a user
  expect(() => createUser(user.username, user.passwordHash)).not.toThrow();

  // Use .toStrictEqual to test that objects have the same type as well as structure
  expect(getUserByUsername(user.username)).toStrictEqual(user.username);

  // Best practice: clear state after test to bring the system back to the initial state
  expect(deleteUserByUsername(user.username)).toBe(undefined);
  expect(getUserByUsername(user.username)).toBe(undefined);
});
