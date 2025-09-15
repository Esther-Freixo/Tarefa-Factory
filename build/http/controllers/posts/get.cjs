var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/http/controllers/posts/get.ts
var get_exports = {};
__export(get_exports, {
  get: () => get2
});
module.exports = __toCommonJS(get_exports);
var import_zod15 = __toESM(require("zod"), 1);

// src/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource not found error!");
  }
};

// src/app.ts
var import_client = require("@prisma/client");
var import_fastify = __toESM(require("fastify"), 1);

// src/http/controllers/users/register.ts
var import_zod = __toESM(require("zod"), 1);

// src/use-cases/users/register-user-use-case.ts
var import_bcryptjs = require("bcryptjs");

// src/errors/user-already-exists-error.ts
var UserAlreadyExists = class extends Error {
  constructor() {
    super("User already exists!");
  }
};

// src/use-cases/users/register-user-use-case.ts
var RegisterUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    name,
    email,
    photo,
    password
  }) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new UserAlreadyExists();
    }
    const password_hash = await (0, import_bcryptjs.hash)(password, 6);
    await this.usersRepository.create({
      name,
      email,
      photo,
      password: password_hash
    });
    console.log("criado com sucesso");
  }
};

// src/repositories/prisma/prisma-users-repository.ts
var PrismaUsersRepository = class {
  async create(data) {
    const user = await prisma.user.create({ data });
    return user;
  }
  async findByEmail(email) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    return user;
  }
  async findAllUsers() {
    const user = await prisma.user.findMany();
    return user;
  }
  async delete(id) {
    const user = await prisma.user.delete({
      where: {
        id
      }
    });
    return user;
  }
  async findById(id) {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });
    return user;
  }
  async update(id, data) {
    const user = await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        photo: data.photo,
        password: data.password
      }
    });
    return user;
  }
};

// src/http/controllers/users/register.ts
async function register(request, reply) {
  const registerBodySchema = import_zod.default.object({
    name: import_zod.default.string(),
    email: import_zod.default.string().email(),
    photo: import_zod.default.string(),
    password: import_zod.default.string().min(6)
  });
  const {
    name,
    email,
    photo,
    password
  } = registerBodySchema.parse(request.body);
  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(prismaUsersRepository);
    await registerUseCase.execute({
      name,
      email,
      photo,
      password
    });
  } catch (error) {
    if (error instanceof UserAlreadyExists) {
      return reply.status(409).send({ message: error.message });
    }
    throw new Error();
  }
  return reply.status(201).send("Usu\xE1rio criado com sucesso");
}

// src/use-cases/users/get-all-user-use-case.ts
var GetAllUserUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute() {
    const user = await this.usersRepository.findAllUsers();
    if (!user) {
      throw new ResourceNotFoundError();
    }
    return { user };
  }
};

// src/http/controllers/users/getAll.ts
async function getAll(request, reply) {
  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const getUserUseCase = new GetAllUserUseCase(prismaUsersRepository);
    const user = await getUserUseCase.execute();
    return reply.status(200).send(user);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw new Error();
  }
}

// src/http/controllers/users/delete.ts
var import_zod2 = __toESM(require("zod"), 1);

// src/use-cases/users/delete-user-use-case.ts
var DeleteUserUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({ userId }) {
    const user = await this.usersRepository.delete(userId);
    if (!user) {
      throw new ResourceNotFoundError();
    }
    return { user };
  }
};

// src/http/controllers/users/delete.ts
async function deleteUser(request, reply) {
  const getParamsSchema = import_zod2.default.object({
    userId: import_zod2.default.string().uuid()
  });
  const { userId } = getParamsSchema.parse(request.params);
  const userIdAuth = request.user.sub;
  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    if (userId !== userId) {
      return reply.status(403).send({ message: "Permiss\xE3o para atualizar este post foi negada." });
    }
    const deleteUserUseCase = new DeleteUserUseCase(prismaUsersRepository);
    const user = await deleteUserUseCase.execute({ userId });
    return reply.status(204).send({ user });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw new Error();
  }
}

