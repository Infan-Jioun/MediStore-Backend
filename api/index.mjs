// src/app.ts
import express8 from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id            String     @id @default(uuid())\n  name          String?\n  email         String     @unique\n  image         String?\n  createdAt     DateTime   @default(now())\n  updatedAt     DateTime   @updatedAt\n  role          String?    @default("CUSTOMER")\n  isBanned      String?    @default("ACTIVE")\n  phone         String?\n  address       String?\n  emailVerified Boolean?\n  accounts      Account[]\n  medicines     Medicine[]\n  orders        Order[]\n  reviews       Review[]\n  sessions      Session[]\n\n  @@map("user")\n}\n\nmodel Category {\n  id        String     @id @default(uuid())\n  name      String     @unique\n  slug      String?\n  image     String?\n  createdAt DateTime   @default(now())\n  updatedAt DateTime   @updatedAt\n  medicines Medicine[]\n\n  @@map("category")\n}\n\nmodel Medicine {\n  id           String      @id @default(uuid())\n  name         String\n  slug         String?     @unique\n  description  String?\n  price        Float\n  stock        Int         @default(0)\n  manufacturer String?\n  dosage       String?\n  imageUrl     String?\n  sellerId     String\n  categoryId   String\n  createdAt    DateTime    @default(now())\n  updatedAt    DateTime    @updatedAt\n  category     Category    @relation(fields: [categoryId], references: [id])\n  seller       User        @relation(fields: [sellerId], references: [id], onDelete: Cascade)\n  orderItems   OrderItem[]\n  reviews      Review[]\n\n  @@map("medicine")\n}\n\nmodel Order {\n  id              String      @id @default(uuid())\n  customerId      String\n  shippingAddress String\n  totalAmount     Float\n  status          OrderStatus @default(PLACED)\n  createdAt       DateTime    @default(now())\n  updatedAt       DateTime    @updatedAt\n  customer        User        @relation(fields: [customerId], references: [id], onDelete: Cascade)\n  items           OrderItem[]\n\n  @@map("order")\n}\n\nmodel OrderItem {\n  id         String   @id @default(uuid())\n  orderId    String\n  medicineId String\n  quantity   Int\n  price      Float\n  medicine   Medicine @relation(fields: [medicineId], references: [id])\n  order      Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)\n\n  @@unique([orderId, medicineId])\n  @@map("orderItem")\n}\n\nmodel Review {\n  id         String   @id @default(uuid())\n  userId     String\n  medicineId String\n  rating     Int\n  comment    String?\n  createdAt  DateTime @default(now())\n  medicine   Medicine @relation(fields: [medicineId], references: [id], onDelete: Cascade)\n  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([userId, medicineId])\n  @@map("review")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String   @unique\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nenum OrderStatus {\n  PLACED\n  PROCESSING\n  SHIPPED\n  DELIVERED\n  CANCELLED\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"role","kind":"scalar","type":"String"},{"name":"isBanned","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"medicines","kind":"object","type":"Medicine","relationName":"MedicineToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"}],"dbName":"user"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"medicines","kind":"object","type":"Medicine","relationName":"CategoryToMedicine"}],"dbName":"category"},"Medicine":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"manufacturer","kind":"scalar","type":"String"},{"name":"dosage","kind":"scalar","type":"String"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"sellerId","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMedicine"},{"name":"seller","kind":"object","type":"User","relationName":"MedicineToUser"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MedicineToOrderItem"},{"name":"reviews","kind":"object","type":"Review","relationName":"MedicineToReview"}],"dbName":"medicine"},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"shippingAddress","kind":"scalar","type":"String"},{"name":"totalAmount","kind":"scalar","type":"Float"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"customer","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"}],"dbName":"order"},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Float"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToOrderItem"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"}],"dbName":"orderItem"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToReview"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"}],"dbName":"review"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  // trustedOrigins: [process.env.APP_URL! || "https://medi-stores-backend.vercel.app"],
  trustedOrigins: async (request) => {
    const origin = request?.headers.get("origin");
    const allowedOrigins2 = [
      process.env.APP_URL || "https://medi-store-frontend-seven.vercel.app",
      process.env.BETTER_AUTH_URL || "https://medi-stores-backend.vercel.app",
      "http://localhost:3000",
      "http://localhost:5000",
      "https://medi-store-frontend-seven.vercel.app",
      "https://medi-stores-backend.vercel.app"
    ].filter(Boolean);
    if (!origin || allowedOrigins2.includes(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin)) {
      return [origin];
    }
    return [];
  },
  basePath: "/api/auth",
  user: {
    additionalFields: {
      address: {
        type: "string",
        required: false
      },
      phone: {
        type: "string",
        required: false
      },
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: false
      },
      isBanned: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },
  // cookies: {
  //   secure: true,
  //   sameSite: "none",
  //   httpOnly: true,
  //   path: "/"
  // },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
      // 5 minutes
    }
  },
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false
    },
    disableCSRFCheck: true
  },
  crossSubDomainCookies: {
    enabled: false
  },
  disableCSRFCheck: {
    disableCSRFCheck: true
  },
  emailAndPassword: {
    enabled: true
  }
});

