import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IPlanHistory extends Document {
   userId: mongoose.Types.ObjectId;
   planId: mongoose.Types.ObjectId;
   startDate?: Date;
   endDate?: Date;
   snapshot?: {
      price?: number;
      currency?: string;
      planName?: string;
   };
   createdAt?: Date;
   updatedAt?: Date;
}

const PlanHistorySchema = new Schema<IPlanHistory>(
   {
      userId: {
         type: Schema.Types.ObjectId,
         ref: 'User',
         required: true,
         index: true,
      },
      planId: {
         type: Schema.Types.ObjectId,
         ref: 'Plan',
         required: true,
         index: true,
      },
      startDate: { type: Date, required: true },
      endDate: { type: Date },
      snapshot: {
         price: Number,
         currency: String,
         planName: String,
      },
   },
   { timestamps: true }
);

const PlanHistory: Model<IPlanHistory> =
   mongoose.models.PlanHistory ||
   mongoose.model<IPlanHistory>('PlanHistory', PlanHistorySchema);
export default PlanHistory;
