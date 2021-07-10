import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		all_categories: [Category!]
	}

	type Category {
		name: String!
		updatedAt: String
		createdAt: String
		img: String
		id: ID
	}

	extend type Mutation {
		add_category(name: String, img: String): ResponseCategory! @isSuperAdmin
		update_category(id: ID, name: String, img: String): ResponseCategory! @isSuperAdmin
		delete_category(id: ID): ResponseCategory! @isSuperAdmin
	}

	type ResponseCategory {
		message: String!
		status: Boolean
	}
`;