// src/modules/medicine/medicine.router.ts
import express from "express";

// src/middleware/auth.ts
var auth2 = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized"
        });
      }
      const user = await prisma.user.findUnique({
        where: { id: session.user.id }
      });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found"
        });
      }
      const userRole = session.user.role;
      if (!userRole) {
        return res.status(403).json({
          success: false,
          message: "User role not found in session"
        });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: userRole,
        address: session.user.address ?? "",
        phone: session.user.phone ?? ""
      };
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden access! You don't have permission"
        });
      }
      next();
    } catch (err) {
      console.error("Auth middleware error:", err);
      next(err);
    }
  };
};

// src/modules/medicine/medicine.service.ts
var createMedicineService = async (data) => {
  return await prisma.medicine.create({
    data: {
      name: data.name,
      price: data.price,
      stock: data.stock ?? 0,
      categoryId: data.categoryId,
      sellerId: data.sellerId,
      description: data.description ?? null,
      manufacturer: data.manufacturer,
      dosage: data.dosage ?? null,
      imageUrl: data.imageUrl,
      slug: data.slug
    }
  });
};
var getAllMedicines = async () => {
  return await prisma.medicine.findMany({
    include: {
      seller: {
        select: { id: true, email: true, name: true }
      },
      category: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};
var getMedicinedById = async (id) => {
  const medcine = await prisma.medicine.findUniqueOrThrow({
    where: { id },
    include: {
      category: true,
      seller: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });
  if (!medcine) {
    throw new Error("Medinens not found....");
  }
  return medcine;
};
var medicineService = {
  createMedicineService,
  getAllMedicines,
  getMedicinedById
};

// src/modules/medicine/medicine.controller.ts
var createMedicine = async (req, res) => {
  try {
    const { name, price, stock, categoryId, description, manufacturer, dosage, imageUrl, slug } = req.body;
    const sellerId = req.user?.id;
    if (!sellerId) {
      return res.status(401).json({ message: "Unauthorzied seller" });
    }
    if (!name || !price || !categoryId || !manufacturer || !imageUrl) {
      return res.status(400).json({ message: "Required fields missing" });
    }
    const medicine = await medicineService.createMedicineService({
      name,
      price,
      stock: stock ?? 0,
      categoryId,
      sellerId,
      description: description ?? null,
      manufacturer,
      dosage: dosage ?? null,
      imageUrl,
      slug
    });
    return res.status(201).json(medicine);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create medicine" });
  }
};
var getAllMedicines2 = async (req, res) => {
  try {
    const medicine = await medicineService.getAllMedicines();
    return res.status(200).json(medicine);
  } catch (err) {
    res.status(500).json({
      message: "somthing went wrong"
    });
  }
};
var getMedicinesById = async (req, res) => {
  try {
    const medicinedata = await medicineService.getMedicinedById(req.params.id);
    return res.status(200).json(medicinedata);
  } catch (err) {
    res.status(500).json({
      message: "somthing went wrong"
    });
  }
};
var medicineController = {
  createMedicine,
  getAllMedicines: getAllMedicines2,
  getMedicinesById
};

// src/modules/medicine/medicine.router.ts
var router = express.Router();
router.post("/", auth2("SELLER" /* SELLER */, "ADMIN" /* ADMIN */), medicineController.createMedicine);
router.get("/", medicineController.getAllMedicines);
router.get("/:id", medicineController.getMedicinesById);
var medicineRouter = router;

// src/modules/admin/admin.router.ts
import express2 from "express";

// src/modules/admin/admin.service.ts
var getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isBanned: true,
      createdAt: true
    }
  });
};
var updateUserStatus = async (id, isBanned) => {
  return await prisma.user.update({
    where: { id },
    data: { isBanned }
  });
};
var createCategoryService = async (data) => {
  return await prisma.category.create({
    data: {
      name: data.name,
      slug: data.slug,
      image: data.image
    }
  });
};
var getCategoryService = async () => {
  return await prisma.category.findMany({
    include: {
      medicines: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
var getOrders = async (user) => {
  if (user.role === "ADMIN" /* ADMIN */) {
    return prisma.order.findMany({
      include: {
        items: {
          include: {
            medicine: true
          }
        },
        customer: true
      },
      orderBy: { createdAt: "desc" }
    });
  }
  return prisma.order.findMany({
    where: { customerId: user.id },
    include: {
      items: {
        include: {
          medicine: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};
var updateCategory = async (id, name, image) => {
  return await prisma.category.update({
    where: { id },
    data: { name, image, slug: name.toLowerCase().replace(/\s+/g, "-") }
  });
};
var deleteCategory = async (id) => {
  const category = await prisma.category.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      medicines: true
    }
  });
  if (category.medicines.length > 0) {
    throw new Error("Cannot delete category with medicines...");
  }
  return prisma.category.delete({
    where: { id }
  });
};
var adminService = {
  getAllUsers,
  updateUserStatus,
  getCategoryService,
  getOrders,
  createCategoryService,
  updateCategory,
  deleteCategory
};

// src/modules/admin/admin.controller.ts
var getAllUsers2 = async (req, res) => {
  try {
    if (req.user?.role !== "ADMIN" /* ADMIN */) {
      return res.status(403).json({ success: false, message: "Forbidden: Admins only" });
    }
    const users = await adminService.getAllUsers();
    return res.status(200).json(users);
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "forbidden access"
    });
  }
};
var updateUserStatus2 = async (req, res) => {
  try {
    const { id } = req.params;
    const { isBanned } = req.body;
    if (!["ACTIVE", "BANNED"].includes(isBanned)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Status"
      });
    }
    if (req.user?.id === id) {
      return res.status(400).json({
        success: false,
        message: "You Cannnot ban yourself"
      });
    }
    const result = await adminService.updateUserStatus(id, isBanned);
    return res.status(201).json(result);
  } catch (err) {
    res.status(500).json({
      messgae: "something went wrong"
    });
  }
};
var createCategoryController = async (req, res) => {
  try {
    const { name, slug, image } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Category name is required "
      });
    }
    const category = await adminService.createCategoryService({
      name,
      slug,
      image
    });
    return res.status(201).json(category);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create category"
    });
  }
};
var getCategory = async (req, res) => {
  try {
    const categories = await adminService.getCategoryService();
    return res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get category"
    });
  }
};
var getOrders2 = async (req, res) => {
  try {
    const orders = await adminService.getOrders(req.user);
    return res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Get failed" });
  }
};
var updateCategory2 = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;
    if (!name) {
      return res.status(401).json({
        message: "provide your categories name"
      });
    }
    const result = await adminService.updateCategory(id, name, image);
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: "failed to update "
    });
  }
};
var deleteCategory2 = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await adminService.deleteCategory(id);
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: "something went wrong..."
    });
  }
};
var adminController = {
  getAllUsers: getAllUsers2,
  updateUserStatus: updateUserStatus2,
  createCategoryController,
  getCategory,
  getOrders: getOrders2,
  updateCategory: updateCategory2,
  deleteCategory: deleteCategory2
};

