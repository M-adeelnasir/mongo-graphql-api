import mongoose from 'mongoose';

export default async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log(`Mongo connection established`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
