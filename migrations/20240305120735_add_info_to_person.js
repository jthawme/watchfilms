/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
	return knex.schema.table('person', (table) => {
		table.string('birthday');
		table.string('deathday');
	});
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
	return knex.schema.table('person', (table) => {
		table.dropColumn('birthday');
		table.dropColumn('deathday');
	});
}
