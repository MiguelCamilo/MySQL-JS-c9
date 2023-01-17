// import node modules from this library
import { createServer, createConnection } from "mysql2";
import { dbConnection } from "./secrets.js"; // remember to use js

// remember to start sql server
try {
	const db = createConnection(dbConnection);

	console.log("We are connected...");

	// query updating the table data
	db.query(
		'UPDATE users SET first_name = "Cass" WHERE first_name = "Kim"',
		(err) => {
			if (err) console.log(`Update Error --> ${err}`);
			else console.log("UPDATE DONE!");
		});

	// we are nesting the second query inside of the first so we don't
	// get a race condition issue

	// query with an anonymous function
	// returns either err or results
	db.query("SELECT * FROM users", (err, results) => {
		if (err) console.error(`ERROR ---> ${err}`); // log error
		console.table(results);
	});

	db.end();
} catch (err) {
	console.log(err);
}