// src/http/controllers/users/update.ts
var import_zod3 = __toESM(require("zod"), 1);

// src/use-cases/users/update-user-use-case.ts
var import_bcryptjs2 = require("bcryptjs");
var UpdateUserUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({ userId, data }) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new ResourceNotFoundError();
    }
    if (data.password) {
      const isSamePassword = await (0, import_bcryptjs2.compare)(data.password, user.password);
      if (isSamePassword) {
        throw new Error("As senhas devem ser diferentes!");
      }
      data.password = await (0, import_bcryptjs2.hash)(data.password, 6);
    }
    const userUpdated = await this.usersRepository.update(userId, data);
    if (!userUpdated) {
      throw new ResourceNotFoundError();
    }
    return { user: userUpdated };
  }
};

// src/http/controllers/users/update.ts
async function update(request, reply) {
  const updateParamsSchema = import_zod3.default.object({
    userId: import_zod3.default.string().uuid()
  });
  const updateBodySchema = import_zod3.default.object({
    name: import_zod3.default.string().optional(),
    email: import_zod3.default.string().optional(),
    photo: import_zod3.default.string().optional(),
    password: import_zod3.default.string().optional()
  });
  const { userId } = updateParamsSchema.parse(request.params);
  const { name, email, photo, password } = updateBodySchema.parse(request.body);
  const userIdAuth = request.user.sub;
  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    if (userId !== userIdAuth) {
      return reply.status(403).send({ message: "Permiss\xE3o para atualizar este usu\xE1rio foi negada." });
    }
    const updateUserUseCase = new UpdateUserUseCase(prismaUsersRepository);
    const user = await updateUserUseCase.execute({
      userId,
      data: { name, email, photo, password }
    });
    return reply.status(200).send({ user });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw new Error();
  }
}

// src/http/controllers/users/get.ts
var import_zod4 = __toESM(require("zod"), 1);

// src/use-cases/users/get-user-use-case.ts
var GetUserUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({ userId }) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new ResourceNotFoundError();
    }
    return { user };
  }
};

// src/http/controllers/users/get.ts
async function get(request, reply) {
  const getParamsSchema = import_zod4.default.object({
    userId: import_zod4.default.string().uuid()
  });
  const { userId } = getParamsSchema.parse(request.params);
  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const getUserUseCase = new GetUserUseCase(prismaUsersRepository);
    const user = await getUserUseCase.execute({ userId });
    return reply.status(200).send(user);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw new Error();
  }
}

// src/http/middleware/verify-jwt.ts
async function verifyJWT(request, reply) {
  try {
    await request.jwtVerify();
  } catch (error) {
    return reply.status(401).send({ message: "Unhautorized" });
  }
}

// src/http/controllers/users/profile.ts
async function profile(request, reply) {
  const prismaUsersRepository = new PrismaUsersRepository();
  const getUserUseCase = new GetUserUseCase(prismaUsersRepository);
  const { user } = await getUserUseCase.execute({ userId: request.user.sub });
  return reply.status(200).send({
    user: {
      ...user,
      password: void 0
    }
  });
}

// src/http/controllers/users/authenticate.ts
var import_zod5 = __toESM(require("zod"), 1);

// src/use-cases/users/authenticate-use-case.ts
var import_bcryptjs3 = require("bcryptjs");

// src/errors/invalid-credentials-error.ts
var InvalidCredentialsError = class extends Error {
  constructor() {
    super("Invalid credentials!");
  }
};

// src/use-cases/users/authenticate-use-case.ts
var AuthenticateUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({ email, password }) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }
    const doesPasswordCompare = await (0, import_bcryptjs3.compare)(password, user.password);
    if (!doesPasswordCompare) {
      throw new InvalidCredentialsError();
    }
    return { user };
  }
};

