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

// src/use-cases/comments/get-by-userId-user-case.ts
var get_by_userId_user_case_exports = {};
__export(get_by_userId_user_case_exports, {
  GetCommentsByUserUseCase: () => GetCommentsByUserUseCase
});
module.exports = __toCommonJS(get_by_userId_user_case_exports);
var GetCommentsByUserUseCase = class {
  constructor(commentsRepository) {
    this.commentsRepository = commentsRepository;
  }
  async execute({
    userId
  }) {
    const comments = await this.commentsRepository.findByUser(userId);
    return { comments };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetCommentsByUserUseCase
});
