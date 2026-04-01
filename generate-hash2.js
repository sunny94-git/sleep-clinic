const bcrypt = require('bcryptjs');

const generateAndTest = async () => {
    const password = 'won01589!!';
    const hash = await bcrypt.hash(password, 10);
    require('fs').writeFileSync('safe-hash.txt', hash);
};

generateAndTest();