// src/modules/admin/admin.router.ts
var router2 = express2.Router();
router2.get("/users", auth2("ADMIN" /* ADMIN */), adminController.getAllUsers);
router2.patch("/users/:id", auth2("ADMIN" /* ADMIN */), adminController.updateUserStatus);
router2.post("/categories", auth2("ADMIN" /* ADMIN */), adminController.createCategoryController);
router2.get("/categories", auth2("ADMIN" /* ADMIN */), adminController.getCategory);
router2.get("/orders", auth2("ADMIN" /* ADMIN */), adminController.getOrders);
router2.patch("/categories/:id", auth2("ADMIN" /* ADMIN */), adminController.updateCategory);
router2.delete("/categories/:id", auth2("ADMIN" /* ADMIN */), adminController.deleteCategory);
var adminRouter = router2;

// src/modules/category/category.router.ts
import express3 from "express";

// src/modules/category/category.service.ts
var getCategory2 = async () => {
  const category = await prisma.category.findMany({
    orderBy: { name: "asc" }
  });
  if (!category) {
    throw new Error("Category unavilable");
  }
  return category;
};
var categoryService = {
  getCategory: getCategory2
};

// src/modules/category/category.controller.ts
var getCategory3 = async (req, res) => {
  try {
    const category = await categoryService.getCategory();
    return res.status(201).json(category);
  } catch (err) {
    res.status(500).json({
      message: "something went wrong..."
    });
  }
};
var categoryController = {
  getCategory: getCategory3
};

