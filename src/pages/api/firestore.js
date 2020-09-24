// import * as database from '../../services/database/database';

// export default async function login(req, res) {
//   res.statusCode = 200;
//   try {
//     console.log('init database');
//     database.init();
//     console.log('saving...');
//     database.save({ payload: { user: 'apiRequest', id: 'apiId' } });
//     console.log('saved');
//   } catch (e) {
//     console.log(e);
//   }
//   res.end(JSON.stringify({ status: 200 }));
// }
