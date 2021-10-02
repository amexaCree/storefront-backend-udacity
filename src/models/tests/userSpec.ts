import { User, UserStore } from '../user';

const store = new UserStore()
let user: User
// let user: {
//   first_name: string, 
//   last_name: string,
//   username: string,
//   password_digest: string
// }

describe("User Model", () => {

  afterAll(() => {

  })
  
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  // it('should have an update method', () => {
  //   expect(store.update).toBeDefined();
  // });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await store.create({
      first_name: 'Serena',
      last_name: 'Woods',
      username: 'SerWoods',
      password: 'blahblahblah'
    });
    user = result
    expect(result).toEqual(jasmine.objectContaining({
      id: user.id,
      first_name: 'Serena',
      last_name: 'Woods',
      username: 'SerWoods'
    }));
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result[0]).toEqual(jasmine.objectContaining({
      id: user.id,
      first_name: 'Serena',
      last_name: 'Woods',
      username: 'SerWoods'
    }));
  });

  it('show method should return the correct user', async () => {
    const result = await store.show(user.id as string);
    expect(result).toEqual(jasmine.objectContaining({
      id: user.id,
      first_name: 'Serena',
      last_name: 'Woods',
      username: 'SerWoods'
    }));
  });

  it('delete method should remove the user', async () => {
    await store.delete(user.id as string);
    const result = await store.index()

    expect(result).toEqual([]);
  });
});