// src/modules/category/category.router.ts
var router3 = express3.Router();
router3.get("/", categoryController.getCategory);
var categoryRouter = router3;

// src/modules/order/order.router.ts
import express4 from "express";

// src/modules/order/order.service.ts
var createOrder = async (userId, payload) => {
  const { medicineItems, shippingAddress } = payload;
  if (!medicineItems || medicineItems.length === 0) {
    throw new Error("Order item required");
  }
  if (!shippingAddress) {
    throw new Error("shippingAddress is required");
  }
  let totalAmount = 0;
  const orderItems = await Promise.all(
    medicineItems.map(
      async (item) => {
        const medicine = await prisma.medicine.findUniqueOrThrow({
          where: {
            id: item.medicineId
          }
        });
        if (!medicine) {
          throw new Error(`Medicine not found for id: ${item.medicineId}`);
        }
        totalAmount += medicine.price * item.quantity;
        console.log(totalAmount);
        return {
          medicineId: medicine.id,
          quantity: item.quantity,
          price: medicine.price
        };
      }
    )
  );
  return prisma.order.create({
    data: {
      customerId: userId,
      totalAmount,
      shippingAddress,
      items: {
        create: orderItems
      }
    },
    include: {
      items: true
    }
  });
};
var getOrders3 = async (userId) => {
  return await prisma.order.findMany({
    where: { customerId: userId },
    include: {
      items: {
        include: {
          medicine: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};
var getOrdersById = async (orderId, user) => {
  const order = await prisma.order.findUniqueOrThrow({
    where: { id: orderId },
    include: {
      items: {
        include: {
          medicine: true
        }
      }
    }
  });
  if (!order) {
    throw new Error("Your Order Not Found...");
  }
  if (order.customerId !== user.id && user.role !== "ADMIN" /* ADMIN */) {
    throw new Error("Frobidden Access");
  }
  return order;
};
var orderService = {
  createOrder,
  getOrders: getOrders3,
  getOrdersById
};

// src/modules/order/order.controller.ts
var createOrder2 = async (req, res) => {
  try {
    const userId = req.user.id;
    const order = await orderService.createOrder(userId, req.body);
    return res.status(201).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "post failed"
    });
  }
};
var getOrders4 = async (req, res) => {
  try {
    const userId = req.user.id;
    const order = await orderService.getOrders(userId);
    return res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Get failed"
    });
  }
};
var getOrdersById2 = async (req, res) => {
  try {
    const order = await orderService.getOrdersById(req.params.id, req.user);
    return res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Get failed"
    });
  }
};
var orderController = {
  createOrder: createOrder2,
  getOrders: getOrders4,
  getOrdersById: getOrdersById2
};

