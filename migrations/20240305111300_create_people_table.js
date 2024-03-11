/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
	return knex.schema.createTable('person', (table) => {
		table.integer('id').primary().unique();
		table.string('imdb_id');
		table.string('birthplace');
		table.string('name');
	});
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
	return knex.schema.dropTable('person');
}
