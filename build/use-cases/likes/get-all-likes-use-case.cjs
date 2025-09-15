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

// src/use-cases/likes/get-all-likes-use-case.ts
var get_all_likes_use_case_exports = {};
__export(get_all_likes_use_case_exports, {
  GetlikeUseCase: () => GetlikeUseCase
});
module.exports = __toCommonJS(get_all_likes_use_case_exports);

// src/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource not found error!");
  }
};

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetlikeUseCase
});
