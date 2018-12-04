const {
	sequelize,
} = require('../database/models');
const config = require('../config');

class GraphQLQueryConverter {

	constructor(model, args, ast) {

		this.fields = new Map();
		this.args = args;
		this.ast = ast;
		this.setFields(ast);
		this.model = model;
		this.data = [];
		this.pagination = {
			offset: null,
			page: null,
			perPage: null,
			totalPages: null,
			previousPage: null,
			nextPage: null,
		};

	}

	setFields(ast) {

		for (let i = 0; i < ast.fieldNodes[0].selectionSet.selections.length; i++) {

			const ressource = ast.fieldNodes[0].selectionSet.selections[i];
			this.fields.set(ressource.name.value, []);
			for (let j = 0; j < ressource.selectionSet.selections.length; j++) {

				const property = ressource.selectionSet.selections[j].name.value;
				this.fields.get(ressource.name.value).push(property);

			}

		}
		return this.fields;

	}

	has(ressource) {

		return this.fields.has(ressource);

	}

	get(ressource) {

		return this.fields.get(ressource);

	}

	getOnlyFromModel(ressource) {

		const modelRows = Object.keys(this.model.attributes);

		return this.fields.get(ressource).filter(field => modelRows.indexOf(field) >= 0);

	}

	async generate(opts) {

		if (this.fields.has('pagination') || this.args.per_page || this.args.page) {

			this.pagination.totalDatas = (await this.model.findAll({
				attributes: [
					[sequelize.fn('COUNT', sequelize.col('id')), 'TOTAL_COUNT'],
				],
				where: opts.filter,
			}))[0].dataValues.TOTAL_COUNT;


			if (this.args.per_page || this.args.page) {

				this.pagination.perPage = this.args.per_page || config.defaultPerPage;
				this.pagination.currentPage = this.args.page || 1;
				this.pagination.totalPages = Math.ceil(this.pagination.totalDatas / this.pagination.perPage);
				this.pagination.offset = this.pagination.perPage * (this.pagination.currentPage - 1);
				this.pagination.previousPage = this.pagination.currentPage <= 1 ? null : this.pagination.currentPage - 1;
				this.pagination.nextPage = this.pagination.currentPage >= this.pagination.totalPages
					? null
					: this.pagination.currentPage + 1;

			}

		}
		if (this.fields.has('data')) {

			this.data = await this.model.findAll({
				attributes: this.getOnlyFromModel('data'),
				offset: this.pagination.offset,
				limit: this.pagination.perPage,
				order: opts.order,
				where: opts.filter,
			});

		}


	}

}


module.exports = GraphQLQueryConverter;
