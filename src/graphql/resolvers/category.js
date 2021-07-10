import { ApolloError } from 'apollo-server-express';

export default {
	Query: {
		all_categories: async (_, args, { Category }, info) => {
			const categories = Category.find();
			return categories;
		}
	},
	Mutation: {
		add_category: async (_, args, { Category }, info) => {
			try {
				const { name, img } = args;
				const category = new Category({ name, img });
				const result = await category.save();
				if (result) {
					return {
						message: 'Category added successfully!',
						status: true
					};
				} else {
					throw new ApolloError('Category create fail', 400);
				}
			} catch (error) {
				throw new ApolloError(error.message, 500);
			}
		},
		update_category: async (_, args, { Category }, info) => {
			try {
				const { id, name,img } = args;
				const category =await Category.findById(id);
                
				if (category) {
					category.name = name;
                    category.img=img;
					const result = await category.save();
					if (result) {
						return {
							message: 'Category updated successfully!',
							status: true
						};
					} else {
						throw new ApolloError('Category updated fail!', 400);
					}
				} else {
					throw new ApolloError('Category not found!', 404);
				}
			} catch (error) {
				throw new ApolloError(error.message, 500);
			}
		},
		delete_category: async (_, args, { Category }, info) => {
			try {
				const { id } = args;
				const result = await Category.findByIdAndDelete(id);
				if (result) {
					return {
						message: 'Category deleted successfully!',
						status: true
					};
				} else {
					throw new ApolloError('Category not found', 404);
				}
			} catch (error) {
				throw new ApolloError(error.message, 500);
			}
		}
	}
};
