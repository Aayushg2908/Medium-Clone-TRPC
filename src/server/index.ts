import prismadb from "@/lib/prismadb";
import { publicProcedure, router, privateProcedure } from "./trpc";
import { z } from "zod";

export const appRouter = router({
  onboarding: privateProcedure.query(async (opts) => {
    const user = await prismadb.user.findUnique({
      where: {
        userid: opts.ctx.user.id,
      },
    });

    return user;
  }),
  createUser: privateProcedure
    .input(
      z.object({
        username: z.string().min(3).max(20),
        imageURL: z.string().url(),
        bio: z.string().min(5).max(100),
      })
    )
    .mutation(async (opts) => {
      const usernameExists = await prismadb.user.findUnique({
        where: {
          username: opts.input.username,
        },
      });
      if (usernameExists) {
        return {
          code: 400,
        };
      }
      const user = await prismadb.user.create({
        data: {
          userid: opts.ctx.user.id,
          email: opts.ctx.user.emailAddresses[0].emailAddress,
          username: opts.input.username,
          imageURL: opts.input.imageURL,
          bio: opts.input.bio,
        },
      });
      return {
        code: 200,
        user: user,
      };
    }),
  getUser: privateProcedure.query(async (opts) => {
    const user = await prismadb.user.findUnique({
      where: {
        userid: opts.ctx.user.id,
      },
    });
    return user;
  }),
  editProfile: privateProcedure
    .input(
      z.object({
        username: z.string().min(3).max(20),
        imageURL: z.string().url(),
        bio: z.string().min(5).max(100),
      })
    )
    .mutation(async (opts) => {
      const user = await prismadb.user.findUnique({
        where: {
          userid: opts.ctx.user.id,
        },
      });
      if (user === null) {
        return {
          code: 404,
        };
      }
      const updatedUser = await prismadb.user.update({
        where: {
          userid: opts.ctx.user.id,
        },
        data: {
          username: opts.input.username,
          imageURL: opts.input.imageURL,
          bio: opts.input.bio,
        },
      });
      return {
        code: 200,
        updatedUser: updatedUser,
      };
    }),
  createPost: privateProcedure
    .input(
      z.object({
        title: z.string().min(2).max(50),
        thumbnail: z.string().url(),
        content: z.string().min(1),
        categoryId: z.string().min(1),
      })
    )
    .mutation(async (opts) => {
      const user = await prismadb.user.findUnique({
        where: {
          userid: opts.ctx.user.id,
        },
      });
      if (user === null) {
        return {
          code: 404,
        };
      }
      const post = await prismadb.post.create({
        data: {
          authorId: user.id,
          title: opts.input.title,
          thumbnail: opts.input.thumbnail,
          content: opts.input.content,
          categoryId: opts.input.categoryId,
        },
      });
      return {
        code: 200,
        post: post,
      };
    }),
  allPosts: publicProcedure.query(async (opts) => {
    const posts = await prismadb.post.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return posts;
  }),
  postById: privateProcedure.input(z.string()).query(async (opts) => {
    const post = await prismadb.post.findUnique({
      where: {
        id: opts.input,
      },
      include: {
        author: true,
        like: true,
        comment: true,
      },
    });
    return post;
  }),
  deletePost: privateProcedure.input(z.string()).mutation(async (opts) => {
    const post = await prismadb.post.findUnique({
      where: {
        id: opts.input,
      },
    });
    if (post === null) {
      return {
        code: 404,
      };
    }
    const deletedPost = await prismadb.post.delete({
      where: {
        id: opts.input,
      },
    });
    return {
      code: 200,
      deletedPost: deletedPost,
    };
  }),
  updatePost: privateProcedure
    .input(
      z.object({
        title: z.string().min(2).max(50),
        thumbnail: z.string().url(),
        content: z.string().min(1),
        postId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const post = await prismadb.post.findUnique({
        where: {
          id: opts.input.postId,
        },
      });
      if (post === null) {
        return {
          code: 404,
        };
      }
      const updatedPost = await prismadb.post.update({
        where: {
          id: opts.input.postId,
        },
        data: {
          title: opts.input.title,
          thumbnail: opts.input.thumbnail,
          content: opts.input.content,
        },
      });
      return {
        code: 200,
        updatedPost: updatedPost,
      };
    }),
  postOwner: privateProcedure.input(z.string()).query(async (opts) => {
    const user = await prismadb.user.findUnique({
      where: {
        userid: opts.ctx.user.id,
      },
    });
    if (user === null) {
      return {
        code: 404,
      };
    }
    const post = await prismadb.post.findUnique({
      where: {
        id: opts.input,
        authorId: user.id,
      },
    });
    if (post === null) {
      return false;
    }
    return true;
  }),
  likePost: privateProcedure.input(z.string()).mutation(async (opts) => {
    const user = await prismadb.user.findUnique({
      where: {
        userid: opts.ctx.user.id,
      },
    });
    if (user === null) {
      return {
        code: 404,
      };
    }
    const post = await prismadb.post.findUnique({
      where: {
        id: opts.input,
      },
    });
    if (post === null) {
      return {
        code: 405,
      };
    }
    const like = await prismadb.like.findFirst({
      where: {
        authorId: user.id,
        postId: opts.input,
      },
    });
    if (like) {
      const deletedLike = await prismadb.like.delete({
        where: {
          id: like.id,
        },
      });
      return {
        code: 201,
        deletedLike: deletedLike,
      };
    }
    const createdLike = await prismadb.like.create({
      data: {
        authorId: user.id,
        postId: opts.input,
      },
    });
    return {
      code: 200,
      createdLike: createdLike,
    };
  }),
  hasCurrentUserLiked: privateProcedure
    .input(z.string())
    .query(async (opts) => {
      const user = await prismadb.user.findUnique({
        where: {
          userid: opts.ctx.user.id,
        },
      });
      const like = await prismadb.like.findFirst({
        where: {
          authorId: user?.id,
          postId: opts.input,
        },
      });
      if (like) {
        return true;
      }
      return false;
    }),
  createComment: privateProcedure
    .input(
      z.object({
        content: z.string().min(2).max(50),
        postId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const user = await prismadb.user.findUnique({
        where: {
          userid: opts.ctx.user.id,
        },
      });
      if (user === null) {
        return {
          code: 404,
        };
      }
      const post = await prismadb.post.findUnique({
        where: {
          id: opts.input.postId,
        },
      });
      if (post === null) {
        return {
          code: 405,
        };
      }
      const comment = await prismadb.comment.create({
        data: {
          authorId: user.id,
          postId: opts.input.postId,
          content: opts.input.content,
        },
      });
      return {
        code: 200,
        comment: comment,
      };
    }),
  getAllComments: privateProcedure.input(z.string()).query(async (opts) => {
    const comments = await prismadb.comment.findMany({
      where: {
        postId: opts.input,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
      },
    });
    return comments;
  }),
  deleteComment: privateProcedure.input(z.string()).mutation(async (opts) => {
    const comment = await prismadb.comment.findUnique({
      where: {
        id: opts.input,
      },
    });
    if (comment === null) {
      return {
        code: 404,
      };
    }
    const deletedComment = await prismadb.comment.delete({
      where: {
        id: opts.input,
      },
    });
    return {
      code: 200,
      deletedComment: deletedComment,
    };
  }),
  commentOwner: privateProcedure.input(z.string()).query(async (opts) => {
    const user = await prismadb.user.findUnique({
      where: {
        userid: opts.ctx.user.id,
      },
    });
    if (user === null) {
      return {
        code: 404,
      };
    }
    const comment = await prismadb.comment.findUnique({
      where: {
        id: opts.input,
        authorId: user.id,
      },
    });
    if (comment) {
      return true;
    }
    return false;
  }),
  userPosts: privateProcedure.query(async (opts) => {
    const user = await prismadb.user.findUnique({
      where: {
        userid: opts.ctx.user.id,
      },
    });
    const posts = await prismadb.post.findMany({
      where: {
        authorId: user?.id,
      },
      include: {
        author: true,
      },
    });
    return posts;
  }),
  getAllCategories: privateProcedure.query(async (opts) => {
    const categories = await prismadb.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return categories;
  }),
  getPostsByCategory: privateProcedure
    .input(
      z.object({
        categoryName: z.string().min(1),
      })
    )
    .query(async (opts) => {
      const { categoryName } = opts.input;

      const posts = await prismadb.post.findMany({
        where: {
          category: {
            name: categoryName,
          },
        },
        include: {
          author: true
        },
        orderBy: {
          createdAt: "desc",
        }
      });

      return posts;
    }),
});

export type AppRouter = typeof appRouter;
