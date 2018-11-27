const { GraphQLServer } = require('graphql-yoga')

// 1
let links = [{
        "id": "link-0",
        "description": "Fullstack tutorial for GraphQL",
        "url": "www.howtographql.com"
      },
      {
        "id": "link-1",
        "description": "bao dan tri báo tiếng việt của người việt",
        "url": "https://dantri.com.vn/"
      },
      {
        "id": "link-2",
        "description": "eo gi day",
        "url": "1234567890"
      },
      {
        "id": "link-3",
        "description": "eo gi day",
        "url": "1234567890"
      }];
	
let idCount = links.length;
const resolvers = {
	Query: {
	  	info: () => `This is the API of a Hackernews Clone`,
		feed: () => links,
		link: (root, data) => {
			let index_key = data.id.split('-')[1];
			return links[index_key];
		}
	},
	Mutation: {
    // 2
    post: (root, args) => {
       const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink : (root, data) => {
    	let update_element = links[data.id.split('-')[1]];
    	update_element.url = data.url;
    	update_element.description = data.description;
    	return update_element;
    },
    deleteLink : (root, data) => {
    	if(links[data.id.split('-')[1]]){
    		let temp = links[data.id.split('-')[1]];
    		delete links[data.id.split('-')[1]];
    		return temp;
    	}
    }
  },
}
// 3
const server = new GraphQLServer({
  typeDefs  : './src/schema.graphql',
  resolvers
})
server.start(() => console.log(`Server is running on http://localhost:4000`))