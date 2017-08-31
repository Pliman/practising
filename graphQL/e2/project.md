code from https://github.com/mhaagens/express-graphql-boilerplate-hmr
------------------------------------------------------------------------------------
mutation {
  addPost(input: {title: "aaa"}) {
    id
    title
  }
}
------------------------------------------------------------------------------------
subscription {
  postAdded {
    id
    title
  }
}
------------------------------------------------------------------------------------
{
  post(id: 1) {
    id
    title
    comments(post_id: 1) {
      id
      body
      post_id
    }
  }
}
==> Unknown argument \"post_id\" on field \"comments\" of type \"Post\".
{
  post(id: 1) {
    id
    title
    comments {
      id
      body
      post_id
    }
  }
}
执行正常，且自动关联了
因为此处定义了post获取comment的关系 ，！！！因为Post类型中定义了comments属性，所以此处要说明关系，[实验]更改属性名，关系里面的属性名也要做更改，同时query的field名称也要做更改
Post: {
			comments: ({ id }) =>
				Promise.resolve().then(async () => await PostsController.getPostComments(id)).catch(err => err)
		}

{
  posts{
    id
    title
    comments {
      id
      body
      post_id
    }
  }
}
每个都会內联自己的comments
-----------------------------------------------------------------------------------
typeDefs: [SchemaDefinition, Query, Post, PostInput, Comment, CommentInput, Mutation, Subscription]
必须有，Input用来做类型检查，当客户端传入对象少了属性时，会报错，包括属性和类型
-----------------------------------------------------------------------------------
post: (_, { id }) => Promise.resolve().then(async () => PostsController.show(id)).catch(err => err),
post: async (_, { id }) => PostsController.show(id), //work
post: (_, { id }) => PostsController.show(id), //work
下面能work，为什么要使用上面的写法？
只有一个意义，就是resolver要求返回一个Promise????!!!!?????
-----------------------------------------------------------------------------------