// src/http/controllers/users/authenticate.ts
async function authenticate(request, reply) {
  const authenticateBodySchema = import_zod5.default.object({
    email: import_zod5.default.string().email(),
    password: import_zod5.default.string().min(6)
  });
  const {
    email,
    password
  } = authenticateBodySchema.parse(request.body);
  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);
    const { user } = await authenticateUseCase.execute({
      email,
      password
    });
    const token = await reply.jwtSign({}, {
      sign: {
        sub: user.id
      }
    });
    return reply.status(200).send({ token });
  } catch (error) {
    throw new Error();
  }
}

// src/http/controllers/users/routes.ts
function userRoutes(app2) {
  app2.post("/users", register);
  app2.post("/authenticate", authenticate);
  app2.get("/profile", { onRequest: [verifyJWT] }, profile);
  app2.get("/users", getAll);
  app2.get("/users/:userId", get);
  app2.delete("/users/:userId", { onRequest: [verifyJWT] }, deleteUser);
  app2.patch("/users/:userId", { onRequest: [verifyJWT] }, update);
}

// src/app.ts
var import_zod14 = require("zod");

// src/http/controllers/posts/create.ts
var import_zod6 = __toESM(require("zod"), 1);

// src/use-cases/posts/register-posts-use-case.ts
var CreatePostUseCase = class {
  constructor(PostRepository) {
    this.PostRepository = PostRepository;
  }
  async execute({ title, content, created_at, userId }) {
    const posts = await this.PostRepository.create({ title, content, created_at, userId });
    return { posts };
  }
};

// src/http/controllers/posts/create.ts
async function create(request, reply) {
  const createBodySchema = import_zod6.default.object({
    title: import_zod6.default.string(),
    created_at: import_zod6.default.string().transform((str) => new Date(str)),
    content: import_zod6.default.string()
  });
  const {
    title,
    content,
    created_at
  } = createBodySchema.parse(request.body);
  const userId = request.user.sub;
  try {
    const prismaPostsRepository = new PrismaPostsRepository();
    const createPostsUseCase = new CreatePostUseCase(prismaPostsRepository);
    await createPostsUseCase.execute({
      title,
      content,
      created_at,
      userId
    });
  } catch (error) {
    throw error;
  }
  return reply.status(201).send("Post criado com sucesso!");
}

// src/use-cases/posts/get-all-posts-use-case.ts
var GetpostUseCase = class {
  constructor(PostsRepository) {
    this.PostsRepository = PostsRepository;
  }
  async execute() {
    const post = await this.PostsRepository.findAllPosts();
    if (!post) {
      throw new ResourceNotFoundError();
    }
    return { post };
  }
};

// src/http/controllers/posts/getAll.ts
async function getAll2(request, reply) {
  try {
    const prismaPostsRepository = new PrismaPostsRepository();
    const getPostUseCase = new GetpostUseCase(prismaPostsRepository);
    const post = await getPostUseCase.execute();
    return reply.status(200).send(post);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw new Error();
  }
}

// src/http/controllers/posts/delete.ts
var import_zod7 = __toESM(require("zod"), 1);

// src/use-cases/posts/delete-posts-use-case.ts
var DeletePostUseCase = class {
  constructor(PostsRepository) {
    this.PostsRepository = PostsRepository;
  }
  async execute({ postId }) {
    const post = await this.PostsRepository.delete(postId);
    if (!post) {
      throw new ResourceNotFoundError();
    }
    return { post };
  }
};

// src/http/controllers/posts/delete.ts
async function deletePost(request, reply) {
  const getParamsSchema = import_zod7.default.object({
    postId: import_zod7.default.string().uuid()
  });
  const { postId } = getParamsSchema.parse(request.params);
  const userId = request.user.sub;
  try {
    const prismaPostsRepository = new PrismaPostsRepository();
    const post = await prismaPostsRepository.findById(postId);
    if (!post) {
      throw new ResourceNotFoundError();
    }
    if (post.userId !== userId) {
      return reply.status(403).send({ message: "Permiss\xE3o para deletar este post negada." });
    }
    const deletePostUseCase = new DeletePostUseCase(prismaPostsRepository);
    await deletePostUseCase.execute({ postId });
    return reply.status(204).send({ post });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw new Error();
  }
}

