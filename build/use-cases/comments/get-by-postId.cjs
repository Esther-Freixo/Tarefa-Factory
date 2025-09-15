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

// src/use-cases/comments/get-by-postId.ts
var get_by_postId_exports = {};
__export(get_by_postId_exports, {
  GetCommentsByPostUseCase: () => GetCommentsByPostUseCase
});
module.exports = __toCommonJS(get_by_postId_exports);
var GetCommentsByPostUseCase = class {
  constructor(commentsRepository) {
    this.commentsRepository = commentsRepository;
  }
  async execute({
    postId
  }) {
    const comments = await this.commentsRepository.findByPost(postId);
    return { comments };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetCommentsByPostUseCase
});
