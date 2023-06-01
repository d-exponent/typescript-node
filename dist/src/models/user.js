"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = require("mongoose");
const validateEmail = (email) => {
    const validEmailReg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
    return validEmailReg.test(email);
};
const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
const userSchema = new mongoose_1.Schema({
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
}, {
    methods: {
        hashPassword(plainPassword) {
            return __awaiter(this, void 0, void 0, function* () {
                this.password = yield bcryptjs_1.default.hash(plainPassword, 11);
            });
        },
        validatePassword(plainPassword) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield bcryptjs_1.default.compare(plainPassword, this.password);
            });
        }
    }
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.firstName = capitalize(this.firstName);
        this.middleName = this.middleName ? capitalize(this.middleName) : undefined;
        this.lastName = capitalize(this.lastName);
        yield this.hashPassword(this.password);
        return next();
    });
});
exports.default = (0, mongoose_1.model)('User', userSchema);
