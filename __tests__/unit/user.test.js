const bcrypt = require('bcryptjs');
const factory = require('../factories');

const truncate = require('../utils/truncate');


describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password', async () => {
    const userPassword = '123456';
    const user = await factory.create('User', {
      password: userPassword,
    });

    const hashesAreTheSame = await bcrypt.compare(userPassword, user.password_hash);

    expect(hashesAreTheSame).toBe(true);
  });
});
