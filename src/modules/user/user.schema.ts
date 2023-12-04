import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

export const UserId = z.object({
  id: z.number(),
});

export const userCore = {
  firstname: z
    .string({
      required_error: "Firstname is required",
      invalid_type_error: "Firstname must be a string",
    })
    .min(4, "Firstname must be at least 4 characters long"),
  lastname: z
    .string({
      required_error: "Lastname is required",
      invalid_type_error: "Lastname must be a string",
    })
    .min(4, "Lastname must be at least 4 characters long"),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  isActive: z.boolean().default(true),
};

export const userDetails = {
  firstname: userCore.firstname,
  lastname: userCore.lastname,
  phone: z
    .string({
      required_error: "Phone is required",
      invalid_type_error: "Phone is required",
    })
    .regex(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
      "Phone is not valid"
    ),
  vatNumber: z.custom<string>((value) => {
    if (typeof value !== "string") {
      return new Error("Vat number is wrong!");
    }
    let vatNumber = value.substring(2, value.length);
    vatNumber = vatNumber.replace(/[\ \-]/gi, "");
    let weight = [6, 5, 7, 2, 3, 4, 5, 6, 7];
    let sum = 0;
    let controlNumber = parseInt(vatNumber.substring(9, 10));
    let weightCount = weight.length;
    for (let i = 0; i < weightCount; i++) {
      sum += parseInt(vatNumber.substring(i, 1)) * weight[i];
    }

    const isValid = sum % 11 === controlNumber;
    if (!isValid) {
      throw new Error("Vat number is wrong!");
    } else {
      return value;
    }
  }),
  companyName: z
    .string({
      required_error: "Company name is required",
      invalid_type_error: "Company name must be a string",
    })
    .min(4, "Company name must be at least 4 characters long"),
  city: z
    .string({
      required_error: "City is required",
      invalid_type_error: "City must be a string",
    })
    .min(4, "City must be at least 4 characters long")
    .max(50),
  street: z
    .string({
      required_error: "Street is required",
      invalid_type_error: "Street must be a string",
    })
    .min(4, "Street must be at least 4 characters long")
    .max(50),
  postalCode: z
    .string({
      required_error: "Postal code is required",
      invalid_type_error: "Postal code is required",
    })
    .regex(/^\d{2}-\d{3}$/, "Postal code is not valid"),
  country: z
    .string({
      required_error: "Country is required",
      invalid_type_error: "Country is required",
    })
    .min(4, "Country must be at least 4 characters long"),
};

export const userPassword = {
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error:
        "Password must be a string and at least 6 characters long",
    })
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])/,
      "Password must contain at least one letter, one number and one special character"
    )
    .min(6, "Email must be at least 6 characters long"),
};

const userUpdateSchema = z.object({
  ...userDetails,
});

const userResponseSchema = UserId.extend({
  ...userCore,
});

export type UserUpdateInput = z.infer<typeof userUpdateSchema>;

export const { schemas: userSchemas, $ref: userRef } = buildJsonSchemas(
  {
    userUpdateSchema,
    userResponseSchema,
  },
  {
    $id: "userSchema",
  }
);
