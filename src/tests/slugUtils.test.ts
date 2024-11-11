import { generateSlug } from '@utils/generateSlug';

describe('generateSlug', () => {
  it('should generate a slug from a name and userId', () => {
    const name = 'John Doe';
    const userId = '123456';
    const slug = generateSlug(name, userId);
    expect(slug).toBe('@john_doe_3456');
  });

  it('should handle names with special characters', () => {
    const name = 'Jane Doe @2021!';
    const userId = 'abcdef';
    const slug = generateSlug(name, userId);
    expect(slug).toBe('@jane_doe_2021_cdef');
  });

  it('should convert name to lowercase', () => {
    const name = 'Alice Smith';
    const userId = '789012';
    const slug = generateSlug(name, userId);
    expect(slug).toBe('@alice_smith_9012');
  });

  it('should replace spaces with underscores', () => {
    const name = 'Hello World';
    const userId = '654321';
    const slug = generateSlug(name, userId);
    expect(slug).toBe('@hello_world_4321');
  });
});