// src/http/controllers/posts/update.ts
var import_zod8 = __toESM(require("zod"), 1);

// src/use-cases/posts/update-user-use-case.ts
var UpdatePostUseCase = class {
  constructor(postsRepository) {
    this.postsRepository = postsRepository;
  }
  async execute({ postId, data }) {
    const post = await this.postsRepository.findById(postId);
    if (!post) {
      throw new ResourceNotFoundError();
    }
    const postUpdated = await this.postsRepository.update(postId, data);
    if (!postUpdated) {
      throw new ResourceNotFoundError();
    }
    return { post: postUpdated };
  }
};

// src/http/controllers/posts/update.ts
async function update2(request, reply) {
  const updateParamsSchema = import_zod8.default.object({
    postId: import_zod8.default.string().uuid()
  });
  const updateBodySchema = import_zod8.default.object({
    title: import_zod8.default.string().optional(),
    content: import_zod8.default.string().optional()
  });
  const userId = request.user.sub;
  const { postId } = updateParamsSchema.parse(request.params);
  const { title, content } = updateBodySchema.parse(request.body);
  try {
    const prismapostsRepository = new PrismaPostsRepository();
    const post = await prismapostsRepository.findById(postId);
    if (!post) {
      throw new ResourceNotFoundError();
    }
    if (post.userId !== userId) {
      return reply.status(403).send({ message: "Permiss\xE3o para atualizar este post foi negada." });
    }
    const updatePostUseCase = new UpdatePostUseCase(prismapostsRepository);
    await updatePostUseCase.execute({
      postId,
      data: { title, content }
    });
    return reply.status(200).send({ post });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw new Error();
  }
}

// src/http/controllers/posts/get-by-userId.ts
var import_zod9 = __toESM(require("zod"), 1);

// src/use-cases/posts/get-by-userId-user-case.ts
var GetPostByUserIdUseCase = class {
  constructor(postsRepository) {
    this.postsRepository = postsRepository;
  }
  async execute({ userId }) {
    const post = await this.postsRepository.findByUserId(userId);
    if (!post) {
      throw new ResourceNotFoundError();
    }
    return { post };
  }
};

// src/http/controllers/posts/get-by-userId.ts
async function getByUserId(request, reply) {
  const getParamsSchema = import_zod9.default.object({
    userId: import_zod9.default.string().uuid()
  });
  const { userId } = getParamsSchema.parse(request.params);
  try {
    const prismapostsRepository = new PrismaPostsRepository();
    const getPostUseCase = new GetPostByUserIdUseCase(prismapostsRepository);
    const post = await getPostUseCase.execute({ userId });
    return reply.status(200).send(post);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw new Error();
  }
}

// src/http/controllers/posts/routes.ts
function postsRoutes(app2) {
  app2.post("/posts", { onRequest: [verifyJWT] }, create);
  app2.get("/posts", getAll2);
  app2.get("/posts/:postId", get2);
  app2.get("/posts/user/:userId", getByUserId);
  app2.delete("/posts/:postId", { onRequest: [verifyJWT] }, deletePost);
  app2.patch("/posts/:postId", { onRequest: [verifyJWT] }, update2);
}

// src/app.ts
var import_cors = __toESM(require("@fastify/cors"), 1);
var import_jwt = __toESM(require("@fastify/jwt"), 1);
var import_process = require("process");

// src/http/controllers/likes/create.ts
var import_zod10 = __toESM(require("zod"), 1);

// src/repositories/prisma/prisma-likes-repository.ts
var PrismaLikesRepository = class {
  async create(data) {
    return prisma.like.create({ data });
  }
  async findAllLikes() {
    return prisma.like.findMany();
  }
  async delete(id) {
    return prisma.like.delete({ where: { id } });
  }
  async findById(id) {
    return prisma.like.findUnique({ where: { id } });
  }
  async findByLikeId(userId) {
    return prisma.like.findMany({ where: { userId } });
  }
  async findByPostId(postId) {
    return prisma.like.findMany({
      where: { postId }
    });
  }
  async findByCommentId(commentId) {
    return prisma.like.findMany({
      where: { commentId }
    });
  }
};

