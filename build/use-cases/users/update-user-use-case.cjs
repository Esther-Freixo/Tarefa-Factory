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

// src/use-cases/users/update-user-use-case.ts
var update_user_use_case_exports = {};
__export(update_user_use_case_exports, {
  UpdateUserUseCase: () => UpdateUserUseCase
});
module.exports = __toCommonJS(update_user_use_case_exports);
var import_bcryptjs = require("bcryptjs");

// src/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource not found error!");
  }
};

// src/use-cases/users/update-user-use-case.ts
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
      const isSamePassword = await (0, import_bcryptjs.compare)(data.password, user.password);
      if (isSamePassword) {
        throw new Error("As senhas devem ser diferentes!");
      }
      data.password = await (0, import_bcryptjs.hash)(data.password, 6);
    }
    const userUpdated = await this.usersRepository.update(userId, data);
    if (!userUpdated) {
      throw new ResourceNotFoundError();
    }
    return { user: userUpdated };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UpdateUserUseCase
});
