import { ApolloError } from 'apollo-server-errors';
import bcrypt from 'bcrypt';
import { assign_token } from '../../helpers/user';
export default {
	Query: {
		auth_Profile:async(_,{},{user},info)=>{
          return user;
		},
		get_all_users:async(_,_args,{User},info)=>{
			
			
			const users = await User.paginate({},{limit:_args.limit,page:_args.page})
			return users;

		}
	},
	Mutation: {
		createUser: async (_, { NewUser }, { User }, info) => {
			try {
				const find_user = await User.findOne({ email: NewUser.email });
				if (find_user) {
					throw new ApolloError('Your email is already used!');
				} else {
					let user = new User(NewUser);
					let result = await user.save();
					if (result) {
						let access_token = assign_token(result);
						return {
							user: result,
							success: true,
							message: 'User created successfully!',
							access_token: access_token
						};
					} else {
						throw new ApolloError('User created fail!');
					}
				}
			} catch (error) {
				throw new ApolloError(error.message);
			}
		},
		loginUser: async (_, { LoginUser }, { User }, info) => {
			try {
				let finduser = await User.findOne({ email: LoginUser.email });
				if (finduser) {
					let authenticated = bcrypt.compareSync(LoginUser.password, finduser.password);
					if (authenticated) {
						let access_token = assign_token(finduser);
						return {
							user: finduser,
							success: true,
							message: 'User created successfully!',
							access_token: access_token
						};
					} else {
						throw new ApolloError('Unauthenticated User!', 401);
					}
				}
			} catch (error) {
				throw new ApolloError(error.message, 500);
			}
		}
	}
};