// src/use-cases/likes/register-like-use-case.ts
var CreateLikesUseCase = class {
  constructor(likesRepository) {
    this.likesRepository = likesRepository;
  }
  async execute({
    created_at,
    userId,
    postId,
    commentId
  }) {
    const like = await this.likesRepository.create({
      created_at,
      userId,
      postId,
      commentId
    });
    return { like };
  }
};

// src/http/controllers/likes/create.ts
async function create2(request, reply) {
  const createBodySchema = import_zod10.default.object({
    created_at: import_zod10.default.string().transform((str) => new Date(str)),
    postId: import_zod10.default.string().optional(),
    commentId: import_zod10.default.string().optional()
  }).refine(
    (data) => data.postId && !data.commentId || !data.postId && data.commentId,
    {
      message: "Envie postId OU commentId."
    }
  );
  const { created_at, postId, commentId } = createBodySchema.parse(request.body);
  const userId = request.user.sub;
  try {
    const prismaLikesRepository = new PrismaLikesRepository();
    const createLikesUseCase = new CreateLikesUseCase(prismaLikesRepository);
    await createLikesUseCase.execute({
      created_at,
      userId,
      postId,
      commentId
    });
    return reply.status(201).send("Like criado com sucesso!");
  } catch (error) {
    console.error(error);
    return reply.status(500).send("Erro ao criar o like.");
  }
}

// src/http/controllers/likes/delete.ts
var import_zod11 = __toESM(require("zod"), 1);

// src/use-cases/likes/delete-likes-use-case.ts
var DeleteLikeUseCase = class {
  constructor(LikesRepository) {
    this.LikesRepository = LikesRepository;
  }
  async execute({ likeId }) {
    const like = await this.LikesRepository.delete(likeId);
    if (!like) {
      throw new ResourceNotFoundError();
    }
    return { like };
  }
};

// src/http/controllers/likes/delete.ts
async function deleteLike(request, reply) {
  const getParamsSchema = import_zod11.default.object({
    likeId: import_zod11.default.string().uuid()
  });
  const { likeId } = getParamsSchema.parse(request.params);
  const userId = request.user.sub;
  try {
    const prismaLikesRepository = new PrismaLikesRepository();
    const like = await prismaLikesRepository.findById(likeId);
    if (!like) {
      throw new ResourceNotFoundError();
    }
    if (like.userId !== userId) {
      return reply.status(403).send({ message: "Permiss\xE3o para deletar este like negada." });
    }
    const deletelikeUseCase = new DeleteLikeUseCase(prismaLikesRepository);
    await deletelikeUseCase.execute({ likeId });
    return reply.status(204).send({ like });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw new Error();
  }
}

// src/use-cases/likes/get-all-likes-use-case.ts
var GetlikeUseCase = class {
  constructor(likesRepository) {
    this.likesRepository = likesRepository;
  }
  async execute() {
    const like = await this.likesRepository.findAllLikes();
    if (!like) {
      throw new ResourceNotFoundError();
    }
    return { like };
  }
};

// src/http/controllers/likes/getAll.ts
async function getAll3(request, reply) {
  try {
    const prismaLikesRepository = new PrismaLikesRepository();
    const getLikeUseCase = new GetlikeUseCase(prismaLikesRepository);
    const Like = await getLikeUseCase.execute();
    return reply.status(200).send(Like);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw new Error();
  }
}

// src/http/controllers/likes/get-by-userId.ts
async function getLikesByUser(request, reply) {
  const { userId } = request.params;
  const repo = new PrismaLikesRepository();
  const likes = await repo.findByLikeId(userId);
  return reply.status(200).send(likes);
}

// src/http/controllers/likes/get-by-postId.ts
async function getLikesByPost(request, reply) {
  const { postId } = request.params;
  const repo = new PrismaLikesRepository();
  const likes = await repo.findByPostId(postId);
  return reply.status(200).send(likes);
}

