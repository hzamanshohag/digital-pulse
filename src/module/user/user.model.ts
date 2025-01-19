import { model, Schema } from 'mongoose';
import { Iuser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<Iuser>(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, 'name is too small'],
      maxlength: [20, 'name is very long'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value: string) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        },
        message: '{VALUE} is not valid',
      },
      immutable: true,
    },
    password: {
      type: String,
      required: [true, 'please enter your password'],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'admin'],
        message: '{VALUE} is not valid',
      },
      required: true,
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

//password hash
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

const User = model<Iuser>('User', userSchema);

export default User;
