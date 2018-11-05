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
		this.pageInfo = {
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

		if (this.fields.has('pageInfo') || this.args.perPage || this.args.page) {

			this.pageInfo.totalCountDatas = (await this.model.findAll({
				attributes: [
					[sequelize.fn('COUNT', sequelize.col('id')), 'TOTAL_COUNT'],
				],
				where: opts.filter,
			}))[0].dataValues.TOTAL_COUNT;

			if (this.args.perPage || this.args.page) {

				this.pageInfo.perPage = this.args.perPage || config.defaultPerPage;
				this.pageInfo.page = this.args.page || 1;
				this.pageInfo.totalPages = Math.ceil(this.pageInfo.totalCountDatas / this.pageInfo.perPage);
				this.pageInfo.offset = this.pageInfo.perPage * (this.pageInfo.page - 1);
				this.pageInfo.previousPage = this.pageInfo.page <= 1 ? null : this.pageInfo.page - 1;
				this.pageInfo.nextPage = this.pageInfo.page >= this.pageInfo.totalPages
					? null
					: this.pageInfo.page + 1;

			}

		}


		if (this.fields.has('data')) {

			this.data = await this.model.findAll({
				attributes: this.getOnlyFromModel('data'),
				offset: this.pageInfo.offset,
				limit: this.pageInfo.perPage,
				order: opts.order,
				where: opts.filter,
			});

		}


	}

}


module.exports = GraphQLQueryConverter;
