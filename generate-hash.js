const bcrypt = require('bcryptjs');

const generateAndTest = async () => {
    const password = 'admin1234!';
    const hash = await bcrypt.hash(password, 10);
    console.log('New Hash:', hash);
    const isValid = await bcrypt.compare(password, hash);
    console.log('Local Validation:', isValid);
    require('fs').writeFileSync('safe-hash.txt', hash);
};

generateAndTest();
