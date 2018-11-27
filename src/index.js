const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const resolvers = {
	Query: {
	  	info: () => `This is the API of a Hackernews Clone`,
		feed: (root, args, context, info) => {
			return context.db.links({}, info)
		},
		// link: (root, data) => {
		// 	let index_key = data.id.split('-')[1];
		// 	return links[index_key];
		// }
	},
	Mutation: {
    // 2
    post: (root, args, context, info) => {
    	//return context.db.mutation.createLink(data_create	, info);
       	return context.db.mutation.createLink({
       		data : {
       			url : args.url,
       			description : args.description
       		}
       	}, info);
    },
    // updateLink : (root, data) => {
    // 	let update_element = links[data.id.split('-')[1]];
    // 	update_element.url = data.url;
    // 	update_element.description = data.description;
    // 	return update_element;
    // },
    // deleteLink : (root, data) => {
    // 	if(links[data.id.split('-')[1]]){
    // 		let temp = links[data.id.split('-')[1]];
    // 		delete links[data.id.split('-')[1]];
    // 		return temp;
    // 	}
    // }
  },
}
// 3
const server = new GraphQLServer({
  typeDefs  : './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://eu1.prisma.sh/henrypham/database/dev',
      secret: 'mysecret123',
      debug: true,
    }),
  })
})
server.start(() => console.log(`Server is running on http://localhost:4000`))