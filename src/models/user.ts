import bycrypt from 'bcryptjs';
import { Schema, model } from 'mongoose';
import { DbUser } from '../../types';

const validateEmail = (email: string): boolean => {
  const validEmailReg =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;

  return validEmailReg.test(email);
};

const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const userSchema = new Schema<DbUser>(
  {
    firstName: {
      type: String,
      required: [true, 'User must have a first name']
    },
    middleName: String,
    lastName: {
      type: String,
      required: [true, 'User must have a last name']
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, 'user must have an email addresss'],
      validate: [validateEmail, 'Please provide a valid email address']
    },
    password: {
      required: [true, 'user must have a password'],
      type: String,
      minlength: 8,
      select: false
    },
    birthDay: {
      day: {
        type: Number,
        required: [true, 'User must provide the day of birth'],
        min: 1,
        max: 31
      },
      month: {
        type: Number,
        required: [true, 'User must provide the month of birth'],
        min: 1,
        max: 12
      },
      year: {
        type: Number,
        required: [true, 'User must provide the year of birth'],
        min: 1963,
        max: new Date().getFullYear()
      }
    },
    currentAddress: {
      addressLineOne: {
        type: String,
        required: [true, 'Please provide the primary residence']
      },
      addressLineTwo: String,
      town: {
        type: String,
        required: [true, 'Provide the town']
      },
      county: {
        type: String,
        required: [true, 'Provide the county']
      },
      postcode: {
        type: String,
        required: [true, 'Provide the postcode']
      }
    },
    previousAddress: {
      addressLineOne: {
        type: String
      },
      addressLineTwo: String,
      town: {
        type: String
      },
      county: {
        type: String
      },
      postcode: {
        type: String
      }
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    active: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    methods: {
      async hashPassword(plainPassword: string): Promise<void> {
        this.password = await bycrypt.hash(plainPassword, 11);
      },

      async validatePassword(plainPassword: string): Promise<boolean> {
        return await bycrypt.compare(plainPassword, this.password);
      }
    }
  }
);

userSchema.pre('save', async function (next) {
  this.firstName = capitalize(this.firstName);
  this.middleName = this.middleName ? capitalize(this.middleName) : undefined;
  this.lastName = capitalize(this.lastName);
  await this.hashPassword(this.password);
  return next();
});

export default model<DbUser>('User', userSchema);