// src/modules/order/order.router.ts
var router4 = express4.Router();
router4.post("/", auth2("CUSTOMER" /* CUSTOMER */, "ADMIN" /* ADMIN */, "SELLER" /* SELLER */), orderController.createOrder);
router4.get("/", auth2("ADMIN" /* ADMIN */, "SELLER" /* SELLER */, "CUSTOMER" /* CUSTOMER */), orderController.getOrders);
router4.get("/:id", auth2("CUSTOMER" /* CUSTOMER */, "SELLER" /* SELLER */, "ADMIN" /* ADMIN */), orderController.getOrdersById);
var orderRouter = router4;

// src/modules/seller/seller.router.ts
import express5 from "express";

// src/modules/seller/seller.service.ts
var createMedicine2 = async (sellerId, payload) => {
  const { categoryId } = payload;
  const category = await prisma.category.findUnique({
    where: { id: categoryId }
  });
  if (!category) {
    throw new Error("Invalid categoryId");
  }
  return await prisma.medicine.create({
    data: {
      ...payload,
      sellerId
    }
  });
};
var getSellerMedicines = async (sellerId) => {
  return await prisma.medicine.findMany({
    where: {
      sellerId
    },
    include: {
      category: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: [
      { createdAt: "desc" }
    ]
  });
};
var getMedicineById = async (id, sellerId) => {
  const medicine = await prisma.medicine.findUnique({
    where: { id }
  });
  if (medicine && medicine.sellerId !== sellerId) return null;
  return medicine;
};
var updateMedicines = async (sellerId, medicineId, payload) => {
  const medicine = await prisma.medicine.findFirst({
    where: {
      id: medicineId,
      sellerId
    }
  });
  if (!medicine) {
    throw new Error("Medicine not found...");
  }
  return await prisma.medicine.update({
    where: { id: medicineId },
    data: payload
  });
};
var deleteMedicines = async (sellerId, medicineId) => {
  const medicine = await prisma.medicine.findFirst({
    where: {
      id: medicineId,
      sellerId
    }
  });
  if (!medicine) {
    throw new Error("Medicine not found...");
  }
  if (!sellerId) {
    throw new Error("Medicine not found or you are not authorized to delete");
  }
  const deleteMedicines3 = await prisma.medicine.delete({
    where: {
      id: medicineId,
      sellerId
    }
  });
  return deleteMedicines3;
};
var getSellerOrders = async (sellerId) => {
  return await prisma.order.findMany({
    where: {
      items: {
        some: {
          medicine: {
            sellerId
          }
        }
      }
    },
    include: {
      items: {
        include: {
          medicine: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};
var updateStatusOrder = async (sellerId, orderId, status) => {
  const order = await prisma.order.findFirstOrThrow({
    where: {
      id: orderId,
      items: {
        some: {
          medicine: {
            sellerId
          }
        }
      }
    }
  });
  return await prisma.order.update({
    where: { id: order.id },
    data: { status }
  });
};
var sellerService = {
  createMedicine: createMedicine2,
  getSellerMedicines,
  getMedicineById,
  updateMedicines,
  deleteMedicines,
  getSellerOrders,
  updateStatusOrder
};

// src/modules/seller/seller.contrller.ts
var createMedicines = async (req, res) => {
  try {
    const sellerId = req.user?.id;
    const medicine = await sellerService.createMedicine(sellerId, req.body);
    return res.status(200).json(medicine);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "something went wrong..."
    });
  }
};
var getSellerMedicines2 = async (req, res) => {
  try {
    const sellerId = req.user?.id;
    if (!sellerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized  seller not authenticated"
      });
    }
    const medicines = await sellerService.getSellerMedicines(sellerId);
    return res.status(200).json({
      success: true,
      data: medicines,
      count: medicines.length
    });
  } catch (error) {
    console.error("Error in getSellerMedicines:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch seller's medicines",
      error: error.message || "Internal server error"
    });
  }
};
var getMedicineById2 = async (req, res) => {
  try {
    const { id } = req.params;
    const sellerId = req.user?.id;
    const medicine = await sellerService.getMedicineById(id, sellerId);
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });
    res.json(medicine);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};
