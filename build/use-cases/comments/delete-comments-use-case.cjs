var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/use-cases/comments/delete-comments-use-case.ts
var delete_comments_use_case_exports = {};
__export(delete_comments_use_case_exports, {
  DeleteCommentUseCase: () => DeleteCommentUseCase
});
module.exports = __toCommonJS(delete_comments_use_case_exports);

// src/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource not found error!");
  }
};

// src/use-cases/comments/delete-comments-use-case.ts
var DeleteCommentUseCase = class {
  constructor(commentsRepository) {
    this.commentsRepository = commentsRepository;
  }
  async execute({ commentId, userId }) {
    const comment = await this.commentsRepository.findById(commentId);
    if (!comment) {
      throw new ResourceNotFoundError();
    }
    if (comment.userId !== userId) {
      throw new Error("Voc\xEA n\xE3o tem permiss\xE3o para deletar este coment\xE1rio.");
    }
    await this.commentsRepository.delete(commentId);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeleteCommentUseCase
});
