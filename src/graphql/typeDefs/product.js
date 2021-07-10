import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		get_all_products(page: Int!, limit: Int!): ProductResponse!
		get_product_by_id(id: ID!): Product!
	}

	type PriceInfo {
		price: Int
		discount: Int
	}

	type ProductInfo {
		weight: String
		width: String
		height: String
	}

	type Product {
		p_name: String!
		category_id: Category
		seller_id: User
		description: String!
		price_info: PriceInfo
		product_info: ProductInfo
		p_img: String
		updatedAt: String
		createdAt: String
		id: ID!
	}

	type ProductResponse {
		docs: [Product]
		totalDocs: Int
		limit: Int
		totalPages: Int
		page: Int
		pagingCounter: Int
		hasPrevPage: Boolean
		hasNextPage: Boolean
		prevPage: String
		nextPage: String
	}

	extend type Mutation {
		add_product(InputProduct: InputProduct): ProductMutationResponse! @isSeller
		update_product(UpdateProduct: UpdateProduct): ProductMutationResponse! @isSeller
		delete_product(id: ID!): ProductMutationResponse! @isSeller
	}

	input InputProduct {
		p_name: String!
		category_id: ID!
		seller_id: ID!
		description: String!
		p_img: String!
		price: Int!
		discount: Int
		weight: String
		height: String
		width: String
	}

	input UpdateProduct {
		p_name: String!
		category_id: ID!
		seller_id: ID!
		description: String!
		p_img: String!
		price: Int!
		discount: Int
		weight: String
		height: String
		width: String
		id: ID!
	}

	type ProductMutationResponse {
		message: String!
		status: Boolean
	}
`;
