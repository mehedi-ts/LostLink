export const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const phonePattern = /^\+?[1-9]\d{1,14}$|^[0-9]{10,11}$/; // Basic international & local format

export const validators = {
  required: (fieldName: string) => ({
    required: `${fieldName} is required`,
  }),
  email: {
    required: "Email address is required",
    pattern: {
      value: emailPattern,
      message: "Please enter a valid email address",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters long",
    },
  },
  confirmPassword: (passwordValue: string) => ({
    required: "Please confirm your password",
    validate: (val: string) => {
      if (val !== passwordValue) {
        return "Passwords do not match";
      }
    },
  }),
  phone: {
    required: "Contact number is required",
    pattern: {
      value: phonePattern,
      message: "Please enter a valid contact phone number",
    },
  },
  name: {
    required: "Name is required",
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters",
    },
  },
  itemTitle: {
    required: "Item title is required",
    minLength: {
      value: 3,
      message: "Title must be at least 3 characters",
    },
    maxLength: {
      value: 80,
      message: "Title cannot exceed 80 characters",
    },
  },
  itemShortDescription: {
  required: "Short description is required",
  maxLength: { value: 100, message: "Keep it under 100 characters" },
},
  itemDescription: {
    required: "Description is required",
    minLength: {
      value: 10,
      message: "Description must be at least 10 characters to help others identify it",
    },
    maxLength: {
      value: 1000,
      message: "Description cannot exceed 1000 characters",
    },
  },
  location: {
    required: "Location is required",
  },
  date: {
    required: "Date is required",
    validate: (val: string) => {
      const selectedDate = new Date(val);
      const today = new Date();
      // Set hours to 0 to compare days
      today.setHours(23, 59, 59, 999);
      if (selectedDate > today) {
        return "Date cannot be in the future";
      }
      return true;
    },
  },
};
