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

// src/use-cases/likes/register-like-use-case.ts
var register_like_use_case_exports = {};
__export(register_like_use_case_exports, {
  CreateLikesUseCase: () => CreateLikesUseCase
});
module.exports = __toCommonJS(register_like_use_case_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateLikesUseCase
});
