/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
	return Promise.all([
		knex.schema.createTable('movie_genre', (table) => {
			table.increments('id').primary();
			table.integer('movie_id').references('movie.id');
			table.integer('genre_id').references('genre.id');
		}),
		knex.schema.createTable('movie_person', (table) => {
			table.increments('id').primary();
			table.integer('movie_id').references('movie.id');
			table.integer('person_id').references('person.id');
		})
	]);
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
	return Promise.all([knex.schema.dropTable('movie_genre'), knex.schema.dropTable('movie_person')]);
}
