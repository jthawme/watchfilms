// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './src/lib/data/main.sqlite'
		}
	}
};
