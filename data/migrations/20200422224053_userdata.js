
exports.up = function(knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments('id');
            tbl.string('username', 128)
                .notNullable()
                .unique();
            tbl.string('password', 128)
                .notNullable();
        })
        .createTable('sessions', ses => {
            ses.string('sid', 256).primary();
            ses.json('sess')
                .notNullable();
            ses.timestamp('expired')
                .notNullable();
        })
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('sessions')
};