var updateMedicines2 = async (req, res) => {
  try {
    const sellerId = req.user?.id;
    const { id } = req.params;
    const medicine = await sellerService.updateMedicines(sellerId, id, req.body);
    return res.status(200).json(medicine);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "update failed"
    });
  }
};
var deleteMedicines2 = async (req, res) => {
  try {
    const sellerId = req.user?.id;
    const { id } = req.params;
    const medicine = await sellerService.deleteMedicines(sellerId, id);
    return res.status(200).json(medicine);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Delete failed"
    });
  }
};
var getSellerOrders2 = async (req, res) => {
  try {
    const sellerId = req.user?.id;
    if (!sellerId) {
      return res.status(400).json({
        message: "you are authorized seller"
      });
    }
    const orders = await sellerService.getSellerOrders(sellerId);
    return res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Orders gets failed"
    });
  }
};
var updateStatusOrder2 = async (req, res) => {
  try {
    const sellerId = req.user?.id;
    const { id } = req.params;
    const { status } = req.body;
    const order = await sellerService.updateStatusOrder(sellerId, id, status);
    return res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Orders update failed"
    });
  }
};
var sellerController = {
  createMedicines,
  getSellerMedicines: getSellerMedicines2,
  getMedicineById: getMedicineById2,
  updateMedicines: updateMedicines2,
  deleteMedicines: deleteMedicines2,
  getSellerOrders: getSellerOrders2,
  updateStatusOrder: updateStatusOrder2
};

// src/modules/seller/seller.router.ts
var router5 = express5.Router();
router5.post("/medicines", auth2("SELLER" /* SELLER */), sellerController.createMedicines);
router5.get("/medicines", auth2("SELLER" /* SELLER */), sellerController.getSellerMedicines);
router5.get("/medicines/:id", auth2("SELLER" /* SELLER */), sellerController.getMedicineById);
router5.put("/medicines/:id", auth2("SELLER" /* SELLER */), sellerController.updateMedicines);
router5.delete("/medicines/:id", auth2("SELLER" /* SELLER */), sellerController.deleteMedicines);
router5.get("/orders", auth2("SELLER" /* SELLER */), sellerController.getSellerOrders);
router5.patch("/orders/:id", auth2("SELLER" /* SELLER */), sellerController.updateStatusOrder);
var sellerRouter = router5;

// src/modules/auth/auth.Router.ts
import express6 from "express";

// src/modules/auth/auth.controller.ts
var getMe = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Not authenticated"
    });
  }
  res.status(200).json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    phone: req.user.phone,
    address: req.user.address
  });
};

// src/modules/auth/auth.Router.ts
var router6 = express6.Router();
router6.get("/me", auth2(), getMe);
var authRouter = router6;

// src/modules/reviews/review.router.ts
import express7 from "express";

