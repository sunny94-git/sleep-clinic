const { Pool } = require('pg');

const regions = [
  'ap-northeast-2', // Seoul
  'ap-northeast-1', // Tokyo
  'ap-southeast-1', // Singapore
  'us-east-1',      // N Virginia
  'us-west-1',      // N California
  'eu-central-1',   // Frankfurt
  'eu-west-2',      // London
  'ap-southeast-2', // Sydney
  'ca-central-1',   // Canada
];

function test(i) {
  if (i >= regions.length) {
    console.log('All failed');
    return;
  }
  const r = regions[i];
  const url = `postgresql://postgres.ywnavazhauvoyarycvwm:won01589%21%21gjwmc@aws-0-${r}.pooler.supabase.com:6543/postgres?pgbouncer=true`;
  const p = new Pool({ connectionString: url, connectionTimeoutMillis: 5000 });
  
  console.log('Testing', r);
  p.query('SELECT 1')
    .then(() => {
      console.log('SUCCESS IN', r);
      p.end();
    })
    .catch((e) => {
      console.log(`ERROR in ${r}: ${e.message}`);
      p.end();
      test(i + 1);
    });
}

test(0);