// src/http/controllers/likes/get-by-commentId.ts
async function getLikesByComment(request, reply) {
  const { commentId } = request.params;
  const repo = new PrismaLikesRepository();
  const likes = await repo.findByCommentId(commentId);
  return reply.status(200).send(likes);
}

// src/http/controllers/likes/routes.ts
function likesRoutes(app2) {
  app2.post("/like", { onRequest: [verifyJWT] }, create2);
  app2.delete("/like/:likeId", { onRequest: [verifyJWT] }, deleteLike);
  app2.get("/like/all", getAll3);
  app2.get("/like/user/:userId", getLikesByUser);
  app2.get("/like/post/:postId", getLikesByPost);
  app2.get("/like/comment/:commentId", getLikesByComment);
}

// src/http/controllers/comments/create.ts
var import_zod12 = __toESM(require("zod"), 1);

// src/repositories/prisma/prisma-comments-repository.ts
var PrismaCommentsRepository = class {
  async create(data) {
    return prisma.comment.create({ data });
  }
  async findAll() {
    return prisma.comment.findMany();
  }
  async findById(id) {
    return prisma.comment.findUnique({ where: { id } });
  }
  async findByUser(userId) {
    return prisma.comment.findMany({ where: { userId } });
  }
  async findByPost(postId) {
    return prisma.comment.findMany({ where: { postId } });
  }
  async update(id, data) {
    return prisma.comment.update({
      where: { id },
      data: { content: data.content }
    });
  }
  async delete(id) {
    await prisma.comment.delete({
      where: { id }
    });
  }
};

// src/use-cases/comments/register-comments-use-case.ts
var CreateCommentUseCase = class {
  constructor(commentsRepository) {
    this.commentsRepository = commentsRepository;
  }
  async execute({
    content,
    created_at,
    userId,
    postId
  }) {
    const comment = await this.commentsRepository.create({
      content,
      created_at,
      userId,
      postId
    });
    return { comment };
  }
};

// src/http/controllers/comments/create.ts
async function createComment(request, reply) {
  const schema = import_zod12.default.object({
    content: import_zod12.default.string(),
    postId: import_zod12.default.string().uuid(),
    created_at: import_zod12.default.string().transform((str) => new Date(str))
  });
  const { content, postId, created_at } = schema.parse(request.body);
  const userId = request.user.sub;
  const repo = new PrismaCommentsRepository();
  const useCase = new CreateCommentUseCase(repo);
  await useCase.execute({ content, postId, userId, created_at });
  return reply.status(201).send({ message: "Coment\xE1rio criado com sucesso!" });
}

// src/http/controllers/comments/delete.ts
async function deleteComment(request, reply) {
  const { commentId } = request.params;
  const userId = request.user.sub;
  const repo = new PrismaCommentsRepository();
  const comment = await repo.findById(commentId);
  if (!comment) {
    return reply.status(404).send({ message: "Coment\xE1rio n\xE3o encontrado." });
  }
  if (comment.userId !== userId) {
    return reply.status(403).send({ message: "Voc\xEA n\xE3o tem permiss\xE3o para deletar este coment\xE1rio." });
  }
  await repo.delete(commentId);
  return reply.status(204).send();
}

// src/http/controllers/comments/update.ts
var import_zod13 = __toESM(require("zod"), 1);
async function updateComment(request, reply) {
  const { commentId } = request.params;
  const userId = request.user.sub;
  const schema = import_zod13.default.object({
    content: import_zod13.default.string()
  });
  const { content } = schema.parse(request.body);
  const repo = new PrismaCommentsRepository();
  const comment = await repo.findById(commentId);
  if (!comment) {
    return reply.status(404).send({ message: "Coment\xE1rio n\xE3o encontrado." });
  }
  if (comment.userId !== userId) {
    return reply.status(403).send({ message: "Voc\xEA n\xE3o tem permiss\xE3o para atualizar este coment\xE1rio." });
  }
  const updated = await repo.update(commentId, { content });
  return reply.status(200).send(updated);
}