// src/modules/reviews/review.service.ts
var createReview = async (userId, medicineId, rating, comment) => {
  return prisma.review.create({
    data: { userId, medicineId, rating, comment },
    include: { medicine: { select: { id: true, name: true } } }
  });
};
var getMyReviews = (userId) => {
  return prisma.review.findMany({
    where: { userId },
    include: { medicine: { select: { id: true, name: true } } },
    orderBy: { createdAt: "desc" }
  });
};
var getReviewsByMedicine = (medicineId) => {
  return prisma.review.findMany({
    where: { medicineId },
    include: { user: true },
    orderBy: { createdAt: "desc" }
  });
};
var getUserReview = (userId, reviewId) => {
  return prisma.review.findUnique({
    where: { id: reviewId }
  });
};
var updateReview = async (userId, reviewId, rating, comment) => {
  const data = {};
  if (rating !== void 0) data.rating = rating;
  if (comment !== void 0) data.comment = comment;
  return prisma.review.update({
    where: { id: reviewId },
    data
  });
};
var deleteReview = async (userId, reviewId) => {
  return prisma.review.delete({
    where: { id: reviewId }
  });
};
var ReviewService = {
  createReview,
  getMyReviews,
  getReviewsByMedicine,
  getUserReview,
  updateReview,
  deleteReview
};

// src/modules/reviews/review.controller.ts
var createReview2 = async (req, res) => {
  const { medicineId, rating, comment } = req.body;
  const userId = req.user?.id;
  try {
    const review = await ReviewService.createReview(
      userId,
      medicineId,
      rating,
      comment
    );
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
var getMyReviews2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    const reviews = await ReviewService.getMyReviews(userId);
    res.json(reviews);
  } catch {
    res.status(500).json({ message: "Failed to load reviews" });
  }
};
var getReviewsByMedicine2 = async (req, res) => {
  const { medicineId } = req.params;
  try {
    const reviews = await ReviewService.getReviewsByMedicine(medicineId);
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
var updateReview2 = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user?.id;
  try {
    const review = await ReviewService.updateReview(
      userId,
      id,
      rating,
      comment
    );
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
var deleteReview2 = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;
  try {
    await ReviewService.deleteReview(userId, id);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
var ReviewController = {
  createReview: createReview2,
  getMyReviews: getMyReviews2,
  getReviewsByMedicine: getReviewsByMedicine2,
  updateReview: updateReview2,
  deleteReview: deleteReview2
};

// src/modules/reviews/review.router.ts
var router7 = express7.Router();
router7.post("/", auth2("CUSTOMER" /* CUSTOMER */), ReviewController.createReview);
router7.get("/", auth2("CUSTOMER" /* CUSTOMER */), ReviewController.getMyReviews);
router7.get(
  "/medicine/:medicineId",
  auth2("CUSTOMER" /* CUSTOMER */, "ADMIN" /* ADMIN */, "SELLER" /* SELLER */),
  ReviewController.getReviewsByMedicine
);
router7.put("/:id", auth2("CUSTOMER" /* CUSTOMER */), ReviewController.updateReview);
router7.delete("/:id", auth2("CUSTOMER" /* CUSTOMER */), ReviewController.deleteReview);
var ReviewRouter = router7;

// src/app.ts
var app = express8();
var allowedOrigins = [
  process.env.APP_URL || "https://medi-store-frontend-seven.vercel.app"
  // process.env.PROD_APP_URL || "https://medi-store-frontend-seven.vercel.app", // Production frontend URL
].filter(Boolean);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.includes(origin) || /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin);
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"]
  })
);
app.use(express8.json());
app.use(express8.urlencoded({ extended: true }));
app.use("/api/auth", authRouter);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api/admin", adminRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/medicines", medicineRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", ReviewRouter);
app.get("/", (req, res) => {
  res.send("Successfully MediStore Server Runing... ");
});

// src/index.ts
var index_default = app;
export {
  index_default as default
};
