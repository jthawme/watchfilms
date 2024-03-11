/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
	return knex.schema.createTable('movie', (table) => {
		table.integer('id').primary().unique();
		table.string('title');
		table.string('original_title');
		table.string('poster');
		table.string('backdrop');
		table.text('overview');
		table.text('synopsis');
		table.integer('runtime');
		table.float('rating');
		table.float('rt_rating');
		table.date('release_date');
	});
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
	return knex.schema.dropTable('movie');
}
