import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// el.promise() es la otra alternativa a el.then() para manejar las promesas y no usar callbacks
//donde vinculo el archivo .env con el archivo de configuración.

//process es el proceso que inicia Node.js cuando ejecuto mi proyecto (por ejemplo con npm run dev). Dentro de ese proceso existe process.env, 
// que es un espacio donde se guardan las variables de entorno que definí en el archivo .env.
//Así puedo acceder a ellas con process.env.NOMBRE_VARIABLE sin necesidad de escribir valores sensibles directamente en mi código.
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}).promise();
export default connection;
