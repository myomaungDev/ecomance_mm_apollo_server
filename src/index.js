import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import { PORT } from './config';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import * as AppModels from './models';
import { join } from 'path';
import { connect_DB } from './db';
import { schemaDirectives } from './graphql/directives';
import cors from 'cors';
import AuthMiddleware from './middlewares/auth';
const port = process.env.PORT || PORT;
import bodyparser from 'body-parser';
const app = express();

app.use(cors());

console.log(join(__dirname, '..', 'uploads'));
app.use(AuthMiddleware);
app.use('', express.static(join(__dirname, '..', 'uploads')));
const startApp = () => {
	connect_DB();
	const server = new ApolloServer({
		resolvers:resolvers,
		typeDefs:typeDefs,
		schemaDirectives:schemaDirectives,
		introspection: true,
		playground: true,
		context: ({ req }) => {
			let { isAuth, user } = req;
			return {
				req,
				user,
				isAuth,
				...AppModels
			};
		}
	});
	server.applyMiddleware({ app });
	app.listen(port, () => {
		console.log(`Server is running at port ${port}`);
	});
};
startApp();
