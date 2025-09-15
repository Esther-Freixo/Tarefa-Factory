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

// src/use-cases/comments/register-comments-use-case.ts
var register_comments_use_case_exports = {};
__export(register_comments_use_case_exports, {
  CreateCommentUseCase: () => CreateCommentUseCase
});
module.exports = __toCommonJS(register_comments_use_case_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateCommentUseCase
});