// src/http/controllers/comments/getAll.ts
async function getAllComments(request, reply) {
  const repo = new PrismaCommentsRepository();
  const comments = await repo.findAll();
  return reply.status(200).send(comments);
}

// src/http/controllers/comments/getById.ts
async function getCommentById(request, reply) {
  const { commentId } = request.params;
  const repo = new PrismaCommentsRepository();
  const comment = await repo.findById(commentId);
  if (!comment) {
    return reply.status(404).send({ message: "Coment\xE1rio n\xE3o encontrado." });
  }
  return reply.status(200).send(comment);
}

// src/http/controllers/comments/getByUserId.ts
async function getCommentsByUser(request, reply) {
  const { userId } = request.params;
  const repo = new PrismaCommentsRepository();
  const comments = await repo.findByUser(userId);
  return reply.status(200).send(comments);
}

// src/http/controllers/comments/getByPostId.ts
async function getCommentsByPost(request, reply) {
  const { postId } = request.params;
  const repo = new PrismaCommentsRepository();
  const comments = await repo.findByPost(postId);
  return reply.status(200).send(comments);
}

// src/http/controllers/comments/routes.ts
async function commentsRoutes(app2) {
  app2.get("/comments", getAllComments);
  app2.get("/comments/:commentId", getCommentById);
  app2.get("/comments/user/:userId", getCommentsByUser);
  app2.get("/comments/post/:postId", getCommentsByPost);
  app2.post("/comments", { onRequest: [verifyJWT] }, createComment);
  app2.delete("/comments/:commentId", { onRequest: [verifyJWT] }, deleteComment);
  app2.patch("/comments/:commentId", { onRequest: [verifyJWT] }, updateComment);
}

// src/app.ts
var app = (0, import_fastify.default)();
var prisma = new import_client.PrismaClient();
app.register(import_cors.default, {
  origin: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-type", "Authorization"],
  credentials: true
});
app.register(import_jwt.default, {
  secret: import_process.env.JWT_SECRET,
  sign: {
    expiresIn: "10m"
  }
});
app.register(userRoutes);
app.register(postsRoutes);
app.register(likesRoutes);
app.register(commentsRoutes);
app.setErrorHandler((error, resquest, reply) => {
  if (error instanceof import_zod14.ZodError) {
    return reply.status(400).send({ message: "Validation error", issues: error.format() });
  }
  return reply.status(500).send({ message: "Internal server error" });
});

// src/repositories/prisma/prisma-posts-repository.ts
var PrismaPostsRepository = class {
  async create(data) {
    const posts = await prisma.post.create({ data });
    return posts;
  }
  async findAllPosts() {
    const post = await prisma.post.findMany();
    return post;
  }
  async delete(id) {
    const post = await prisma.post.delete({
      where: {
        id
      }
    });
    return post;
  }
  async findById(id) {
    const post = await prisma.post.findUnique({
      where: {
        id
      }
    });
    return post;
  }
  async update(id, data) {
    const post = await prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content
      }
    });
    return post;
  }
  async findByUserId(userId) {
    const post = await prisma.post.findMany({
      where: {
        userId
      }
    });
    return post;
  }
};

// src/use-cases/posts/get-posts-use-case.ts
var GetPostUseCase = class {
  constructor(postsRepository) {
    this.postsRepository = postsRepository;
  }
  async execute({ postId }) {
    const post = await this.postsRepository.findById(postId);
    if (!post) {
      throw new ResourceNotFoundError();
    }
    return { post };
  }
};

// src/http/controllers/posts/get.ts
async function get2(request, reply) {
  const getParamsSchema = import_zod15.default.object({
    postId: import_zod15.default.string().uuid()
  });
  const { postId } = getParamsSchema.parse(request.params);
  try {
    const prismapostsRepository = new PrismaPostsRepository();
    const getPostUseCase = new GetPostUseCase(prismapostsRepository);
    const post = await getPostUseCase.execute({ postId });
    return reply.status(200).send(post);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw new Error();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  get
});
